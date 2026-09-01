qdqc 数据库迁移

版本化 SQL（`数据库.迁移`）。已应用版本记入 `_marqdo_migrations`，可重复执行。

## 迁移步骤

`迁移步骤` =

| 版本 | SQL |
|------|-----|
| 1 | CREATE TABLE IF NOT EXISTS "columns" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "name" TEXT NOT NULL, "slug" TEXT NOT NULL UNIQUE, "summary" TEXT, "sort_order" INTEGER, "status" TEXT, "created_at" TEXT) |
| 2 | CREATE UNIQUE INDEX IF NOT EXISTS "idx_columns_slug" ON "columns" ("slug") |
| 3 | ALTER TABLE "posts" ADD COLUMN "column_slug" TEXT |
| 4 | ALTER TABLE "posts" ADD COLUMN "pinned" INTEGER DEFAULT 0 |
| 5 | INSERT OR IGNORE INTO "columns" ("id", "name", "slug", "summary", "sort_order", "status", "created_at") VALUES (1, 'Marqdo 专栏', 'marqdo', '文档即代码、站点与写作台——用 .mq.md 把想法落成可读可运行的系统。', 1, 'ongoing', '2026-08-31'), (2, '线性代数专栏', 'linear-algebra', '向量、矩阵与本征：量子计算所需的数学直觉，循序铺垫。', 2, 'ongoing', '2026-08-31'), (3, '量子算法专栏', 'quantum-algorithms', '门线路、Shor / Grover 与纠错入门；建议具备线代直觉后阅读。', 3, 'ongoing', '2026-08-31') |
| 6 | UPDATE "posts" SET "column_slug" = 'marqdo' WHERE "slug" = 'intro-to-marqdo' |
| 7 | UPDATE "posts" SET "column_slug" = 'quantum-algorithms' WHERE "slug" IN ('quantum-circuits', 'quantum-error-correction') |
| 8 | UPDATE "posts" SET "pinned" = 1 WHERE "slug" = 'hello-qdqc' |
| 9 | UPDATE "posts" SET "pinned" = 0 WHERE "pinned" IS NULL |
| 10 | CREATE TABLE IF NOT EXISTS "news" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "title" TEXT NOT NULL, "url" TEXT NOT NULL, "source" TEXT, "summary" TEXT, "published_at" TEXT, "created_at" TEXT) |
| 11 | INSERT OR IGNORE INTO "news" ("id", "title", "url", "source", "summary", "published_at", "created_at") VALUES (1, 'IBM 公布下一代量子处理器路线与容错里程碑', 'https://newsroom.ibm.com/quantum', 'IBM', '量子硬件与纠错路线图相关通报。', '2026-08-20', '2026-08-20'), (2, 'Google Quantum AI：表面码与逻辑比特实验进展综述', 'https://quantumai.google/', 'Google Quantum AI', '逻辑量子比特与纠错实验动态。', '2026-08-12', '2026-08-12'), (3, '中国九章光量子计算原型机相关报道回顾', 'https://www.nature.com/', 'Nature', '光量子算力与玻色取样方向的公开进展。', '2026-07-28', '2026-07-28'), (4, 'IonQ / 离子阱路线：高保真门操作与云访问更新', 'https://ionq.com/', 'IonQ', '离子阱硬件与云平台产品动态。', '2026-08-05', '2026-08-05'), (5, 'NIST 后量子密码标准化推进与迁移提醒', 'https://csrc.nist.gov/projects/post-quantum-cryptography', 'NIST', '经典互联网向后量子算法迁移的标准进展。', '2026-08-18', '2026-08-18') |
| 12 | INSERT OR IGNORE INTO "news" ("id", "title", "url", "source", "summary", "published_at", "created_at") VALUES (6, 'Quantinuum：离子阱逻辑比特保真度新进展', 'https://www.quantinuum.com/', 'Quantinuum', '高保真逻辑比特与纠错演示。', '2026-08-22', '2026-08-22'), (7, 'AWS Braket 扩展量子硬件与模拟器可用区', 'https://aws.amazon.com/braket/', 'AWS', '云上量子实验与混合工作流更新。', '2026-08-16', '2026-08-16'), (8, 'Microsoft Azure Quantum：拓扑与纠错研究简报', 'https://azure.microsoft.com/products/quantum', 'Microsoft', '云量子平台与材料路线动态。', '2026-08-14', '2026-08-14'), (9, '原子阵列中性原子量子计算实验综述', 'https://www.nature.com/subjects/quantum-information', 'Nature QI', '中性原子阵列扩展与门操作进展。', '2026-08-09', '2026-08-09'), (10, '欧洲量子旗舰计划：产业落地与标准协作', 'https://qt.eu/', 'Quantum Flagship', '欧洲量子科技战略与试点项目。', '2026-08-03', '2026-08-03'), (11, '量子传感：惯性测量与精密计时应用速览', 'https://www.nist.gov/', 'NIST', '量子传感在导航与计量中的应用。', '2026-07-30', '2026-07-30'), (12, '开源量子软件栈：Qiskit / Cirq 生态更新', 'https://qiskit.org/', 'Qiskit', '编译器、算法库与教学资源更新。', '2026-08-21', '2026-08-21'), (13, '超导量子比特相干时间与可扩展互连', 'https://arxiv.org/list/quant-ph/recent', 'arXiv', '硬件物理与互连架构预印本精选。', '2026-08-19', '2026-08-19'), (14, '量子机器学习：变分算法与噪声鲁棒性讨论', 'https://quantum-journal.org/', 'Quantum', 'VQE/QAOA 与 NISQ 应用边界。', '2026-08-11', '2026-08-11'), (15, '后量子 TLS 试点：浏览器与 CDN 迁移观察', 'https://blog.cloudflare.com/', 'Cloudflare', '混合密钥交换与部署经验。', '2026-08-07', '2026-08-07'), (16, '光子量子计算：可扩展光源与干涉网络', 'https://www.psi.ch/', 'PSI / 学界', '光量子线路与集成光学进展。', '2026-07-25', '2026-07-25') |

**`迁移步骤`**
