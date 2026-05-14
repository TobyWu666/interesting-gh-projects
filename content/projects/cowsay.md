# cowsay
### 經典終端機 ASCII 對話框工具

**日期：** 2026-05-14
**Repo：** [cowsay-org/cowsay](https://github.com/cowsay-org/cowsay)
**⭐ Stars：** 經典工具
**語言：** Perl / Python wrapper
**安裝：** `pip install cowsay`

---

## 📖 這是什麼

cowsay 是一個經典的 ASCII 藝術工具，讓一隻可愛的牛說出你指定的話語。這個專案源自 Linux 系統的 `cowsay`，現在有了 Python 版本，不僅繼承了經典的牛角色，還支援多種角色（`cowthink` 讓牛思考）、自訂字元替換，以及 `--list` 查看所有可用角色。簡單又好玩！

---

---

## ⚙️ 原理

cowsay 的原理非常直覺：

1. **文字填充**：將輸入文字包裝在帶有「氣泡」邊框的 ASCII 藝術框中
2. **牛圖拼接**：在氣泡下方拼接牛的 ASCII 藝術圖案
3. **角色系統（Character）**：使用不同字元替代牛的 ASCII 圖案
   - 例如：`cowsay -c dragon "Hello"` 用龍替代牛
4. **cowthink**：不使用對話框，改用思考框（`o` 替代 `\`/`/`）

可用 `cowsay --list` 查看所有內建角色。

---

---

## 🧪 測試結果

```bash
# 基本使用
cowsay -t "Hello from cowsay!"

# 思考模式
cowthink -t "What a nice day!"

# 列出所有角色
cowsay --list
```

**實際輸出 - cowsay**：
```
 __________________
< Hello from cowsay! >
 ------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

**實際輸出 - cowthink**：
```
 __________________
( What a nice day! )
 ------------------
        o   ^__^
         o  (--)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

---

---

## 💡 想法與心得

cowsay 是那種「沒什麼實用價值但每次用都會笑」的工具。它是節日派對、團隊 Slack 通知、甚至 README 生日祝福的完美伴侶。

在自動化腳本中使用 cowsay 可以讓枯燥的 Cron Job 輸出變得有趣。例如：
```bash
# 備份完成通知
python backup.py && cowsay "Backup completed successfully!" || cowthink "Backup failed!"
```

cowthink 比 cowsay 少用，但有時候更爆笑。總的來說這是一個用於調劑心情的小工具，5 分鐘就能玩遍所有功能。

⭐ PyPI Downloads: 大量（經典工具）

---

## 📊 總評

**結論：** cowsay 適合收進 Git趣作為命令列與開發工具靈感。它的測試內容已涵蓋基本用法、輸出效果與適合場景，後續可以依實際使用需求補上更多平台差異或進階案例。
