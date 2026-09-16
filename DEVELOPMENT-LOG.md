# superbuyget.com — 制作过程记录（会话整理）

> 说明：这不是 Cursor 聊天原文备份，而是根据开发过程整理的技术与决策摘要，便于「恢复上下文」与接手的同事阅读。

## 目标与定位

- **站点角色**：`superbuyget.com` 作为 **SuperBuy / superbuy.com** 的「浏览与粘贴」配套说明站；**结账、仓储、QC 工单仍在 superbuy.com**。
- **流量与 SEO 主词**：围绕 **`superbuy spreadsheet`** / **Superbuy spreadsheet**，参考竞品常见组合（QC 图、USD、Taobao / Weidian / 1688、finds 等）。
- **商品展示**：首页嵌入 **Street Style**（`streetstyle.maisonlooks.com`）类目与固定 SKU 卡片网格，外链到对方详情页。

## 页面与信息架构

| 资源 | 作用 |
|------|------|
| `index.html` | 首页：紧凑 hero +「Picks from Street Style」24 张卡 + 类目磁贴 + 简短 outro |
| `workflow.html` | 长文：流程、免责、FAQ，含 **FAQPage** JSON-LD |
| `spreadsheet.html` | spreadsheet 语境与说明 |
| `guides.html` / `contact.html` / `news.html` | 辅助页 |
| `privacy.html` / `terms.html` | 法务简述 |

导航与内链曾把长说明从首页迁到 `workflow.html`，并用 **`/workflow.html#...`** 串起相关锚点。

## UI / 布局（首页）

- **Hero**：由「占满首屏」改为 **紧凑双栏**（文案左、CTA 右），便于首屏露出商品卡；曾移除一句紫色 tagline（「Paste the listing…」）。
- **产品卡**：统一 **1:1 媒体区** + **`object-fit: cover`**，避免竖图/横图导致行高不齐；文案区 **flex** 把价格压底。
- **网格**：`auto-fill` + `minmax(200px, 1fr)`，约 **24** 张卡以适配多列末行不「孤行」。

## SEO（on-page）

- **`<title>` / `meta description` / OG / Twitter**：统一围绕 **Superbuy spreadsheet** + Taobao / Weidian / 1688 + QC / USD；曾加 **2026** 年份后按你的要求 **去掉年份**。
- **`h1` + hero 段落**：自然出现 **`superbuy spreadsheet`**，并强调 browse-only、结账在 **superbuy.com**。
- **产品图 `alt`**：在保留商品描述的前提下追加 **`superbuy spreadsheet browse row · superbuyget`** 后缀（批量一致后缀；若担心模板感可再改为轮换短语）。
- **JSON-LD**：`WebSite` / `Organization` / `WebPage` 与标题意图对齐；JSON 字符串内避免裸 `&`，用 `and` 或拆分。

## Logo / 顶栏

- 顶栏 **`<a class="header-logo">`** 与 Superbuy 官网一致：**空链 + CSS 背景图**，使用官方 CDN **`logo-w.png`**（深色顶栏），**`title`** 使用你提供的英文句（含 *help* 原文）。
- **`href`**：`https://www.superbuy.com/en/page/homepage`，`target="_blank"` + `rel="noopener noreferrer"`；内有 **`visually-hidden`**「Superbuy home」兼顾读屏。
- **域名说明**：`/en/page/homepage` 在 **superbuyget.com** 上作为相对路径会 404，故未在本站相对使用。

## 数据与外链

- 商品：**CDN** `cdn.maisonlooks.com` **webp**；某张 **AirPods Pro Triple White** 图裂：**CDN 文件名与类目页不一致**或资源失效 → 已整条 SKU 换成 **Apple AirPods Pro (White)** 另一条 listing。

## Git / GitHub（重要）

1. **`chufuhai88-code/kakobuyslink`**：工作区曾一度只有该 **`origin`**，整站 **`superbuyget/`** 曾被 **误推到该仓库**。
2. **纠正**：从 **kakobuyslink** **删除 `superbuyget/`**（新提交推到 `main`），并在 **子站根 `.gitignore`** 增加 **`superbuyget/`**，避免再次误提交。
3. **正确远端**：`**chufuhai88-code/superbuyget.co**` — 已将同一份静态站 **同步 push 到该仓库 `main`**；Actions 会向 **`gh-pages`** 发布（见 `.github/workflows/gh-pages.yml`）。
4. **本地**：`**子站/superbuyget/**` 仍保留为日常工作目录（相对父仓库被 ignore）；以后改完应 **`git clone`** 或对 **superbuyget.co** 仓库 Pull/Push，勿再混入 kakobuyslink。
5. **Cursor 规则**：原先的 **`kakobuyslink-scope.mdc`** 已按你的要求删除；不再强制「只能推 kakobuyslink」。

## 本地预览

- **`run-preview.bat`**：`python -m http.server 8877 --bind 127.0.0.1`，说明含 **`http://127.0.0.1:8877/`** 与 **`http://superbuyget.com:8877/`**（后者需 hosts）。
- **`add-hosts-for-local.bat`**（管理员运行）：写入 `superbuyget.com` / `www.superbuyget.com` → `127.0.0.1`。
- **注意**：静态里的 **canonical / og:url** 仍指向 **`https://superbuyget.com`**，本地仅用 http + 端口预览布局。

## 杂项故障（环境）

- 某端口 **`8767`** 曾 **`WinError 10013`**（占用/权限）→ 预览改用 **8877**。
- PowerShell 下链式 **`&&`** 易报错 → 用 **`;`** 或分命令 / `working_directory`。

## 若要在 Cursor 里找「原版对话」

- 侧边栏 **聊天历史**，或 **Agent transcripts**（若项目启用了可追溯的父会话 ID，仅能作参考索引，不等同完整 UI 导出）。
- **无法**由助手从本仓库「一键还原」已全部删除的会话文本；请以本文件 + `git log` 为准。

---

*最后整理日期以仓库内修改为参考；细节上接 `git log` 与比对 `superbuyget.co`。*
