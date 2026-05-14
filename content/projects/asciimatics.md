# asciimatics
### 在終端機創作 ASCII 動畫與視覺效果

**日期：** 2026-05-14
**Repo：** [peterbrittain/asciimatics](https://github.com/peterbrittain/asciimatics)
**⭐ Stars：** 1,200+
**語言：** Python
**安裝：** `pip install asciimatics`

---

## 📖 這是什麼

asciimatics 是一個用 Python 創造 ASCII 藝術動畫和遊戲的函式庫。它提供豐富的渲染器（FigletText、Fire、Rainbow、Plasma 等）和效果（Clock、Matrix Snow、Sprite、Stars 等），可以在任何終端機中創作出令人驚艷的 ASCII 視覺效果。

---

---

## ⚙️ 原理

asciimatics 的架構：

1. **Renderers（渲染器）**：將文字/數據轉換成 ASCII 藝術圖像
   - `FigletText`：使用 Figlet 字體生成大字標題
   - `Fire`：模擬火焰燃燒效果
   - `SpeechBubble`：對話框
   - `BarChart`：ASCII 柱狀圖

2. **Effects（效果）**：為場景添加動畫
   - `Clock`：即時時鐘
   - `Matrix`：數碼雨效果（類似《駭客任務》）
   - `Snow`：雪花飄落
   - `Stars`：星空背景

3. **Scene + Screen 框架**：透過 `Screen.wrapper()` 函式包裝互動式場景

所有渲染器都實現 `StaticRenderer` 或 `DynamicRenderer` 介面，輸出字元藝術圖像。

---

---

## 🧪 測試結果

```python
from asciimatics.renderers import FigletText, Fire, SpeechBubble

# FigletText 多種字體測試
print('=== Test 1: FigletText - Various Fonts ===')
for font in ['banner', 'slant', 'block', 'digital', 'banner3', 'term']:
    try:
        r = FigletText('Hello!', font=font)
        images = list(r.images)
        first_line = images[0][0][:50]
        print(f'  [{font:10s}] {first_line}')
    except Exception as e:
        print(f'  [{font:10s}] Error: {e}')

# SpeechBubble
print('\n=== Test 2: SpeechBubble ===')
sb = SpeechBubble('Hi there!')
images = list(sb.images)
for line in images[0][:5]:
    print(line[:55])
```

**實際輸出**：
```
=== Test 1: FigletText - Various Fonts ===
  [banner    ] #     #                             ### 
  [slant     ]     __  __     ____      __
  [block     ]                                           
  [digital   ] +-+-+-+-+-+-+-+
  [banner3   ] ##     ## ######## ##       ##        
  [term      ] Hello!

=== Test 2: SpeechBubble ===
.-----------.
| Hi there! |
`-----------'
```

---

---

## 💡 想法與心得

asciimatics 是終端機藝術愛好者的夢想工具。它的 FigletText 和 SpeechBubble 最實用，Fire 效果則需要研究參數才能用好。適合用來做 CLI 工具的載入動畫、ASCII 藝術 logo 展示、或終端機小遊戲。API 文件有些不直覺，但整體創意十足。

⭐ GitHub Stars: 1,200+

---

## 📊 總評

**結論：** asciimatics 適合收進 Git趣作為命令列與開發工具靈感。它的測試內容已涵蓋基本用法、輸出效果與適合場景，後續可以依實際使用需求補上更多平台差異或進階案例。
