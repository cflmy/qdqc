# Docker 快速部署

生产站点：**https://qdqc.com**（已备案）。公开源码即本仓库。论文/Industry 证据说明见 [docs/PUBLIC-SITE.md](docs/PUBLIC-SITE.md)。

本站基于 [Marqdo](https://github.com/cflmy/marqdo) **1.3.0** Web Artifact（ADR 0007：Document / Endpoint / Resource）。镜像在构建阶段下载官方 **Linux 预编译包**（CLI + `ext/` + `libweb.so`），无需本机 Rust/Cargo。

入口为 **`serve.mq.md`**（`web.app` + 显式 `web.route`），页面袋由 `site/kit.mq.md` 戳记；**禁止** `compose_*` / `app.configure`。页面 Document 在 `pages/` 与根 `index.mq.md`（文档与 EKC）；API 为 `api/*.mq.md` Endpoint。

镜像基础系统为 **Ubuntu 24.04**（GLIBC ≥ 2.39）。官方 Marqdo Linux 包在 `ubuntu-latest` 上构建，**不能**跑在 Debian bookworm（GLIBC 2.36）上。

## 数据库

默认使用本地 SQLite：`sqlite:data/qdqc.db`。

切换到 Postgres：在项目根创建 `.env`（已 gitignore）：

```bash
QDQC_DATABASE_URL=postgres://USER:PASS@HOST:5432/qdqc
```

会话存 Redis（与业务库分离）时再加：

```bash
QDQC_REDIS_URL=redis://:PASSWORD@127.0.0.1:6379/0
```

登录 / 注册走 [CFLMY 统一身份](https://id.cflmy.cn/api-docs)（OAuth 授权码）时：

```bash
QDQC_OIDC_ISSUER=https://id.cflmy.cn
QDQC_OIDC_CLIENT_ID=app_…
QDQC_OIDC_CLIENT_SECRET=…
QDQC_OIDC_REDIRECT_URI=http://localhost:18085/oidc/callback
```

回调地址须与 IdP 后台登记完全一致。IdP 的 `is_admin` / `admin_role` 用户获得本站 `admin`（写作台）权限。

从本地 SQLite 迁移：

```bash
python tools/migrate_sqlite_to_postgres.py
```

`db.migrate` 仅在默认 SQLite 路径下执行；Postgres 请用上述脚本或外部迁移工具。

## 一键拉起

在项目根目录：

```bash
docker compose up -d --build
```

浏览器打开：http://127.0.0.1:18085

后台入口：**/login**（登录后进入 `/admin`）。

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

需本机安装 **Marqdo ≥ 1.3.0** 与 web 插件：

1. 从 [Releases](https://github.com/cflmy/marqdo/releases/tag/v1.3.0) 下载 Linux/Windows bundle（含 CLI + `lib/` + `ext/` + native）
2. 解压并把目录加入 `PATH`，设置 `MARQDO_EXT` 指向包内 `ext`
3. 如需单独补插件：`marqdo ext add web`

监听为 `0.0.0.0:18085`：

```bash
marqdo run serve.mq.md
```

主题与刊头 / 专栏 / 写作台样式在 `styles/`（`theme`、`brand-motion`、`volume`、`editor`），经 `web.make_style` 装配。

## 镜像结构简述

| 阶段 | 作用 |
|------|------|
| builder | 下载 Marqdo `v1.3.0` Linux bundle，校验 CLI 与 `libweb.so` |
| runtime | Ubuntu 24.04 + 站点文件，入口 `marqdo run serve.mq.md` |
