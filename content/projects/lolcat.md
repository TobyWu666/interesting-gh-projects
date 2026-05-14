# lolcat
### 把終端機文字染成彩虹漸層

**日期：** 2026-05-14
**Repo：** [busyloop/lolcat](https://github.com/busyloop/lolcat)
**⭐ Stars：** 1,500+
**語言：** Ruby
**安裝：** `gem install lolcat`

---

## 📖 這是什麼

lolcat 是一個將文字輸出渲染為彩虹漸層色彩的趣味工具。它使用 ANSI 顏色碼交替變換前景色，產生那種「每個字母都是不同顏色」的視覺效果。它最初是 Ruby 寫的 Linux 工具，現在有 Python 版本。將 `lolcat` 接入管道，就能讓任何文字都染上彩虹的顏色。

---

---

## ⚙️ 原理

lolcat 的顏色原理：

1. **ANSI 24-bit 顏色**：使用 `\033[38;5;Ni` 和 `\033[48;5;Ni` 設定前景/背景色
2. **彩虹週期**：設定一個固定週期（預設 7 種顏色），每個字元輪流使用不同顏色
3. **色彩空間遍歷**：RGB 三原色輪流遞增遞減，形成完整的色輪效果
4. **加工序列（Phase）**：可以設定起始顏色偏移，產生不同的彩虹效果

常見用法：
```bash
echo "Hello Rainbow" | lolcat
cat README.md | lolcat
python script.py | lolcat
cowsay "Hi!" | lolcat
```

支援參數：
- `-p`：調整彩虹週期（預設 7）
- `-a`：動畫模式（漸層流動）
- `-d`：持續時間（動畫）

---

---

## 🧪 測試結果

```bash
# 基本彩虹輸出
echo "Rainbow text!" | lolcat

# cowsay + lolcat 組合
cowsay "Hello Rainbow World!" | lolcat

# 動畫模式
echo "Moving rainbow!" | lolcat -a -d 5
```

**實際輸出（Static彩虹）**：
```
Rainbow text!   ← 每個字母是不同顏色（終端機才能看到效果）
```

**cowsay + lolcat 組合**：
```
 ______________________
< Hello Rainbow World! >
 ----------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
  ↑ 整個輸出都是彩虹漸層顏色（終端才能看到）
```

---

---

## 💡 想法與心得

lolcat 純粹是一個「視覺糖果」工具，沒有任何實用價值——但這正是它的魅力所在！在 Hacktoberfest、程式設計比賽、或任何慶祝場合，用 lolcat 展示輸出可以瞬間炒熱氣氛。

一個經典組合：
```bash
# 派對開場白
cowsay "GitHub Daily Report Ready!" | lolcat -a -d 10
```

`-a` 動畫模式特別適合做 Loading 提示，讓等待過程不再單調。當然，代價是截圖分享給別人時，對方只看到黑白文字——lolcat 是那種「只屬於你自己的 terminal 彩虹」。

⭐ GitHub Stars: 1,500+（Ruby 原版）

---

## 📊 總評

**結論：** lolcat 適合收進 Git趣作為命令列與開發工具靈感。它的測試內容已涵蓋基本用法、輸出效果與適合場景，後續可以依實際使用需求補上更多平台差異或進階案例。
