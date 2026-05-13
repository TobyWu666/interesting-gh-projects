# neofetch
### 用一行指令看懂你的 Linux 主機

**日期：** 2026-05-14
**Repo：** [dylanaraps/neofetch](https://github.com/dylanaraps/neofetch)
**⭐ Stars：** ~23k
**語言：** Bash
**安裝：** `sudo apt install neofetch`
**版本：** 7.1.0
**類型：** CLI 系統資訊工具（ Bash 腳本）

---

## 📖 這是什麼

neofetch 是一個**終端機系統資訊顯示工具**，會在畫面左側顯示 ASCII 藝術 Logo，右側顯示系統資訊（如作業系統、核心、記憶體等）。它的設計目標是「讓你的 terminal 看一下就知道你在用什麼系統」，同時還要好看。

類似的工具有 `screenfetch`、`p_fetch`、`fastfetch`，但 neofetch 是當中最早、最知名的一個。

---

## ⚙️ 原理

預設輸出包含以下資訊：

| 欄位 | 顯示內容 | 範例值 |
|------|---------|--------|
| OS | 作業系統與架構 | Ubuntu 24.04.4 LTS x86_64 |
| Kernel | 核心版本 | 6.17.0-23-generic |
| Uptime | 開機時間 | 4 days, 4 hours |
| Packages | 套件數量（dpkg / snap） | 1997 (dpkg), 19 (snap) |
| Shell | Shell 名稱與版本 | bash 5.2.21 |
| DE | 桌面環境 | GNOME 46.0 |
| WM | 視窗管理員 | Mutter |
| WM Theme | 視窗主題 | Adwaita |
| Theme | GTK 主題 | Yaru [GTK2/3] |
| Icons | 圖示主題 | Yaru [GTK2/3] |
| Terminal | 終端機名稱 | hermes |
| CPU | 處理器型號與核心數 | Intel i3-10100 (8) @ 4.300GHz |
| GPU | 顯示卡型號 | Intel CometLake-S GT2 [UHD Graphics 630] |
| Memory | 記憶體使用量 | 4574MiB / 64106MiB |

---

## 🧪 測試結果（豐富版）

### 1. 預設輸出（完整模式）

```
.-/+oossssoo+/-.
        `:+ssssssssssssssssss+:`
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssssdMMMNysssso.
   /ssssssssssshdmmNNmmyNMMMMhssssss/
  +ssssssssshmydMMMMMMMNddddyssssssss+
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
ossyNMMMNyMMhsssssssssssssshmmmhssssssso
ossyNMMMNyMMhsssssssssssssshmmmhssssssso
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +sssssssssdmydMMMMMMMMddddyssssssss+
   /ssssssssssshdmNNNNmyNMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        `:+ssssssssssssssssss+:`
            .-/+oossssoo+/-.
tobywu@tobywu-openclaw01 
------------------------ 
OS: Ubuntu 24.04.4 LTS x86_64 
Kernel: 6.17.0-23-generic 
Uptime: 4 days, 4 hours 
Packages: 1997 (dpkg), 19 (snap) 
Shell: bash 5.2.21 
DE: GNOME 46.0 
WM: Mutter 
WM Theme: Adwaita 
Theme: Yaru [GTK2/3] 
Icons: Yaru [GTK2/3] 
Terminal: hermes 
CPU: Intel i3-10100 (8) @ 4.300GHz 
GPU: Intel CometLake-S GT2 [UHD Graphics 630] 
Memory: 4574MiB / 64106MiB
```

品質評估：ASCII 動物圖案（Linux 風格的企鵝家族變種）非常吸睛，系統資訊一目了然。Uptime 顯示「4 天又 4 小時」代表這台 VM 很長一陣子沒重開了。

---

### 2. 純文字模式（--off）

```bash
neofetch --off
```

輸出：
```
tobywu@tobywu-openclaw01 
------------------------ 
OS: Ubuntu 24.04.4 LTS x86_64 
Kernel: 6.17.0-23-generic 
Uptime: 4 days, 4 hours 
Packages: 1997 (dpkg), 19 (snap) 
Shell: bash 5.2.21 
DE: GNOME 46.0 
WM: Mutter 
WM Theme: Adwaita 
Theme: Yaru [GTK2/3] 
Icons: Yaru [GTK2/3] 
Terminal: hermes 
CPU: Intel i3-10100 (8) @ 4.300GHz 
GPU: Intel CometLake-S GT2 [UHD Graphics 630] 
Memory: 4531MiB / 64106MiB
```

實用場景：寫腳本、capture 純文字輸出餵給其他程式時用 `--off` 關掉 ASCII art 最方便。

---

### 3. Bar 顯示模式（--cpu_display bar --memory_display bar）

```bash
neofetch --cpu_display bar --memory_display bar
```

輸出（Memory 那行變成視覺化長條圖）：
```
Memory: [-==============]
```

CPU / Memory 的使用量變成 `[===............]` 這類視覺化長條圖，適合想要快速評估系統資源的場合。

---

### 4. --stdout 模式（無顏色）

```bash
neofetch --stdout
```

適合把輸出餵到日誌檔、自動化報告、CI pipeline。不帶 ANSI color codes，純文字。

---

### 5. 自訂 ASCII 色彩（--ascii_colors）

```bash
neofetch --ascii_distro Ubuntu --ascii_colors 1 2 3 4 5 6
```

使用 Ubuntu 官方 Logo，並用 1-6 指定顏色順序。neofetch 支援 200+ 種 Linux 發行版的 ASCII Logo，幾乎常見的都有。

---

## 📋 重要參數整理

neofetch 有非常多的 launch flags，以下整理最實用的幾類：

### 資訊顯示控制

| 參數 | 作用 |
|------|------|
| `--disable cpu` | 隱藏 CPU 資訊 |
| `--cpu_cores physical` | 只顯示實體核心數（不顯示邏輯） |
| `--cpu_temp C` | 顯示 CPU 溫度（攝氏） |
| `--gpu_type dedicated` | 只顯示獨顯（不顯示內顯） |
| `--uptime_shorthand on` | 簡化 uptime 顯示 |

### 文字顏色與區塊

| 參數 | 作用 |
|------|------|
| `--colors 1 2 3 4 5 6` | 改變六個欄位的文字顏色 |
| `--color_blocks off` | 關閉顏色區塊（有的 distro 預設會顯示彩虹區塊） |
| `--bold off` | 停用粗體 |

### 圖片 / ASCII 藝術

| 參數 | 作用 |
|------|------|
| `--off` | 純文字，無 ASCII art |
| `--backend ascii` | 純 ASCII 模式（不用圖片） |
| `--ascii_distro Ubuntu` | 指定 distro logo |
| `--ascii_distro Ubuntu_small` | 使用小 Logo |
| `--source /path/to/image` | 用自訂圖片取代 ASCII |

### Bar 視覺化

| 參數 | 作用 |
|------|------|
| `--cpu_display bar` | CPU 用長條圖顯示 |
| `--memory_display bar` | Memory 用長條圖顯示 |
| `--battery_display bar` | 電池用長條圖顯示 |
| `--disk_display bar` | 磁碟用長條圖顯示 |

### 輸出控制

| 參數 | 作用 |
|------|------|
| `--stdout` | 純文字輸出，無 ANSI color |
| `--print_config` | 印出預設設定檔 |
| `--config none` | 不使用任何設定檔 |
| `-L, --logo` | 只顯示 ASCII logo，不顯示資訊 |

---

## 💡 想法與心得

### 這個工具教會我的事

**1. 一個好的 CLI 工具就是「無腦執行，立刻有結果」**

`neofetch` 一行指令執行，不用設定、不用 config，立刻得到漂亮的系統概覽。這是 SSH 登入新主機時的第一個動作，也是 IRC / Discord 聊天時炫耀系統的方式。

**2. ASCII Art 的資訊價值**

很多人低估了 ASCII Logo 的價值。當你看到那個「動物」就知道是什麼 OS，不需要看文字就能快速辨識。這在多系統管理時特別有用。

**3. 豐富的客製化彈性**

neofetch 支援 200+ 種 distro ASCII、圖片顯示（w3m、iterm2、kitty 等）、長條圖、顏色設定，功能深度足夠。但預設值就很好，所以不需要折騰就能上手。

**4. 系統資訊的標準化**

同一個指令在不同 Linux 發行版上都能顯示幾乎相同的資訊結構，對自動化腳本、CI/CD report、SRE dashboard 都很有用。

---

### 實用場景

| 場景 | 怎麼用 |
|------|--------|
| SSH 登入新主機 | `neofetch` 快速掌握系統概況 |
| 個人化 .bashrc | 加到 `.bashrc` 每次開 terminal 都秀一下 |
| 自動化 report | `neofetch --stdout >> report.txt` 附加系統資訊 |
| Discord/Telegram bot | 在機器人回覆裡附加系統狀態截圖 |
| Bug report | 貼 neofetch 輸出讓別人知道你的環境 |

---

## 📊 總評

| 項目 | 分數 | 備註 |
|------|------|------|
| 安裝便利性 | ⭐⭐⭐⭐⭐ | 一行 apt，零設定 |
| 資訊完整性 | ⭐⭐⭐⭐⭐ | OS、核心、CPU、GPU、記憶體、桌面環境全包 |
| 視覺呈現 | ⭐⭐⭐⭐⭐ | ASCII Logo + 彩色文字，賞心悅目 |
| 客製化彈性 | ⭐⭐⭐⭐⭐ | 200+ distro logo、圖片、長條圖、顏色 |
| 執行效能 | ⭐⭐⭐⭐ | 幾乎瞬間完成，幾乎感覺不到延遲 |
| 維護活躍度 | ⭐⭐⭐⭐ | 2024 年仍有更新（7.1.0），社群活躍 |

**結論：** neofetch 是 Linux 管理者的必備工具。不只是美觀，在遠端除錯、自動化報告、系統盤點等場景都有高度實用價值。建議每個人都裝一個在 `$HOME/.bashrc` 裡。
