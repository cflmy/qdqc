"""Repair live qdqc.db content that GFM pipes corrupted."""
import sqlite3
from pathlib import Path

DB = Path(__file__).resolve().parents[1] / "data" / "qdqc.db"

QUBIT = (
    "经典比特只能是 0 或 1，而量子比特（qubit）可以处于它们的叠加态——"
    "像一枚正在旋转的硬币，在落地之前既是正面也是反面。"
    "我们用一个态矢 |ψ⟩ = α|0⟩ + β|1⟩ 描述它，|α|² 与 |β|² 分别是测量到 0 和 1 的概率。"
    "这就是量子计算一切奇迹的起点。"
)

LA = (
    "量子态写在向量里，演化写在矩阵里。若把量子比特想象成二维复向量，"
    "叠加不过是线性组合，测量则与内积和范数有关。\n\n"
    "## 本专栏将覆盖什么\n\n"
    "1. 向量与线性组合\n"
    "2. 矩阵作为线性映射\n"
    "3. 本征值与本征向量（测量与稳定子的数学骨架）\n"
    "4. 内积、正交与酉变换\n\n"
    "读完这些，再进入「量子算法专栏」会顺畅许多。不必先成为证明机器；先建立可复述的几何直觉。\n\n"
    "## 和本站其它专栏的关系\n\n"
    "- **Marqdo 专栏**：工具与表达——如何把笔记变成站点\n"
    "- **量子算法专栏**：把线代直觉用到门线路与算法上\n\n"
    "下一篇将从二维向量与基讲起。"
)

KNOWN = {"quantum", "algorithm", "hardware", "sci-pop", "marqdo"}


def main() -> None:
    con = sqlite3.connect(DB)
    cur = con.cursor()
    row = cur.execute(
        "SELECT tag, length(content) FROM posts WHERE slug = ?", ("qubit-intro",)
    ).fetchone()
    if row:
        tag, n = row
        if tag not in KNOWN or (n or 0) < 80:
            cur.execute(
                "UPDATE posts SET tag = ?, content = ? WHERE slug = ?",
                ("quantum", QUBIT, "qubit-intro"),
            )
            print("repaired qubit-intro")
    if not cur.execute("SELECT 1 FROM posts WHERE slug = ?", ("la-why-vectors",)).fetchone():
        cur.execute(
            """INSERT INTO posts (title, slug, summary, content, tag, column_slug, pinned, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                "线性代数开篇：为什么量子计算需要向量",
                "la-why-vectors",
                "从「数组」走到「态矢」：线性代数如何成为量子语言的语法。",
                LA,
                "sci-pop",
                "linear-algebra",
                0,
                "2026-08-31",
                "2026-08-31",
            ),
        )
        print("inserted la-why-vectors")
    cur.execute("DELETE FROM post_tags WHERE post_id NOT IN (SELECT id FROM posts)")
    con.commit()
    con.close()
    print("ok", DB)


if __name__ == "__main__":
    main()
