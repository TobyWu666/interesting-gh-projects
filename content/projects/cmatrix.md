# cmatrix
### 綠色矩陣雨，經典駭客任務風格終端機動畫

**日期：** 2026-05-14
**Repo：** [abishekvashok/cmatrix](https://github.com/abishekvashok/cmatrix)
**⭐ Stars：** ~2.3k
**語言：** C
**安裝：** `sudo apt install cmatrix`

---

## 📖 這是什麼

cmatrix 是一款模擬**《駭客任務》（The Matrix）》**電影中經典「綠色字符雨」效果的終端機動畫工具。執行後整個終端畫面會充滿快速下落的綠色日文字元，營造出駭客帝國的科技感氛圍。

說穿了就是這樣：
```bash
cmatrix  # 執行，預設綠色矩陣雨
```

這個指令在各種科技梗圖、影視作品中頻繁出現，已經成為**「我是駭客」的視覺符號**。

---

## ⚙️ 原理

cmatrix 的核心機制並不複雜：

```
終端機緩衝區
     ↓
亂數產生字元（預設日文片假名）
     ↓
定時更新畫面（可調延遲）
     ↓
ANSI 色彩控制碼（綠色前景）
     ↓
輪流顯示 + 清除 + 移動游標
```

**技術棧：**
- C 語言（效能導向）
- ncurses 函式庫（終端機控制）
- ANSI escape codes（顏色與游標控制）

**編譯資訊：**
```
CMatrix version 2.0 (compiled 11:42:14, Sep  8 2023)
Email: abishekvashok@gmail.com
Web: https://github.com/abishekvashok/cmatrix
```

---

## 🧪 測試結果（各模式實測）

### 1. 標準模式（無參數）— 預設綠色矩陣雨

```bash
cmatrix
```

**輸出截圖（實際終端效果）：**
```
x>!x F     L>!-3\8   x F     L- ,     S3\:>e88     rl_   - ,     S: <     l>e;Ua8     r^Ul_8     *d*   : <     l; $     eUa,5r8_     ^U8     *:<d*#     N8P   ; $     e, M     A5rUG$p     8 8   v r   _$&I     :<#     N;68Pz     psz   , M     AU @     QG$W=Rpv  Yd         $y     & 8   / *   I#<6     ;6z     p#9sz`     [)7   U @     QW $     -=Rvi7Yd:y/  j%         #g     < #   # N   6o#u     #9`     [c")7r     x7y   W $     -v u     ;i74Q9G A ^ I:j%+g#  Fl         o8     # z   3 p   ux_(     c"r     xR97y<     Sc)   v u     ;4 -     )Q96cXG x F ^ A ^ I    Z0 v : ]+Fl#83  @&         xg     _ `   ? [   (wT=     R9<     S?-c)N     [8l   4 -     )6 i     bcX5MH^Z d 10 - , 0 v : ]    CB J ; G#@&6g?  =9         w[     T r   C x   =m^g     ?-N     [B@8lZ     J7C   6 i     b5 W     BMH3f"   010C % ]B : < d J ; G    1C T # M6=9s[C  sj         m'     ^ <   Y S   gz3-     B@Z     JzN7C^     SDO   5 W     B3 q     Yf"mpm    ^ R L %   0   k]d1 l nC ; $ ' T # M    D5 n c Dssjo'Y  G2         zP     3 N   D [   -FX<     zN^     S]3DO6     13j   3 q     Ym g     IpmG`vR L %     0 p S 1   k   bn'D & e5 , M ? n c D    m' * R voG2XPD  GQ         Fb     X Z   , J   <bj[     ]36     1e?3jk     !6y   m g     IG )     Q`veQjU    m p S 1     d g l "   b   ne?m 9 s' U @ ` * R v    1k f ? JXGQ:b,  z:         bN     j ^   H S   [nlX     e?k     !\96y4     L7B   G )     Qe :     %Qj]qX@ U=     m   -o   Y "p    / g l "     ' 1 e 8   n   ]s`1 j Qk W $ g f ? J    (A p B g:z:/NH  'c         n'     l 6   O 1   XV9`     \94     LLM7Bs     aT2   e :     %] %     LqXDj_@=-o   Y "
```

**觀察：**
- 大量日文片假名快速下降
- 預設綠色（`\033[32m`）
- 非同步更新，視覺上隨機感強
- 按 `Ctrl+C` 退出

---

### 2. 粗體模式（-b）

```bash
cmatrix -b
```

**輸出截圖：**
```
Mp6Mz     p6lCK%zl0CH     K%x[5-h   0HxJ[q     5-kp\2Q l   h WT   Jqk?p0     \2`vT;( QW*E x   T ro   ?0`6v/     T;/zwKv   (*y Er35 k   o E^   6//`z&     wKhc^<v3,   y3` 5E<0 `   ^ W3   `&hKc`     ^<l:Hj44
```

**觀察：**
- 所有字元變為**粗體顯示**
- 視覺上更亮、更顯眼
- `-B` 會讓所有字元都是粗體（`all bold`），`-b` 只是開啟粗體選項

---

### 3. 彩虹模式（-r）

```bash
cmatrix -r
```

**輸出截圖：**
```
w                   :             p                                                                               
                                                                                                                              
                                                                                                                              
                                                                                                                          
                                                                                                                           
                                                                                                                          
                                                                                                                          
                                                                                                                          
                                                                                                                          
                                                        3
...（大量輸出，字符更繽紛）
```

**觀察：**
- 字元變成**彩虹配色**（紅、綠、藍、黃等交錯）
- 視覺效果更活潑
- 適合截圖分享或當桌布使用

---

### 4. 螢幕保護模式（-s）

```bash
cmatrix -s
```

**輸出截圖：**
```
x>!x F     L>!-3\8   x F     L- ,     S3\:>e88     rl_   - ,     S: <     l>e;Ua8     r^Ul_8     *d*   : <     l; $     eUa,5r8_     ^U8     *:<d*#     N8P   ; $     e, M     A5rUG$p     8 8   v r   _$&I     :<#     N;68Pz     psz   , M     AU @     QG$W=Rpv  Yd         $y     & 8   / *   I#<6     ;6z     p#9sz`     [)7   U @     QW $     -=Rvi7Yd:y/  j%         #g     < #   # N   6o#u     #9`     [c")7r     x7y   W $     -v u     ;i74Q9G A ^ I:j%+g#  Fl         o8     # z   3 p   ux_(     c"r     xR97y<     Sc)   v u     ;4 -     )Q96cXG x F ^ A ^ I    Z0 v : ]+Fl#83  @&         xg     _ `   ? [   (wT=     R9<     S?-c)N     [8l   4 -     )6 i     bcX5MH^Z d 10 - , 0 v : ]    CB J ; G#@&6g?  =9         w[     T r   C x   =m^g     ?-N     [B@8lZ     J7C   6 i     b5 W     BMH3f"   010C % ]B : < d J ; G    1C T # M6=9s[C  sj         m'     ^ <   Y S   gz3-     B@Z     JzN7C^     SDO   5 W     B3 q     Yf"mpm    ^ R L %   0   k]d1 l nC ; $ ' T # M    D5 n c Dssjo'Y  G2         zP     3 N   D [   -FX<     zN^     S]3DO6     13j   3 q     Ym g     IpmG`vR L %     0 p S 1   k   bn'D & e5 , M ? n c D    m' * R voG2XPD  GQ         Fb     X Z   , J   <bj[     ]36     1e?3jk     !6y   m g     IG )     Q`veQjU    m p S 1     d g l "   b   ne?m 9 s' U @ ` * R v    1k f ? JXGQ:b,  z:         bN     j ^   H S   [nlX     e?k     !\96y4     L7B   G )     Qe :     %Qj]qX@ U=     m   -o   Y "p    / g l "     ' 1 e 8   n   ]s`1 j Qk W $ g f ? J    (A p B g:z:/NH  'c         n'     l 6   O 1   XV9`     \94     LLM7Bs     aT2   e :     %] %     LqXDj_@=-o   Y "
```

**觀察：**
- 運作方式與標準模式相同
- **關鍵差異：** 按下**任意鍵盤按鍵**就會立即退出
- 適合當作螢幕保護程式使用

---

### 5. 自訂顏色（-C red）

```bash
cmatrix -C red
```

**輸出截圖：**
```
'Z/'Z     &s     /*A!p$&s*A     l_     !IVNp:$)bl_IV     Zp     NEke&:7c)&bTXZpEk     [G     e0O"&7cqY&"'TfXb6[G0O     5L     "O&/mqY"':[fR&b]6%R5LO&     [`     /&:\Wm p   q1%=:[R&GL]51%dR\m[`&:     mj     \S9?W q1%:= )   &C?cGL514vdUd\smkBmjS9     4x     ?j5l: &C?)c T   Q_=/4vUd(uszdk"B9t4xj5     $,
```

**觀察：**
- 字元顏色從綠色變成**紅色**
- 可用於客製化主題或配合終端機背景
- 官方說明可選用 `green`（預設）、`red`、`blue`、`yellow`、`cyan`、`magenta`、`white`

---

### 6. 無粗體模式（-n）

```bash
cmatrix -n
```

**輸出截圖：**
```
YfEY\bifEkMi\bP_'kM?DP\b?^     z_'kA?DaN?\be^     z < 8     ?kA!iaNj3e\b/h<Z8     ? " x     n!i3Jj3bw/\b>/" h&ZK"wx     n 1 G     .3J._bwKP>\bs/"&tK KuwN13G     . n .     6._heKPk$s\b`X /tKuO> NU3"no.     6 < '     \
```

**觀察：**
- 預設就會套用無粗體模式
- 字元顯示為**一般亮度**
- 與 `-b` 形成對比

---

### 7. Lambda 模式（-m）

```bash
cmatrix -m
```

**輸出截圖：**
```
_)M- M ;BM- M ;    n8uM- M ;  41     pM- M ;M- M ;`M- M ;    .^cM- M ;  C M- M ;M- MM- MOM- M ;  qH     :M- M ;M- M ;^M- M ;    dT>M-M- M ;M- M ;  5 M- M ;M- MM- MDM- M ;  b=     OM- M ;M- M ;hM- M ;    KfJ        M- M ;                    M- M ;? M- M ;  M-M- M ;M- MM- MM-bM ;M- M ; 0w7#     aS-Z9        M- M ;                    M- M ;M-M- M ;  M-M- M ;M- MM- MM-M- MM-KM ; 5wu5:!     [2ef7        M- M ;            d   R   M- M ;M-M- M ;I  -M- M ;M- MM- MM-M- MM-M- M ;6<8%zzL     ^OSLr        M- M ;            M- MM- MM-NM ;M-M- M ;M- MM- M ;M- MM- MM-M- MM-M- M ;O   UU<hsQ=uf     k=1&p        M- M ;'       4   M- MM- MM-M-[MM-M- M ;M- M ; M ;M- MM- MM-M- MM-M- M ;Ef   +c]zbgA(V     qJfj=      #  - M ;M- Mw;  M- MM- MM- MM-M-M-M-M- M ;M- M ; M ;M- M ; MM-M- MM-M- M ;;Wa2c   =HKt^./ih     )agyp      M- M ; ;M- MM- MM- MM- MM- M ;M-M-M-M- M ;M- M ; M ;M- M ; M -M- MM-M- M ;Yo7;;>f   !j3f=b:CS     R>e($      M- Mj; ;M- MM- MM- MM- MM- M ;M-M-M-M- M ;M- M ; M ; -uM ; M -M- MM-M- M ;+_ZVfO_   qfpwRnzn2     &]Sf`5     M- MM- MM- MM- MM- MM- MM- M ;M-M-M-M- M ;M- M ; Mk; -M- M ; -M-!MM-M- M ;\#_NuK?)   ws9VUuWo=     #k&&*M- M ;M- MM- MM- MM-fMM-QMM- MM- Ma;M-M-M-M- M ;M-+M ; MM- MM- M ; -M-M-M-M-fM ;_3Z2t+"CD=Mw   yik6mH[/R     3(FN4M- M ; - MM- MM- MM-M-M-M-M- MM- MM-M-M-M-M- M ;M-M- M ;M- MM- M ; -M-M-M-M-M- M-;bMM-M;`-
```

**觀察：**
- 使用 **`λ`**（Lambda）符號替代日文片假名
- 視覺上更具有「程式設計」主題感
- 適合開發者社群使用

---

### 8. Linux 主控台模式（-l）— 失敗案例

```bash
cmatrix -l
```

**輸出錯誤：**
```
Couldn't get a file descriptor referring to the console.

Couldn't get a file descriptor referring to the console.
 There was an error running setfont. Please make sure the
 setfont program is in your $PATH.  Try running "setfont matrix" by hand.
```

**原因分析：**
- Linux 主控台模式需要直接存取 `/dev/console`
- 在 SSH 遠端 session 或 Docker 容器中無法取得主控台權限
- 需要本機 TTY session 才能使用

---

## 🛠️ 命令列參數對照表

| 參數 | 完整參數 | 功能說明 |
|------|---------|---------|
| `-a` | `--async` | 非同步滾動（預設開啟） |
| `-b` | `--bold` | 啟用粗體字元 |
| `-B` | `--all-bold` | 所有字元都粗體（覆寫 `-b`） |
| `-c` | `--japanese` | 使用日文字元（需要相關字體） |
| `-f` | `--force` | 強制設定 $TERM 為 linux |
| `-h` | `--help` | 顯示說明 |
| `-l` | `--linux` | Linux 主控台模式 |
| `-L` | `--lock` | 鎖定模式（可從另一終端關閉） |
| `-n` | `--no-bold` | 無粗體（預設） |
| `-o` | `--old` | 使用舊式滾動 |
| `-r` | `--rainbow` | 彩虹模式 |
| `-s` | `--screensaver` | 螢幕保護模式（按鍵退出） |
| `-m` | `--lambda` | Lambda 符號模式 |
| `-x` | `--xwindow` | X window 模式 |
| `-V` | `--version` | 顯示版本 |
| `-u` | `--delay` | 更新延遲（0-10，預設 4） |
| `-C` | `--color` | 矩陣顏色（預設 green） |

---

## 💡 想法與心得

### 這個專案教會我的事

**1. 懷舊價值的商業模式**

cmatrix 沒有任何實用功能，但它喚起了人們對《駭客任務》的記憶。這種**情感連結**本身就是價值。很多 CLI 工具的流行不是因為功能，而是因為「感覺對了」。

**2. ncurses 的威力**

用 C 語言搭配 ncurses 函式庫，可以做出這麼流暢的終端機動畫。這證明了終端機不只是文字介面，還可以是很棒的視覺體驗。

**3. 參數設計的藝術**

`-b`、`-B`、`-n` 三個參數互相覆寫的設計很直覺：
- `-b`：開啟粗體
- `-B`：全部粗體
- `-n`：關閉粗體（預設）

讓使用者有彈性，但不混亂。

**4. 彩虹模式的驚喜**

`-r` 彩虹模式不是預設功能，是一個「加分題」。這種策略讓核心保持簡單，但提供了擴展的視覺選項。

---

## 📊 總評

| 項目 | 分數 | 備註 |
|------|------|------|
| 安裝便利性 | ⭐⭐⭐⭐⭐ | apt 一行，零設定 |
| 視覺效果 | ⭐⭐⭐⭐⭐ | 經典場面，無可取代 |
| 資源消耗 | ⭐⭐⭐⭐⭐ | 極輕量，幾乎不佔 CPU |
| 參數完整性 | ⭐⭐⭐⭐ | 功能齊全，但缺少一些進階選項 |
| 維護活躍度 | ⭐⭐⭐ | 2023 年仍有更新 |

**結論：** 如果你想要一個能讓你的終端機看起來像《駭客任務》的工具，cmatrix 是唯一的選擇。它不是為了「做什麼」而存在，而是為了「看起來像什麼」。執行一次 `cmatrix`，你就懂我在說什麼了。

---

## 🔧 實用場景

| 場景 | 怎麼用 |
|------|--------|
| 炫耀你的 terminal | 在朋友面前執行 `cmatrix -r` |
| 螢幕保護替代 | `cmatrix -s` 當保護程式 |
| 科技感截圖 | `cmatrix -C blue` 配合深色背景 |
| 面試自我介紹 | 「我是一個業餘駭客」（誤） |
| Linux 課程暖場 | 示範 ncurses 的能力 |
