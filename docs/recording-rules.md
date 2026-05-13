# 有趣 GitHub 專案紀錄規則

所有專案紀錄一律放在 `content/projects/*.md`。檔名使用小寫英文、數字與連字號，例如 `local-ai-tool.md`。

## 語言規則

- 全文必須使用繁體中文，專案名稱、程式語言、品牌名、網址與必要技術名詞可以保留原文。
- 不使用簡體字。常見禁止字包含：项目、开发、测试、云、数据、应用、用户、环境、支持、实现、体验、优化。
- 句子要具體，避免只有「很強」「很好用」「值得看看」這類無法測試的描述。
- 每個段落建議 1 到 3 句，方便之後轉成網頁卡片或摘要。

## Frontmatter 欄位

每篇 Markdown 必須以 `---` 包住 frontmatter，欄位順序固定如下：

```yaml
title: 專案名稱
repo: https://github.com/owner/repo
homepage: https://example.com/
summary: 一到兩句繁體中文摘要。
tags: [分類一, 分類二, 分類三]
status: 待研究
language: TypeScript
updated: 2026-05-14
difficulty: 入門
highlights: [亮點一, 亮點二, 亮點三]
```

## 欄位定義

| 欄位 | 必填 | 格式 | 說明 |
| --- | --- | --- | --- |
| `title` | 是 | 文字 | 專案名稱，盡量使用官方名稱。 |
| `repo` | 是 | GitHub URL | 必須是 `https://github.com/owner/repo`。 |
| `homepage` | 否 | URL | 沒有官方網站時可留空。 |
| `summary` | 是 | 繁體中文句子 | 80 字以內，說明值得測試的原因。 |
| `tags` | 是 | 陣列 | 2 到 5 個 tag，每個 tag 2 到 10 字。 |
| `status` | 是 | 固定選項 | `待研究`、`可測試`、`已測試`、`暫緩`。 |
| `language` | 是 | 文字 | 主要程式語言或內容類型。 |
| `updated` | 是 | `YYYY-MM-DD` | 紀錄最後更新日期。 |
| `difficulty` | 是 | 固定選項 | `入門`、`中階`、`進階`。 |
| `highlights` | 是 | 陣列 | 2 到 4 個亮點，每個亮點 4 到 16 字。 |

## 內文段落

frontmatter 後方的標題必須完全符合以下順序：

```markdown
## 專案定位
## 有趣之處
## 測試重點
## 使用情境
## 風險與備註
```

每個標題下方至少一段文字。不要新增其他二級標題；需要補充時放進既有段落。

## 品質檢查

提交前必須執行：

```bash
npm run validate
```

檢查通過後再執行：

```bash
npm run build:data
```

`data/projects.json` 是網站讀取的資料，不要手動編輯。
