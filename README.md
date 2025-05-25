# 打磚塊遊戲 (Breakout Game)

🎮 使用 Svelte + TypeScript + Tailwind CSS 開發的經典打磚塊遊戲。

## 🌐 線上試玩

**[點擊這裡立即遊玩 →](https://boshan200.github.io/svelte-breakout-game/)**

## 🎮 遊戲特色

- **隨機磚塊生成**: 每次遊戲會隨機生成 10-20 個磚塊
- **平滑控制**: 使用方向鍵或 A/D 鍵控制板子移動
- **物理碰撞**: 真實的球體碰撞物理效果
- **計時挑戰**: 2分鐘內消除所有磚塊獲勝
- **分數系統**: 消除磚塊獲得分數
- **響應式設計**: 適配不同螢幕尺寸

## 🛠️ 技術架構

- **框架**: Svelte + SvelteKit
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **建構工具**: Vite
- **狀態管理**: Svelte Stores
- **部署**: GitHub Pages + GitHub Actions

## 🎯 遊戲玩法

1. **開始遊戲**: 點擊「開始遊戲」按鈕
2. **控制板子**: 使用方向鍵 ← → 或 A/D 鍵移動板子
3. **彈球擊磚**: 用板子彈球撞擊上方的磚塊
4. **獲勝條件**: 在 2 分鐘內消除所有磚塊
5. **失敗條件**: 球掉到底部或時間耗盡

## 🚀 本地開發

### 安裝與啟動

```bash
# 克隆專案
git clone https://github.com/boshan200/svelte-breakout-game.git
cd svelte-breakout-game

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

### 其他指令

```bash
# 建構生產版本
npm run build

# 預覽生產版本
npm run preview

# TypeScript 類型檢查
npm run check
```

## 📁 專案結構

```
src/
├── components/          # 遊戲組件
│   ├── ClientOnly.svelte   # 客戶端渲染包裝器
│   ├── GameCanvas.svelte   # 遊戲畫布組件
│   └── GameControls.svelte # 遊戲控制組件
├── stores/             # 狀態管理
│   ├── config.ts          # 遊戲配置
│   ├── gameStore.ts       # 遊戲狀態
│   └── gameLogic.ts       # 遊戲邏輯
├── types/              # TypeScript 類型定義
│   └── game.ts           # 遊戲相關類型
└── routes/             # 頁面路由
    ├── +layout.svelte    # 應用佈局
    ├── +page.svelte      # 主頁面
    └── +page.ts          # 頁面配置
```

## 🎨 遊戲功能

### 已實現功能
- ✅ 隨機磚塊生成 (10-20個)
- ✅ 板子平行移動控制
- ✅ 球體物理碰撞
- ✅ 磚塊消除機制
- ✅ 2分鐘計時系統
- ✅ 分數統計
- ✅ 遊戲重新開始
- ✅ 響應式界面設計
- ✅ 客戶端渲染 (SSR 相容)

### 核心組件說明

#### GameStore (狀態管理)
- 遊戲狀態 (等待/進行中/暫停/獲勝/失敗)
- 球的位置和速度
- 板子的位置
- 磚塊陣列和狀態
- 分數和時間管理

#### GameLogic (遊戲邏輯)
- 碰撞檢測算法
- 板子移動邏輯
- 時間格式化工具

#### GameCanvas (遊戲渲染)
- Canvas 繪圖邏輯
- 遊戲循環 (update/draw)
- 鍵盤事件處理
- 物理引擎更新

## 🔧 自訂配置

可以在 `src/stores/config.ts` 中調整遊戲參數：

```typescript
export const GAME_CONFIG = {
  canvasWidth: 800,      // 畫布寬度
  canvasHeight: 600,     // 畫布高度
  ballSpeed: 5,          // 球的速度
  gameTime: 120,         // 遊戲時間 (秒)
  // ... 更多設定
};
```

## 📱 響應式支援

遊戲支援不同螢幕尺寸，在桌面、平板和手機上都能正常遊玩。

## 🚀 部署

本專案使用 GitHub Pages 自動部署：

1. 推送到 `main` 分支會自動觸發部署
2. GitHub Actions 會自動建構並部署到 GitHub Pages
3. 部署完成後可在 https://boshan200.github.io/svelte-breakout-game/ 訪問

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改進這個專案！

## 📄 授權

MIT License

## 🎮 立即開始遊玩！

**[點擊這裡開始遊戲 →](https://boshan200.github.io/svelte-breakout-game/)**

---

**專案特色**: 🎮 完整遊戲體驗 | 💻 現代技術棧 | 📱 響應式設計 | 🔧 可自訂配置 | 🚀 自動部署
