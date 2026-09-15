# 缺陷：动态路由 `{param}` 未代入查询条件，详情页空渲染

| 项 | 内容 |
|----|------|
| 产品 | Marqdo `ext/web`（libweb） |
| 版本 | **v1.0.0**（Go 端口）；相对 Rust `plugins/web-rust-archive` 为回归 |
| 严重度 | 高：官方博客示例路径 `/post/{slug}`、`/tag/{slug}` 主栏无文章 |
| 类型 | **实现缺口 / 移植遗漏**，不是 Markup 语法或站点用法错误 |
| 复现环境 | Windows / Linux；`marqdo run`；求道量子与 `examples/marqdo-blog` 同构配置 |

---

## 结论

**不是站点设计错，是引擎未履行已发布的 ABI。**

`ext/web/网页.mq.md` 对「查询条件」的约定是：条件值里的 `{参数}` **由动态路由参数替换**（例如 `/post/{slug}`）。官方示例 `examples/marqdo-blog` 与求道量子均按此书写：

```text
`文章条件` =

| 字段 | 操作 | 值 |
|------|------|-----|
| slug | = | {slug} |

**post = > post.查询条件 条件=`文章条件`**
**post = > post.详情 详情=True**
**app = > app.路由 路径="/post/{slug}" 页面=post**
```

1.0 Go 端口会捕获路径参数并写入 `page.params`，但 **查询 SQL 仍使用字面量 `{slug}`**，库中没有 `slug = '{slug}'` 的行，详情绑定结果为空，`<main>` 无 `<article>`。

这不是「动态路由不该用占位符」的设计变更：文档、示例、冒烟脚本（`grep article-title`）仍按旧契约编写。属于 **Rust → Go 重写时漏移植 `resolve_params`**。

---

## 复现

1. 使用 1.0.0 预编译包，`MARQDO_EXT` 指向配套 `ext/`。
2. 运行含 `/post/{slug}` + `查询条件` 值 `{slug}` + `详情=True` 的站点。
3. `GET /` 列表正常（无路径参数）。
4. `GET /post/<真实 slug>` 返回 200，但主栏为空：

```html
<main class="main" data-slot="main" data-slot-src="/post/{slug}/_part/index"></main>
```

5. 同一 slug 的 `GET /api/posts`（或等价 JSON 接口）能返回该行正文。

`data-slot-src` 里的 `{slug}` 未被替换，说明零件前缀用的是路由**模式** `_route`，不是本次请求的实际路径。

---

## 根因

### 1. 主因：查询条件不展开 `{param}`（1.0 完全缺失）

请求期注入参数（已做）：

```354:363:plugins/web/internal/httpx/listen.go
func (st *state) makeDynamicPage(page map[string]any, pattern string) http.HandlerFunc {
	paramNames := pathParamNames(pattern)
	return func(w http.ResponseWriter, r *http.Request) {
		p := cloneMap(page)
		params := map[string]any{}
		for _, name := range paramNames {
			params[name] = r.PathValue(name)
		}
		injectParams(p, params)
		st.writePage(w, r, p)
	}
}
```

`injectParams` 只设置 `page["params"]`。渲染取数时原样把 `page.query` 交给 `db.Select`：

```191:205:plugins/web/internal/render/render.go
func selectPageData(...) {
	var where any
	if q, ok := page["query"]; ok {
		where = q
	}
	...
	out, err := db.Select(url, tableName, limit, opts)
}
```

GFM 条件表经 `parseWhere` / `AsRows` 变成 `slug = ?`，绑定值是字符串 **`{slug}`**，不是路径上的 `qubit-intro`。

Rust 旧实现在 `select_page_data` 里会先 `resolve_params`：

```456:477:plugins/web-rust-archive/src/render.rs
let mut where_v = args.get("query").cloned();
if let Some(m) = where_v.as_ref().and_then(|v| v.as_object()) {
    if m.iter().any(|(_, v)| v.as_str().is_some_and(|s| s.contains('{'))) {
        // 对 map 的字符串值做 {param} 替换
    }
}
```

Go 端口没有等价步骤。`page.params` 成为死数据。

### 2. 契约与实现的第二层缺口（Rust 也不完整）

文档允许的写法是 **过滤表** `|字段|操作|值|`，运行时常见形态是列式对象：

```json
{ "字段": ["slug"], "操作": ["="], "值": ["{slug}"] }
```

或行列表：

```json
[{ "字段": "slug", "操作": "=", "值": "{slug}" }]
```

Rust 的 `resolve_params` **只处理「顶层 map 且值为字符串」**。列式表的 `值` 是数组，行列表则根本不是 object，旧实现也可能漏替换。因此：

- 1.0 是明确回归（连 map 字符串路径都没做）。
- 完整修复应对 `query` **所有字符串叶子**做 `{name}` 替换（列式、行表、嵌套均覆盖），与文档一致。

### 3. 伴随问题（同一迁移）

| 现象 | 位置 | 说明 |
|------|------|------|
| `data-slot-src="/post/{slug}/_part/..."` | `partSrcPrefix` 读 `page["_route"]` | `_route` 在 `web_app_route` 时打成模式串，未换成本次 URL |
| 详情正文无 Markdown / 公式 | `renderArticle` 注释 `full markdown deferred` | Rust 调用 `markdown::to_html`；Go 只 `esc` 后塞进单个 `<p>` |

后两项不是空页的直接原因，但修好 `{slug}` 之后，正文仍会是转义纯文本而非 GFM。

---

## 期望行为

对 `GET /post/hello-marqdo`：

1. `page.params["slug"] == "hello-marqdo"`。
2. 查询等价于 `WHERE "slug" = 'hello-marqdo'`。
3. `详情=True` 时 SSR 输出 `<article class="article">`、`<h1 class="article-title">`、正文 HTML（Markdown）。
4. `data-slot-src` 为 `/post/hello-marqdo/_part/...`（若仍输出零件 URL）。
5. `examples/marqdo-blog/smoke.sh` 中「文章详情渲染」应通过。

---

## 建议修复（引擎侧）

1. 在 `selectPageData`（及零件 `renderFragment` 使用的同一路径）于 `db.Select` 之前，用 `page["params"]` 递归替换 `query` 中所有 `{name}` 字符串。
2. 未匹配的占位符保持原样或按 Rust：仍输出 `{name}`，便于排错。
3. `partSrcPrefix`：用实际 `r.URL.Path`（去掉 `/_part/...`）或把 `params` 代入 `_route`。
4. 恢复详情 Markdown 渲染，与 Rust `markdown::to_html` 对齐。
5. 增加回归测试：GFM `|字段|操作|值|` + `{slug}` + 动态路由；断言 HTML 含标题与正文，且 **不含** 字面 `{slug}` 的 slot URL。

站点侧可用 JSON API + 前端回填作权宜之计，**不能替代**引擎履行 ABI。

---

## 影响面

所有依赖动态段过滤的页面，不限于文章：

- `/post/{slug}` + `slug = {slug}`
- `/tag/{slug}` + `tag = {slug}`
- `/column/{slug}` + `column_slug = {slug}`
- 其它 `{id}` / `{key}` 查询条件

列表页、静态页不受影响。

---

## 求道量子侧记录

- 本地提交 `0930acf`：`public/volume.js` 对 `/post/`、`/tag/` 用 `/api/posts` 回填；`public/md.js` 渲染 Markdown。
- 待 Marqdo 修复后可删除该回填，改回纯 SSR。

相关：样式表数字单元格误报见 [marqdo-1.0-css-numeric-false-positive.md](./marqdo-1.0-css-numeric-false-positive.md)。
