# 缺陷：样式表数字单元格被误报为「可疑 `/` 除法」

| 项 | 内容 |
|----|------|
| 产品 | Marqdo `ext/web`（libweb） |
| 版本 | **v1.0.0**（Go）；Rust `web-rust-archive` 有同一启发式；**v1.0.1 已修复** |
| 状态 | **已修复**（2026-09-15 / Marqdo v1.0.1） |
| 严重度 | 中：不阻断启动，但淹没真实错误；站点日志不可读 |
| 类型 | **启发式误报**；文案与判定不一致 |
| 复现环境 | `marqdo run` 任意带 GFM 样式表的站点（求道量子一次启动约 200+ 条） |

---

## 状态（1.0.1）

升级到 **Marqdo v1.0.1** 后本地复测：启动 stderr **不再**出现 `suspicious cell`（求道量子 `_run_err.txt` 计数为 0）。`cssValueSuspicious` 已收窄，合法 number 不再告警。

以下为 1.0.0 时期的缺陷说明，供对照。

---

## 结论

引擎把样式表「值」列里**已经求值成 JSON 数字**的格子一律打成：

```text
warning: ext/web style: suspicious cell for `z-index`: numeric CSS value (likely bare `/` division such as `1 / 5`; quote the cell, e.g. `"1 / 5"`)
```

判定只看类型是不是 `float64` / `int` / `bool`，**并不检查格子里有没有 `/`**。于是合法 CSS 都会误报：

| 写法 | 求值后 | 是否合法 CSS | 引擎 |
|------|--------|--------------|------|
| `z-index` = `20` | number | 是 | 警告 |
| `font-weight` = `700` | number | 是 | 警告 |
| `opacity` = `0.5` | number | 是 | 警告 |
| `line-height` = `1.28` | number | 是 | 警告 |
| `flex-shrink` = `0` | number | 是 | 警告 |
| `margin` = `0` | number | 是（`0` 可省略单位） | 警告 |
| `grid-column` = `1 / -1` 若求值成除法 | number | 否，这才是该拦的 | 警告（碰巧对） |
| `"1 / 5"` 或 `"1px solid var(--line)"` | string | 是 | 不警告 |

文案说「很可能是裸 `/` 除法，请给格子加引号」，实际触发条件是「值是数字」。作者按文档写 `z-index | 20` 也会被骂，这是误报，应修引擎，而不是逼站点把所有数字都加上引号。

---

## 复现

1. 任意 `.mq.md` 样式表：

```text
| 选择器 | 属性 | 值 |
|--------|------|-----|
| header.topnav | z-index | 20 |
| .article-title | font-weight | 700 |
| .lede | line-height | 1.35 |
```

2. `marqdo run`（非 strict）。
3. stderr 对上述每一行各打一条 `suspicious cell`，站点仍正常出 CSS。

求道量子 `styles/*.mq.md` 一次启动可刷满终端（`_run_err.txt` 二百余行几乎全是这类 warning），没有 panic。

---

## 根因

```695:720:plugins/web/internal/table/table.go
func cssValueSuspicious(v any) string {
	switch v.(type) {
	case float64, int, int64:
		return "numeric CSS value (likely bare `/` division such as `1 / 5`; quote the cell, e.g. `\"1 / 5\"`)"
	case bool:
		return "boolean CSS value (quote the cell if intentional)"
	default:
		return ""
	}
}
```

Rust 旧实现同样只匹配 `Value::Number` / `Bool`（`plugins/web-rust-archive/src/table.rs` 的 `css_value_suspicious`）。

Markup 会把未加引号的 `20`、`0`、`1.28` 求成数字，这是语言常态，不是「用户误写了 `1 / 5`」。`1 / 5` 才会变成 `0.2` 这种「看起来像数字、语义已错」的值；当前规则无法区分「作者就是要 `z-index: 20`」和「作者写了 `1 / 5` 被除掉了」。

---

## 期望行为

1. **默认不要对纯数字告警。** `0`、`20`、`700`、`1.35` 是合法 CSS（数字或无单位 0）。
2. 若仍要防 `/` 除法，应在**求值前**看源单元格是否含未加引号的 `/`（如 `1 / 5`、`1/-1`），而不是求值后见 number 就报。
3. `grid-column: 1 / -1`、`font: 16px / 1.4 sans-serif` 等合法含 `/` 的值，文档已要求加引号；只对「源码含 `/` 且未加引号」告警。
4. 告警应带**文件 / 选择器 / 行**，不能只有属性名，否则两百条无法定位。
5. 提供关闭开关（例如样式 `strict=false` 且 `css_warn=off`），避免正常站点 stderr 不可用。
6. 回归：`z-index | 20` 零警告；未加引号的 `1 / 5` 有警告；`"1 / -1"` 零警告。

---

## 建议修复

- 收窄 `cssValueSuspicious`：删除「凡 number 即可疑」。
- 可选：对「源字符串匹配 `\d+\s*/\s*-?\d+` 且未引用」再 `warning`。
- 不要把合法 `0` 当成错误；CSS 里无单位 `0` 是规范写法。

站点侧把几百个数字都改成 `"20"` 只能消日志，**不能当引擎修对了**。

---

## 与求道量子的关系

- 日志：`_run_err.txt` 启动期几乎全是本警告。
- 探测脚本 `tools/probe_site.py` 不把这些当页面 error（进程仍 200）。
- 相关：动态路由 `{slug}` 未代入见 [marqdo-1.0-dynamic-route-query.md](./marqdo-1.0-dynamic-route-query.md)。
