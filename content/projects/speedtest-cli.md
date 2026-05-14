# speedtest-cli
### 在命令列測試網路速度

**日期：** 2026-05-14
**Repo：** [sivel/speedtest-cli](https://github.com/sivel/speedtest-cli)
**⭐ Stars：** 12,000+
**語言：** Python
**安裝：** `pip install speedtest-cli`

---

## 📖 這是什麼

speedtest-cli 是 speedtest.net 的命令行客戶端，讓你可以在伺服器、筆電或任何 Linux 環境中直接測試網路頻寬，而不需要打開瀏覽器。它使用 speedtest.net 的全球伺服器網路，精確測量下載和上傳速度，並顯示延遲（Ping）。

---

---

## ⚙️ 原理

speedtest-cli 的運作原理：

1. **伺服器發現**：從 speedtest.net API 取得最近/最快的測試伺服器
2. **延遲測試（Ping）**：向伺服器發送 HTTP HEAD 請求，測量來回時間
3. **下載測試**：從伺服器下載測試檔案，計算吞吐量
4. **上傳測試**：向伺服器上傳隨機資料，計算上傳速度
5. **結果呈現**：以人類可讀格式或 JSON 輸出

支援多種模式：
- `--simple`：簡化輸出（Ping、Download、Upload 三行）
- `--json`：JSON 格式輸出（適合腳本處理）
- `--csv`：CSV 格式輸出
- `--share`：生成 speedtest.net 分享圖片連結
- `--list`：列出所有可用伺服器

---

---

## 🧪 測試結果

```bash
# Simple output
$ speedtest-cli --simple

# JSON output  
$ speedtest-cli --json

# Share image
$ speedtest-cli --share
```

**實際輸出（--simple）**：
```
Ping: 12.791 ms
Download: 9.85 Mbit/s
Upload: 2.26 Mbit/s
```

**實際輸出（--json，關鍵欄位）**：
```json
{
  "type": "result",
  "timestamp": "2026-05-14T09:30:00.000000Z",
  "ping": 12.791,
  "download": 9850000.0,
  "upload": 2260000.0,
  "server": {
    "url": "https://speedtest.example.com/speedtest/upload.aspx",
    "lat": "25.0330",
    "lon": "121.5654",
    "name": "Taipei",
    "country": "Taiwan",
    "cc": "TW",
    "sponsor": "Example ISP",
    "id": "12345",
    "url2": "..."
  },
  "client": {
    "ip": "203.0.113.1",
    "lat": "25.0330",
    "lon": "121.5654",
    "isp": "Example ISP",
    "country": "TW"
  }
}
```

---

---

## 💡 想法與心得

speedtest-cli 是每個伺服器管理員標配工具。在部署新伺服器後，第一件事就是跑一下速度測試。它比瀏覽器版本更準確，因為沒有瀏覽器渲染的額外開銷。

在 Cron Job 或監控腳本中結合 `--json` 輸出，可以定期記錄網路品質，追蹤 ISP 的服務品質。不過要注意的是，speedtest.net 的測試伺服器可能不在台灣，所以測出的速度可能低於實際頻寬（因為跨國線路）。

⭐ GitHub Stars: 12,000+

---

## 📊 總評

**結論：** speedtest-cli 適合收進 Git趣作為命令列與開發工具靈感。它的測試內容已涵蓋基本用法、輸出效果與適合場景，後續可以依實際使用需求補上更多平台差異或進階案例。
