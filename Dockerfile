# Marqdo ≥1.3.0：Web Artifact（ADR 0007）+ EKC；网页插件为 Go libweb。
# 构建优先从官方 CDN（ext.marqdo.com）拉 Linux bundle（CLI + lib/ + ext/ + .so），
# 避免构建机直连 github.com 失败；GitHub / proxy 为回退。
# 注意：ppa:cflmy/marqdo 当前仅发布到 1.2.0，不能用 apt 装 CLI（会降级）。
# CI 在 Ubuntu 24.04 上构建，需 GLIBC ≥ 2.39 → 运行时用 ubuntu:24.04（勿用 bookworm）。
# syntax=docker/dockerfile:1

ARG MARQDO_VERSION=1.3.0
# 可选：显式覆盖 bundle URL（跳过自动候选列表）
ARG MARQDO_BUNDLE_URL=

FROM ubuntu:24.04 AS builder
ARG MARQDO_VERSION
ARG MARQDO_BUNDLE_URL
WORKDIR /build

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl unzip \
  && rm -rf /var/lib/apt/lists/*

# 官方 Linux bundle：CLI + lib/ + ext/ + 原生 .so
# 下载顺序：build-arg → CDN bundles → CDN 根路径 → GitHub → cflmy proxy
RUN set -eu; \
  file="marqdo-${MARQDO_VERSION}-x86_64-unknown-linux-gnu.zip"; \
  urls=""; \
  if [ -n "${MARQDO_BUNDLE_URL}" ]; then \
    urls="${MARQDO_BUNDLE_URL}"; \
  fi; \
  urls="${urls} \
    https://ext.marqdo.com/v${MARQDO_VERSION}/bundles/${file} \
    https://ext.marqdo.com/bundles/${file} \
    https://github.com/cflmy/marqdo/releases/download/v${MARQDO_VERSION}/${file} \
    https://proxy.cflmy.top/github.com/cflmy/marqdo/releases/download/v${MARQDO_VERSION}/${file}"; \
  ok=0; \
  for url in ${urls}; do \
    echo "marqdo bundle: trying ${url}"; \
    if curl -fsSL --connect-timeout 20 --max-time 300 "${url}" -o /tmp/marqdo.zip; then \
      ok=1; \
      echo "marqdo bundle: fetched from ${url}"; \
      break; \
    fi; \
  done; \
  if [ "${ok}" != 1 ]; then \
    echo "error: could not download Marqdo ${MARQDO_VERSION} Linux bundle from any mirror" >&2; \
    exit 1; \
  fi; \
  mkdir -p /opt/marqdo; \
  unzip -q /tmp/marqdo.zip -d /tmp/marqdo-dist; \
  if [ -x /tmp/marqdo-dist/marqdo ]; then \
    cp -a /tmp/marqdo-dist/. /opt/marqdo/; \
  else \
    sub="$(find /tmp/marqdo-dist -maxdepth 2 -type f -name marqdo | head -n1 | xargs dirname)"; \
    cp -a "${sub}"/. /opt/marqdo/; \
  fi; \
  test -x /opt/marqdo/marqdo; \
  /opt/marqdo/marqdo version; \
  got="$(/opt/marqdo/marqdo version | awk '{print $NF}')"; \
  dpkg --compare-versions "${got}" ge "${MARQDO_VERSION}"; \
  rm -rf /tmp/marqdo.zip /tmp/marqdo-dist

ENV MARQDO_EXT=/opt/marqdo/ext
ENV PATH="/opt/marqdo:${PATH}"
RUN test -d "${MARQDO_EXT}/web" \
  && (test -f "${MARQDO_EXT}/native/libweb.so" \
      || test -f "${MARQDO_EXT}/native/web.so" \
      || ls "${MARQDO_EXT}/native"/*.so >/dev/null 2>&1)

FROM ubuntu:24.04 AS runtime

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl tini \
  && rm -rf /var/lib/apt/lists/* \
  && useradd --system --uid 10001 --home-dir /app --shell /usr/sbin/nologin qdqc

COPY --from=builder /opt/marqdo/marqdo /usr/local/bin/marqdo
COPY --from=builder /opt/marqdo/lib /opt/marqdo/lib
COPY --from=builder /opt/marqdo/ext /opt/marqdo/ext

WORKDIR /app
COPY --chown=qdqc:qdqc . /app/
RUN mkdir -p /app/data && chown qdqc:qdqc /app/data \
  && chmod +x /app/docker/entrypoint.sh \
  && if [ ! -f /opt/marqdo/ext/native/libweb.so ]; then \
       so="$(ls /opt/marqdo/ext/native/*.so 2>/dev/null | head -n1)"; \
       test -n "$so" && ln -sf "$(basename "$so")" /opt/marqdo/ext/native/libweb.so; \
     fi

ENV HOME=/app \
  MARQDO_EXT=/opt/marqdo/ext \
  MARQDO_WEB_PLUGIN=/opt/marqdo/ext/native/libweb.so \
  MARQDO_LIB=/opt/marqdo/lib

USER qdqc
EXPOSE 18085
ENTRYPOINT ["/usr/bin/tini", "--", "/app/docker/entrypoint.sh"]
CMD ["marqdo", "run", "serve.mq.md"]
