# Docker 快速部署

生产站点：**https://qdqc.com**（已备案）。公开源码即本仓库。论文/Industry 证据说明见 [docs/PUBLIC-SITE.md](docs/PUBLIC-SITE.md)。

本站基于 [Marqdo](https://github.com/cflmy/marqdo) `ext/web`（Go `libweb`）。镜像在构建阶段下载官方 **Linux 预编译包**（CLI + `ext/` + `libweb.so`），无需本机 Rust/Cargo。

构建使用 **Marqdo v1.0.2+**（含动态路由 `{param}`、详情 Markdown、CSS 数字误报修复、表驱动 `引言装配`）。语法为 Markup v0.3 宪法：`**粗体**` = 可执行代码，`*斜体*` = 返回；相对旧版 `*语句*` / `**返回**` 已对调。本站 `.mq.md` 已按 v1.0 改写。另依赖可配置门禁 / `登录路径` / `后台前缀`、样式表引号约定与 `@keyframes` 装配。

镜像基础系统为 **Ubuntu 24.04**（GLIBC ≥ 2.39）。官方 Marqdo Linux 包在 `ubuntu-latest` 上构建，**不能**跑在 Debian bookworm（GLIBC 2.36）上。

## 前置

- 已安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)（或兼容的 Docker Engine + Compose）

## 一键拉起

在项目根目录：

```bash
docker compose up -d --build
```

浏览器打开：http://127.0.0.1:18085

后台入口：**/login**（登录后进入 `/desk`）。

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

需本机安装 **Marqdo ≥ 1.0.2** 与 web 插件：

1. 从 [Releases](https://github.com/cflmy/marqdo/releases/tag/v1.0.2) 下载 `marqdo-1.0.2-x86_64-pc-windows-msvc.zip`（含 CLI + `lib/` + `ext/` + native DLL）
2. 解压并把目录加入 `PATH`，设置 `MARQDO_EXT` 指向包内 `ext`
3. 如需单独补插件：`marqdo ext add web`

监听为 `0.0.0.0:18085`：

```powershell
marqdo run index.mq.md
```

主题与刊头 / 专栏 / 写作台样式在 `styles/`（`theme`、`brand-motion`、`volume`、`editor`），不再依赖 `public/*.css` 静态样式表。

## 镜像结构简述

| 阶段 | 作用 |
|------|------|
| builder | 下载 Marqdo `v1.0.2` Linux bundle，校验 CLI 与 `libweb.so` |
| runtime | Debian slim + 站点文件，入口 `marqdo run index.mq.md` |
