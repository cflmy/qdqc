# Marqdo ≥1.0.2：Markup v0.3 宪法（**代码** / *返回*）；网页插件为 Go libweb；
# 官方 Release 提供 Linux 预编译包，构建阶段直接解压，无需本机 cargo。
# CI 在 Ubuntu 24.04 上构建，需 GLIBC ≥ 2.39 → 运行时用 ubuntu:24.04（勿用 bookworm）。
# syntax=docker/dockerfile:1

ARG MARQDO_VERSION=1.0.2

FROM ubuntu:24.04 AS builder
ARG MARQDO_VERSION
WORKDIR /build

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl unzip \
  && rm -rf /var/lib/apt/lists/*

# 官方 Linux bundle：CLI + lib/ + ext/ + 原生 .so
RUN curl -fsSL \
    "https://github.com/cflmy/marqdo/releases/download/v${MARQDO_VERSION}/marqdo-${MARQDO_VERSION}-x86_64-unknown-linux-gnu.zip" \
    -o /tmp/marqdo.zip \
  && mkdir -p /opt/marqdo \
  && unzip -q /tmp/marqdo.zip -d /tmp/marqdo-dist \
  && if [ -x /tmp/marqdo-dist/marqdo ]; then \
       cp -a /tmp/marqdo-dist/. /opt/marqdo/; \
     else \
       sub="$(find /tmp/marqdo-dist -maxdepth 2 -type f -name marqdo | head -n1 | xargs dirname)"; \
       cp -a "$sub"/. /opt/marqdo/; \
     fi \
  && test -x /opt/marqdo/marqdo \
  && /opt/marqdo/marqdo version \
  && rm -rf /tmp/marqdo.zip /tmp/marqdo-dist

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
CMD ["marqdo", "run", "index.mq.md"]
