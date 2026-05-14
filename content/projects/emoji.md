# emoji
### Python 文字與 emoji 互轉工具

**日期：** 2026-05-14
**Repo：** [carpedm20/emoji](https://github.com/carpedm20/emoji)
**⭐ Stars：** 2,700+
**語言：** Python
**安裝：** `pip install emoji`

---

## 📖 這是什麼

emoji 是一個 Python 函式庫，讓開發者可以透過文字代碼（如 `:thumbs_up:`）輕鬆輸出 Emoji 表情符號。它支援 3,800+ 種 Emoji，提供 `emojize()` 和 `demojize()` 雙向轉換，是 CLI 工具和聊天機器人加入表情符號支援的最佳選擇。

---

---

## ⚙️ 原理

emoji 函式庫的核心功能：

1. **`emoji.emojize(code)`**：將文字代碼轉換為實際 Emoji
   - 例如 `emoji.emojize(':thumbs_up:')` → 👍
   - 例如 `emoji.emojize(':red_heart:')` → ❤️

2. **`emoji.demojize(emoji)`**：將 Emoji 轉換回文字代碼
   - 例如 `emoji.demojize('👍')` → `:thumbs_up:`

3. **類別豐富**：涵蓋人物表情、動物、物品、符號、旗幟等所有 Unicode Emoji 分類

底層維護一個完整的 Emoji 字典，映射文字代碼到實際 Unicode 字元。資料庫來自官方 Unicode 標準。

---

---

## 🧪 測試結果

```python
import emoji

# Test 1: Emojize
print('=== Test 1: emoji.emojize() ===')
texts = [
    ':thumbs_up:',
    ':red_heart: :green_heart: :blue_heart:',
    ':rocket: Launching soon!',
    ':fire: Hot stuff',
    ':warning: Caution!',
    'Python :snake: is :green_heart:',
]
for t in texts:
    print(f'  {t!r:50s} => {emoji.emojize(t)}')

# Test 2: Demojize
print('\n=== Test 2: emoji.demojize() ===')
emojis = ['👍', '❤️ 🚀', '🔥', '⚠️']
for e in emojis:
    print(f'  {e!r:20s} => {emoji.demojize(e)}')

# Test 3: Emoji categories
print('\n=== Test 3: Emoji categories ===')
cats = {
    'faces': [':grinning_face:', ':smiling_face_with_tear:', ':zipper-mouth_face:'],
    'objects': [':hammer_and_wrench:', ':laptop:', ':camera:'],
    'animals': [':dog:', ':cat:', ':panda:'],
}
for cat, codes in cats.items():
    for code in codes:
        try:
            print(f'  [{cat:10s}] {code:30s} => {emoji.emojize(code)}')
        except:
            pass

# Test 4: Total emoji count
print('\n=== Test 4: Total Emoji Available ===')
count = sum(1 for k in emoji.EMOJI_DATA if len(k) > 1)
print(f'  Total emoji available: {count}')
```

**實際輸出**：
```
=== Test 1: emoji.emojize() ===
  ':thumbs_up:'                                      => 👍
  ':red_heart: :green_heart: :blue_heart:'           => ❤️ 💚 💙
  ':rocket: Launching soon!'                         => 🚀 Launching soon!
  ':fire: Hot stuff'                                 => 🔥 Hot stuff
  ':warning: Caution!'                               => ⚠️ Caution!
  'Python :snake: is :green_heart:'                  => Python 🐍 is 💚

=== Test 2: emoji.demojize() ===
  '👍'                  => :thumbs_up:
  '❤️ 🚀'               => :red_heart: :rocket:
  '🔥'                  => :fire:
  '⚠️'                 => :warning:

=== Test 3: Emoji categories ===
  [faces     ] :grinning_face:                => 😀
  [faces     ] :smiling_face_with_tear:       => 🥲
  [faces     ] :zipper-mouth_face:            => 🤐
  [objects   ] :hammer_and_wrench:            => 🛠️
  [objects   ] :laptop:                       => 💻
  [objects   ] :camera:                       => 📷
  [animals   ] :dog:                          => 🐕
  [animals   ] :cat:                          => 🐈
  [animals   ] :panda:                        => 🐼

=== Test 4: Total Emoji Available ===
  Total emoji available: 3825
```

---

---

## 💡 想法與心得

emoji 庫超級實用！3,825 個 Emoji 幾乎涵蓋所有你能想到的表情。在 CLI 工具中加入 Emoji 可以讓輸出更生動有趣，比如：
- ✅ 任務成功：`emoji.emojize(':check_mark:')`
- ❌ 任務失敗：`emoji.emojize(':cross_mark:')`
- 🔥 熱門內容：`emoji.emojize(':fire:')`

API 簡單到不行，3 分鐘就能學會。開發聊天機器人、通知系統、CLI 工具時必備！

⭐ GitHub Stars: 2,700+

---

## 📊 總評

**結論：** emoji 適合收進 Git趣作為命令列與開發工具靈感。它的測試內容已涵蓋基本用法、輸出效果與適合場景，後續可以依實際使用需求補上更多平台差異或進階案例。
