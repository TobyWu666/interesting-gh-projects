# 有趣 GitHub 專案測試庫

一個用來收集、分類與搜尋有趣 GitHub 專案的靜態網站。內容來源放在 `content/projects/*.md`，網站資料由 `scripts/build-data.mjs` 產生到 `data/projects.json`。

## 更新流程

1. 複製 `templates/project-record.md` 到 `content/projects/專案-slug.md`
2. 依照欄位與段落規則填寫繁體中文內容
3. 執行檢查與資料建置

```bash
npm run build:data
```

4. 開啟 `index.html` 檢查搜尋與 tag 分類是否正常

## 指令

```bash
npm run build:data
npm run validate
```

## GitHub Pages

推到 GitHub 後，可在 GitHub Pages 設定使用 `main` 分支的 repository root 部署。
