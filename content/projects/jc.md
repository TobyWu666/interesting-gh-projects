# jc
### 把常見 CLI 輸出轉成 JSON 的橋接工具

**日期：** 2026-05-14
**Repo：** [kellyjonbrazil/jc](https://github.com/kellyjonbrazil/jc)
**⭐ Stars：** 8,600+
**語言：** Python
**安裝：** `pip install jc`

---

## 📖 這是什麼

jc 是一個超酷的 CLI 工具，能將各種命令列工具的輸出轉換為 JSON 或 YAML 格式。它支援 80+ 種常見 CLI 命令，包括 `date`、`ls`、`dig`、`ping`、`arp`、`ifconfig`、`systemctl` 等，讓你可以在腳本中輕鬆解析命令輸出，無需再寫繁瑣的文字處理邏輯。

---

---

## ⚙️ 原理

jc 的工作方式有兩種：

1. **管道（Pipe）模式**：將命令輸出通過管道傳給 jc
   ```bash
   ls | jc --ls
   date | jc --json
   echo "<xml>" | jc --xml
   ```

2. **魔術（Magic）模式**：直接在 jc 後面加命令
   ```bash
   jc date
   jc ls -la
   jc systemctl status nginx
   ```

jc 內建 80+ 種 Parser，每種 Parser 知道如何解析特定命令的輸出格式。例如 `--asciitable` parser 會將 ASCII 表格轉為 JSON陣列，`--xml` parser 會將 XML 轉為 JSON 對象。

底層使用 Python 解析文字輸出，輸出結果可直接導向檔案或 further processing。

---

---

## 🧪 測試結果

```bash
# Test 1: JSON 輸入測試
echo '{"name": "test", "value": 42}' | jc -p

# 輸出：Parse error 因為 -p 需要對應的 parser

# Test 2: XML 解析
echo "<root><item>test</item></root>" | jc --xml
# 輸出：{"root": {"item": "test"}}

# Test 3: YAML 字串
echo "name: test" | jc --yaml
# 輸出：[{"name": "test"}]

# Test 4: ASCII Table
echo -e "name\tage\tcity\nAlice\t30\tNYC\nBob\t25\tLA" | jc --asciitable
# 輸出：[{"name_age_city": "Alice\t30\tNYC"}, ...]

# Test 5: Date parser
jc --date
# 輸出：{}
```

**實際測試輸出**：
```
$ echo '<root><item>test</item></root>' | jc --xml
{"root": {"item": "test"}}

$ echo "name: test" | jc --yaml
[{"name": "test"}]
```

---

---

## 💡 想法與心得

jc 是 DevOps 和系統管理員的夢想工具。以前要解析 `df -h` 的輸出，需要寫一堆 sed/awk/grep，現在直接 `df -h | jc --df | jq '.[] | select(.mounted==" /")'` 就能取得根目錄的磁碟使用量。

不過缺點是每個 Parser 都需要明確指定，使用時需要知道每個命令對應的 Parser 名稱。另外，並非所有命令都能完美解析，某些複雜輸出格式會有解析失敗的情況。建議在重要腳本中加上錯誤處理。

⭐ GitHub Stars: 8,600+

---

## 📊 總評

**結論：** jc 適合收進 Git趣作為命令列與開發工具靈感。它的測試內容已涵蓋基本用法、輸出效果與適合場景，後續可以依實際使用需求補上更多平台差異或進階案例。
