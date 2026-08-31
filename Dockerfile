# 求道量子 · Marqdo 站点
# 官方 Release 暂无 Linux 二进制，构建阶段从源码编译 marqdo + web 插件。
# syntax=docker/dockerfile:1

ARG MARQDO_VERSION=0.3.1
ARG RUST_IMAGE=rust:1.81-bookworm

FROM ${RUST_IMAGE} AS builder
ARG MARQDO_VERSION
WORKDIR /build

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl pkg-config \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL "https://github.com/cflmy/marqdo/archive/refs/tags/v${MARQDO_VERSION}.tar.gz" \
  | tar -xz --strip-components=1

ENV CARGO_REGISTRIES_CRATES_IO_PROTOCOL=sparse
RUN cargo build --release --bin marqdo \
  && cargo build --release -p marqdo_plugin_web

ENV MARQDO_EXT=/opt/marqdo/ext
ENV MARQDO_EXT_SOURCE=/build/ext
RUN mkdir -p "${MARQDO_EXT}" \
  && ./target/release/marqdo ext add web \
  && test -f "${MARQDO_EXT}/web/网页.mq.md" \
  && test -f "${MARQDO_EXT}/native/libweb.so"

FROM debian:bookworm-slim AS runtime

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl tini \
  && rm -rf /var/lib/apt/lists/* \
  && useradd --system --uid 10001 --home-dir /app --shell /usr/sbin/nologin qdqc

COPY --from=builder /build/target/release/marqdo /usr/local/bin/marqdo
COPY --from=builder /opt/marqdo/ext /opt/marqdo/ext

WORKDIR /app
COPY --chown=qdqc:qdqc . /app/
RUN mkdir -p /app/data && chown qdqc:qdqc /app/data \
  && chmod +x /app/docker/entrypoint.sh

ENV HOME=/app \
  MARQDO_EXT=/opt/marqdo/ext \
  MARQDO_WEB_PLUGIN=/opt/marqdo/ext/native/libweb.so

USER qdqc
EXPOSE 18085
ENTRYPOINT ["/usr/bin/tini", "--", "/app/docker/entrypoint.sh"]
CMD ["marqdo", "run", "index.mq.md"]
