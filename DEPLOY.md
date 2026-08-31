# Docker 快速部署

本站基于 [Marqdo](https://github.com/cflmy/marqdo) `ext/web`。官方 Release 目前只有 Windows 包，镜像会在构建阶段编译 Linux 版 `marqdo` 与 `libweb.so`（首次构建较慢，约需数分钟到十几分钟，取决于网络与机器）。

## 前置

- 已安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)（或兼容的 Docker Engine + Compose）

## 一键拉起

在项目根目录：

```bash
docker compose up -d --build
```

浏览器打开：http://127.0.0.1:18085

后台 / 写作台需登录：账号见站点配置（默认 `admin`）。

换端口：

```bash
QDQC_PORT=8080 docker compose up -d --build
```

## 常用命令

```bash
# 看日志
docker compose logs -f qdqc

# 停掉
docker compose down

# 停掉并删除数据卷（清空 SQLite）
docker compose down -v
```

## 数据持久化

SQLite 文件在容器内 `/app/data`，通过 Compose 卷 `qdqc-data` 持久化。首次启动若库为空，会按 `db/seed.mq.md` 幂等写入种子数据。

## 本机开发（非 Docker）

监听已改为 `0.0.0.0:18085`，本机与容器均可访问：

```powershell
marqdo run index.mq.md
```

## 镜像结构简述

| 阶段 | 作用 |
|------|------|
| builder | 拉取 Marqdo `v0.3.1` 源码，编译 CLI + web 插件，执行 `marqdo ext add web` |
| runtime | Debian slim + 站点文件，入口 `marqdo run index.mq.md` |
