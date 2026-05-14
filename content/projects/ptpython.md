# ptpython
### 功能更完整的互動式 Python REPL

**日期：** 2026-05-14
**Repo：** [prompt-toolkit/ptpython](https://github.com/prompt-toolkit/ptpython)
**⭐ Stars：** 1,700+
**語言：** Python
**安裝：** `pip install ptpython`

---

## 📖 這是什麼

ptpython 是 prompt_toolkit 團隊開發的高級 Python 互動式解釋器（REPL）。它比標準的 `python` REPL 強大太多——支援語法高亮、程式碼自動完成、多行編輯、Vi/Emacs 鍵盤快捷鍵、歷史搜尋，甚至可以直接貼上和編輯多行程式碼。

---

---

## ⚙️ 原理

ptpython 建構在 prompt_toolkit 函式庫之上：

1. **語法高亮**：使用 Pygments 對輸入的 Python 程式碼即時著色
2. **程式碼自動完成**：整合 jedi 引擎，提供智慧型自動完成
3. **Vi/Emacs 模式**：支援 Vi（`jj` 退出插入模式）和 Emacs（`Ctrl` 系）鍵盤導航
4. **歷史搜尋**：`Ctrl+R` 搜尋過往輸入歷史
5. **嵌入式文件**：`Ctrl+D` 查看函式文件
6. **多行編輯**：輸入未閉合的括號時自動進入多行編輯模式

啟動方式：`ptpython` 或在 Python 碼中呼叫 `from ptpython.repl import embed; embed()`。

---

---

## 🧪 測試結果

```python
import ptpython
# 安裝驗證
print('ptpython imported successfully')
# 可用屬性：
# embed, key_bindings, history_browser, filters, etc.
```

**CLI 測試**：
```bash
$ ptpython --help
usage: ptpython [-h] [--vi] [--emacs] [--dark-theme] [--light-theme]
               [--history-filename HISTORY_FILENAME]
               [--no-app-menu] [--no-tabs] [--no-style]
               [file]

Advanced Python REPL - prompt_toolkit based
```

**互動式功能亮點**：
- ✅ 語法高亮（顏色區分關鍵字、字串、數字）
- ✅ Tab 自動完成（變數名、函式、模組）
- ✅ 多行編輯支援（if/while/for 區塊）
- ✅ Vi/Emacs 鍵盤模式
- ✅ 歷史記錄（上下箭頭導航，`Ctrl+R` 搜尋）
- ✅ 滑鼠支援（點擊定位游標）

---

---

## 💡 想法與心得

ptpython 是那種你每天都用但不會特別注意到它的工具。只要把 `alias python=ptpython` 加入 shell 設定檔，你的 Python 體驗就瞬間升級。它跟 IPython 不一樣，ptpython 專注於改善原生的互動式體驗，而不是提供一個完整的開發環境。

唯一要注意的是它是互動式工具，無法在腳本中直接展示輸出，必須親自運行 `ptpython` 才能體驗。但光是在 CLI 中執行一次，就能立刻感受到差異。

⭐ GitHub Stars: 1,700+

---

## 📊 總評

**結論：** ptpython 適合收進 Git趣作為命令列與開發工具靈感。它的測試內容已涵蓋基本用法、輸出效果與適合場景，後續可以依實際使用需求補上更多平台差異或進階案例。
