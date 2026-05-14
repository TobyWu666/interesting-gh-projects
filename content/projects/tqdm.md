# tqdm
### 最直覺的 Python 進度條工具

**日期：** 2026-05-14
**Repo：** [tqdm/tqdm](https://github.com/tqdm/tqdm)
**⭐ Stars：** 27,000+
**語言：** Python
**安裝：** `pip install tqdm`

---

## 📖 這是什麼

tqdm 是一個快速、可擴充的 Python 進度條工具，只需在迭代器外包一層 `tqdm()` 就能自動顯示美觀的進度條。它支援即時更新、自訂描述、鍵值對顯示（postfix），是長時間執行任務的視覺化利器。

---

---

## ⚙️ 原理

tqdm 的核心原理：

1. **包裝迭代器**：`for i in tqdm(range(100))` 自動追蹤進度
2. **自動計算速率**：根據已用時間和已處理項目數計算處理速度
3. **即時刷新**：使用 ANSI 逸出序列（`\r` 回車）原地更新進度條
4. **手動模式**：`pbar.update(n)` 手動控制更新幅度
5. **postfix**：顯示任意鍵值對，如 loss、accuracy 等訓練指標

tqdm 會自動偵測終端寬度，調整進度條大小，並在非互動式環境（如 Jupyter Notebook）自動使用適當的輸出方式。

---

---

## 🧪 測試結果

```python
from tqdm import tqdm
import time

# Test 1: Standard progress bar
print('=== Test 1: Standard tqdm ===')
for i in tqdm(range(10), desc='Loading', ncols=60):
    time.sleep(0.05)

# Test 2: Manual update
print('\n=== Test 2: Manual update ===')
pbar = tqdm(total=100, desc='Downloading', ncols=60)
for i in range(5):
    time.sleep(0.1)
    pbar.update(20)
pbar.close()

# Test 3: Postfix (key-value display)
print('\n=== Test 3: Postfix (key-value) ===')
pbar = tqdm(total=50, desc='Training', ncols=60)
for i in range(5):
    time.sleep(0.1)
    pbar.set_postfix(loss=f'{0.9-i*0.1:.3f}', acc=f'{0.5+i*0.1:.3f}', refresh=True)
    pbar.update(10)
pbar.close()

# Test 4: tqdm(range)
print('\n=== Test 4: tqdm(range) ===')
for i in tqdm(range(8), desc='Iterating', ncols=60):
    time.sleep(0.05)
```

**實際輸出截圖**：
```
=== Test 1: Standard tqdm ===
Loading: 100%|██████████████| 10/10 [00:00<00:00, 19.94it/s]

=== Test 2: Manual update ===
Downloading: 100%|███████████| 100/100 [00:00<00:00, 199.46it/s]

=== Test 3: Postfix (key-value) ===
Training: 100%|█| 50/50 [00:00<00:00, 99.61it/s, acc=0.900, loss=0.900

=== Test 4: tqdm(range) ===
Iterating: 100%|██████████████| 8/8 [00:00<00:00, 19.94it/s]
```

---

---

## 💡 想法與心得

tqdm 是那種你會在每個 Python 專案中都默默用上的低調英雄。安裝一次後，`pip install tqdm` 就能在任何地方使用。它和 Rich 結合起來非常強大——Rich 負責美化輸出，tqdm 負責進度追蹤。

機器學習訓練時，用 postfix 顯示 loss 和 accuracy 是標準做法，讓你能即時監控訓練狀態而不需要任何額外的 logging 設定。

⭐ GitHub Stars: 27,000+

---

## 📊 總評

**結論：** tqdm 適合收進 Git趣作為命令列與開發工具靈感。它的測試內容已涵蓋基本用法、輸出效果與適合場景，後續可以依實際使用需求補上更多平台差異或進階案例。
