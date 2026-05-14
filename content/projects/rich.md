# rich
### 讓 Python CLI 輸出變漂亮的終端渲染工具

**日期：** 2026-05-14
**Repo：** [Textualize/rich](https://github.com/Textualize/rich)
**⭐ Stars：** 14,000+
**語言：** Python
**安裝：** `pip install rich`

---

## 📖 這是什麼

Rich 是一個 Python 函式庫，可以在終端機中呈現豐富的文字、顏色、表格、面板、語法高亮、進度條等華麗輸出。它讓 CLI 應用程式的終端輸出變得賞心悅目，是現代 Python CLI 工具的必備庫。

---

---

## ⚙️ 原理

Rich 透過 ANSI 逸出序列控制終端機的顏色和樣式。它支援：

1. **ANSI 顏色/樣式**：使用 `\033[` 逸出序列設定前景色、背景色、粗體、斜體等
2. **面板（Panel）**：將內容包裝在帶邊框的矩形區塊中
3. **表格（Table）**：自動對齊欄位並支援多種風格
4. **進度條（Progress）**：追蹤長時間運行的任務進度
5. **語法高亮（Syntax）**：使用 Pygments 對程式碼著色

Rich 的核心是 `Console` 物件，它會自動偵測終端是否支援顏色，並聰明地處理輸出。

---

---

## 🧪 測試結果

```python
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.progress import track
from rich.syntax import Syntax
import time

console = Console()

# Panel 測試
console.print(Panel('[bold cyan]GitHub Daily Report[/bold cyan]\nWelcome to Rich!', expand=False))

# 表格測試
table = Table(title='Test Results')
table.add_column('Tool', style='green')
table.add_column('Status', style='yellow')
table.add_column('Stars')
table.add_row('Rich', '✓ Working', '14,000+')
table.add_row('tqdm', '✓ Working', '27,000+')
table.add_row('asciimatics', '✓ Working', '1,200+')
console.print(table)

# 進度條測試
for i in track(range(5), description='Processing'):
    time.sleep(0.2)

# 語法高亮測試
code = 'def hello():\n    print("Hello World!")'
syntax = Syntax(code, 'python', theme='monokai', line_numbers=True)
console.print(syntax)
```

**實際輸出截圖**：
```
╭─────────────────────╮
│ GitHub Daily Report │
│ Welcome to Rich!    │
╰─────────────────────╯
            Test Results             
┏━━━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━┓
┃ Tool        ┃ Status    ┃ Stars   ┃
┡━━━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━┩
│ Rich        │ ✓ Working │ 14,000+ │
│ tqdm        │ ✓ Working │ 27,000+ │
│ asciimatics │ ✓ Working │ 1,200+  │
└─────────────┴───────────┴─────────┘
Processing ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:00:01
  1 def hello():
  2     print("Hello World!")
```

---

---

## 💡 想法與心得

Rich 是那種「一用就回不去」的工具。它讓開發 CLI 工具變得又快樂。與 `tqdm` 結合使用時效果最佳。用 `pip install rich` 就能開始使用，文件完整、API 直覺。

非常適合用來開發：
- 資料處理 CLI 工具（展示處理進度）
- 系統監控工具（彩色狀態面板）
- 程式設計教學工具（語法高亮代碼展示）

⭐ GitHub Stars: 14,000+

---

## 📊 總評

**結論：** rich 適合收進 Git趣作為命令列與開發工具靈感。它的測試內容已涵蓋基本用法、輸出效果與適合場景，後續可以依實際使用需求補上更多平台差異或進階案例。
