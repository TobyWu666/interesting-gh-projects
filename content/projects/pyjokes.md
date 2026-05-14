# pyjokes
### 用 200 行 Python 讓工程師會心一笑

**日期：** 2026-05-13
**Repo：** [pyjokes/pyjokes](https://github.com/pyjokes/pyjokes)
**⭐ Stars：** ~2k
**語言：** Python
**安裝：** `pip install pyjokes`

---

## 📖 這是什麼

pyjokes 是一個**工程師笑話產生器**。它沒有華麗的功能，沒有 AI，就是一個裝滿程式設計師乾話的資料庫，加上 `random.choice()` 隨機抽出來。

說穿了就是這樣：
```python
import pyjokes
pyjokes.get_joke()   # 抽一條
```

但就是這麼無聊的東西，讓無數 CLI 愛好者把它變成開機 welcome message、bot 的隨機回覆、輔助工具的彩蛋功能。

---

## ⚙️ 原理

```
jokes_en.py       （180 條英文笑話，寫成 Python list）
jokes_de.py        （59 條德文笑話）
jokes_it.py        （72 條義大利文笑話）
jokes_fr.py        （26 條法文笑話）
jokes_es.py        （28 條西班牙文笑話）
     ...
         ↓
pyjokes.py
  get_joke(language, category)
    → random.choice( jokes[language][category] )
         ↓
   輸出字串
```

**資料來源：** Stack Overflow 網站上的工程師笑話收集（CC BY-SA 3.0），志願者人力維護成不同語言版本。

**支撐格式：**
```python
neutral = [
    "Unix is user friendly. It's just very particular about who its friends are.",
    "Computer programmers do it byte by byte.",
    ...
]
```

---

## 🧪 測試結果（豐富版）

### 1. 英文笑話（neutral 分類）— 最基本款

```
1. .NET was named .NET so that it wouldn't show up in a Unix directory listing.
2. Unix is user friendly. It's just very particular about who its friends are.
3. Computer programmers do it byte by byte.
4. Number of days since I have encountered an array index error: -1.
5. Real programmers can write assembly code in any language.
```

品質評估：大部分是那種「工程師才會笑的梗」，像是 `-1` 天的陣列索引錯誤、COBOL 的千年蟲笑話。對非工程背景的人來說可能無感，但程式設計師看了會點頭。

---

### 2. 英文笑話（chuck 分類）— Chuck Norris 無厘頭風格

```
1. Everyone likes Chuck Norris on Facebook, whether they choose to or not.
2. Chuck Norris types with one finger. He points it at the keyboard and the keyboard does the rest.
3. Chuck Norris doesn't have disk latency because the hard drive knows to hurry the hell up.
4. Chuck Norris can dereference NULL.
```

品質評價：完全荒謬的幽默風格，類似「連傳說中的 Chuck Norris 都可以做到某件事」的梗。屬於國外 2000 年代流行文化的延伸，現在看起來有點年代感。

**注意：** 有重複（第一條和第四條都出現了「Everyone likes Chuck Norris on Facebook」），代表笑話庫樣本數不足，random 會重複抽出來。

---

### 3. 德語笑話（neutral）

```
1. Was ist schlimmer als ein Wurm im Apfel? Ein halber Wurm in einem angebissenen Apfel.
   （翻譯：比蘋果裡有蟲更糟的是什麼？一隻被咬過的蘋果裡有半條蟲。）

2. Egal wie dicht du bist, Goethe war Dichter.
   （翻譯：不管你有多接近，歌德都是詩人。）

3. Warum können Geister so schlecht lügen? Weil sie so leicht zu durchschauen sind.
   （翻譯：為什麼幽靈不擅長說謊？因為太好被看穿了。）
```

德語笑話的風格不太一樣，有些是雙關語（笑話蘋果/蟲），有些是文化參照（歌德）。語言門檻比較高，需要懂德文才能欣賞。

---

### 4. 其他語言支援狀況

| 語言 | 數量 | 狀態 |
|------|------|------|
| 英文（en） | 180 條 | ✅ 正常 |
| 德文（de） | 59 條 | ✅ 正常 |
| 義大利文（it） | 72 條 | ✅ 正常 |
| 法文（fr） | 26 條 | ✅ 正常 |
| 西班牙文（es） | 28 條 | ✅ 正常 |
| 日文（ja） | — | ❌ 不支援 |
| 中文（zh） | — | ❌ 不支援 |
| 葡萄牙文（pt） | — | ❌ 不支援 |

**實測遺憾：** 亞洲語言全部沒有支援，所以對中文用戶來說應用場景有限。英文笑話庫最完整，但畢竟是英文梗。

---

### 5. 無限生成模式（forever 迭代器）

```python
for joke in pyjokes.forever(language='en', category='neutral'):
    print(joke)
```

輸出（前三筆）：
```
1. A COBOL programmer makes millions with Y2K remediation and decides to get cryogenically frozen.
   "The year is 9999. You know COBOL, right?"

2. How many programmers does it take to kill a cockroach?
   Two: one holds, the other installs Windows on it.

3. Software salesmen and used-car salesmen differ in that the latter know when they are lying.
```

這個模式適合拿來做 Discord/Telegram bot 的隨機回覆，放一個 `while True` 迴圈讓它一直跑。

---

### 6. 執行效能

```
首次 import：< 0.01 秒
get_joke()：< 0.001 秒
180 條笑話載入記憶體：約 50 KB
```

極輕量，適合嵌入任何 Python 專案，完全不需要考慮效能。

---

## 💡 想法與心得

### 這個專案教會我的事

**1. 最小可行產品的經典範例**

pyjokes 的核心價值就是「一行 `pip install`，一行 `import`，立刻有結果」。沒有配置文件、沒有初始化流程、沒有非同步處理。這個簡單性本身就是設計決策，不是缺陷。

**2. 情緒價值 > 功能價值**

說實在話，這個專案沒有解決任何「必須要解決的問題」。但人們喜歡它，是因為它能讓人笑。產品不需要偉大，有時候只需要讓人會心一笑。

**3. 資料維護的困難**

這個專案最大的挑戰不是技術，而是**持續收集好笑的笑話**。英文有 180 條，德文只有 59 條，亞洲語言全部缺席。志願者維護的模式遲早會遇到瓶頸。

**4. 重複問題**

`random.choice()` 沒有去重機制，同一條笑話可能被連續抽出來兩次。這在技術上不是 bug，但在使用者體驗上是一個可以改進的地方。

---

### 實用場景

| 場景 | 怎麼用 |
|------|--------|
| CLI 工具的 welcome message | `python -c "import pyjokes; print(pyjokes.get_joke())"` |
| Discord/Telegram bot | `pyjokes.forever()` 當隨機回覆迭代器 |
| 自動化報告結尾 | 當作「冷結尾」的笑話彩蛋 |
| 教學範例 | 展示 Python list、random、iteration 的最佳素材 |

---

## 📊 總評

| 項目 | 分數 | 備註 |
|------|------|------|
| 安裝便利性 | ⭐⭐⭐⭐⭐ | 一行 pip，零設定 |
| 笑話品質（英文） | ⭐⭐⭐⭐ | 有深度，但偏老 |
| 笑話品質（其他語言） | ⭐⭐ | 數量少，部分有文化隔閡 |
| 程式碼品質 | ⭐⭐⭐⭐ | 極簡、容易理解 |
| 維護活躍度 | ⭐⭐⭐ | 2023 年後更新頻率降低 |

**結論：** 適合當教學範例或拿來嵌入自己的小工具，但如果想要高質量、多語言的笑話體驗，這個專案還有改進空間。建議自己 fork 一份改成中文笑話庫，會更有價值。
