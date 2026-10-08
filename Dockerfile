# Marqdo CLI ≥1.3.0（Web Artifact ADR 0007）+ 独立扩展包 SemVer。
# CLI 与 ext/native 版本可错开：MARQDO_VERSION ≠ MARQDO_EXT_VERSION。
# 构建优先从 CDN（ext.marqdo.com）拉 Linux CLI bundle，再覆盖官方 ext pack + native。
# 注意：ppa:cflmy/marqdo 当前仅到 1.2.0，不能用 apt 装 CLI（会降级）。
# CI 在 Ubuntu 24.04 上构建，需 GLIBC ≥ 2.39 → 运行时用 ubuntu:24.04（勿用 bookworm）。
# syntax=docker/dockerfile:1

ARG MARQDO_VERSION=1.3.0
ARG MARQDO_EXT_VERSION=1.3.1
# 可选：显式覆盖 CLI bundle URL（跳过自动候选列表）
ARG MARQDO_BUNDLE_URL=

FROM ubuntu:24.04 AS builder
ARG MARQDO_VERSION
ARG MARQDO_EXT_VERSION
ARG MARQDO_BUNDLE_URL
WORKDIR /build

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl unzip \
  && rm -rf /var/lib/apt/lists/*

# 1) Linux CLI bundle（含当时打进包的 lib/ + ext/；下一步用独立 ext pack 覆盖）
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
    echo "error: could not download Marqdo CLI ${MARQDO_VERSION} Linux bundle from any mirror" >&2; \
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

# 2) Overlay official ext pack + Linux native (may be newer than CLI SemVer)
RUN set -eu; \
  EXT_VER="${MARQDO_EXT_VERSION}"; \
  ext_file="marqdo-${EXT_VER}-ext.zip"; \
  native_file="marqdo-${EXT_VER}-native-x86_64-unknown-linux-gnu.zip"; \
  fetch() { \
    name="$1"; \
    shift; \
    ok=0; \
    for url in "$@"; do \
      echo "marqdo ${name}: trying ${url}"; \
      if curl -fsSL --connect-timeout 20 --max-time 300 "${url}" -o "/tmp/${name}.zip"; then \
        ok=1; \
        echo "marqdo ${name}: fetched from ${url}"; \
        break; \
      fi; \
    done; \
    if [ "${ok}" != 1 ]; then \
      echo "error: could not download ${name} ${EXT_VER}" >&2; \
      exit 1; \
    fi; \
  }; \
  fetch ext \
    "https://ext.marqdo.com/v${EXT_VER}/${ext_file}" \
    "https://ext.marqdo.com/latest/${ext_file}" \
    "https://github.com/cflmy/marqdo/releases/download/ext-v${EXT_VER}/${ext_file}" \
    "https://proxy.cflmy.top/github.com/cflmy/marqdo/releases/download/ext-v${EXT_VER}/${ext_file}"; \
  fetch native \
    "https://ext.marqdo.com/v${EXT_VER}/${native_file}" \
    "https://ext.marqdo.com/latest/${native_file}" \
    "https://github.com/cflmy/marqdo/releases/download/ext-v${EXT_VER}/${native_file}" \
    "https://proxy.cflmy.top/github.com/cflmy/marqdo/releases/download/ext-v${EXT_VER}/${native_file}"; \
  rm -rf /tmp/ext-dist /tmp/native-dist; \
  mkdir -p /tmp/ext-dist /tmp/native-dist; \
  unzip -q /tmp/ext.zip -d /tmp/ext-dist; \
  unzip -q /tmp/native.zip -d /tmp/native-dist; \
  if [ -d /tmp/ext-dist/ext ]; then \
    rm -rf /opt/marqdo/ext; \
    cp -a /tmp/ext-dist/ext /opt/marqdo/ext; \
  else \
    echo "error: ext zip missing top-level ext/" >&2; \
    exit 1; \
  fi; \
  mkdir -p /opt/marqdo/ext/native; \
  if [ -d /tmp/native-dist/native ]; then \
    cp -a /tmp/native-dist/native/. /opt/marqdo/ext/native/; \
  else \
    echo "error: native zip missing top-level native/" >&2; \
    exit 1; \
  fi; \
  echo "${EXT_VER}" > /opt/marqdo/ext/VERSION; \
  rm -rf /tmp/ext.zip /tmp/native.zip /tmp/ext-dist /tmp/native-dist

ENV MARQDO_EXT=/opt/marqdo/ext
ENV PATH="/opt/marqdo:${PATH}"
RUN test -d "${MARQDO_EXT}/web" \
  && test -f "${MARQDO_EXT}/VERSION" \
  && grep -qx "${MARQDO_EXT_VERSION}" "${MARQDO_EXT}/VERSION" \
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
