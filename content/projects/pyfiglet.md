# pyfiglet
### 把文字轉成 FIGlet ASCII 藝術字

**日期：** 2026-05-14
**Repo：** [pwaller/pyfiglet](https://github.com/pwaller/pyfiglet)
**⭐ Stars：** 1,100+
**語言：** Python
**安裝：** `pip install pyfiglet`

---

## 📖 這是什麼

pyfiglet 是 Figlet 的 Python 實現。Figlet 是一個歷史悠久的 ASCII 藝術字體生成工具，pyfiglet 繼承了這個傳統，提供 571 種不同的 ASCII 藝術字體，可以將普通文字轉換為各種風格的大標題。從 80 年代的經典字體到現代數碼風格，應有盡有。

---

---

## ⚙️ 原理

pyfiglet 的運作原理：

1. **字體檔案（.flf）**：每種字體其實是一個 `.flf`（FIGlet Font Library）文字檔，定義了每個字元對應的 ASCII  art 圖案
2. **字形拼接**：輸入文字後，每個字元對應的 ASCII 圖案會被拼接起來
3. **水平拼接**：相鄰字元的 ASCII 圖案會水平拼接形成完整的單行或多行輸出
4. **方向支援**：支援由左到右（l2r）、由右到左（r2l）、以及上下（t2b）等方向

571 種字體涵蓋各種風格：海盜主題、聖誕節主題、3D 風、經典海報風等。

---

---

## 🧪 測試結果

```python
import pyfiglet

# Test 1: Basic usage
print('=== Test 1: Basic pyfiglet ===')
result = pyfiglet.figlet_format('Hello!')
print(result)

# Test 2: Various fonts
print('=== Test 2: Different fonts ===')
fonts = ['slant', 'banner', 'block', 'digital', 'bubble', 'banner3', 'isometric1', 'stop']
for font in fonts:
    try:
        result = pyfiglet.figlet_format('Hi', font=font)
        first_line = result.split('\n')[0][:40]
        print(f'  [{font:12s}] {first_line}')
    except Exception as e:
        print(f'  [{font:12s}] Error: {e}')

# Test 3: Right-to-left
print('\n=== Test 3: Right-to-left (RTL) ===')
result = pyfiglet.figlet_format('Hello!', font='slant', direction='righttoleft')
print(result[:200])

# Test 4: Font list
print('\n=== Test 4: Available fonts ===')
fonts_all = pyfiglet.FigletFont.getFonts()
print(f'  Total fonts: {len(fonts_all)}')
print(f'  Sample: {fonts_all[:10]}')
```

**實際輸出**：
```
=== Test 1: Basic pyfiglet ===
 _   _      _ _       _ 
| | | | ___| | | ___ | |
| |_| |/ _ \ | |/ _ \| |
|  _  |  __/ | | (_) |_|
|_| |_|\___|_|_|\___/(_)
                        

=== Test 2: Different fonts ===
  [slant       ]     __  ___ 
  [banner      ] #     #   
  [block       ]              
  [digital     ] +-+-+-+
  [bubble      ]   _   _  
  [banner3     ] ##     ## #### 
  [isometric1  ]       ___                 
  [stop        ]  _     _ _ 

=== Test 3: Right-to-left (RTL) ===
    __  __     ____      __
   / / / /__  / / /___  / /
  / /_/ / _ \/ / / __ \/ / 
 / __  /  __/ / / /_/ /_/  
/_/ /_/\___/_/_/\____(_)   
                          

=== Test 4: Available fonts ===
  Total fonts: 571
  Sample: ['cola', 'phonix__', 'cards', 'red_phoenix', 'morse', 'ghoulish', 'chunky', 'ansi_shadow', 'alligator2', 'invita']
```

---

---

## 💡 想法與心得

pyfiglet 是 CLI 工具做大標題輸出的首選工具。571 種字體，總有一款適合你的專案風格。`banner` 和 `slant` 是我最常用的兩種。`digital` 字體特別適合科技主題的 CLI 工具。

在 GitHub 專案 README 頂部看到的大型 ASCII 藝術標題，很多都是用 Figlet 做的。安裝後一行程式就能生成，非常方便。

⭐ GitHub Stars: 1,100+

---

## 📊 總評

**結論：** pyfiglet 適合收進 Git趣作為命令列與開發工具靈感。它的測試內容已涵蓋基本用法、輸出效果與適合場景，後續可以依實際使用需求補上更多平台差異或進階案例。
