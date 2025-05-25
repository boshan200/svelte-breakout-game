# 🔧 GitHub Pages 設定指南

## 📋 問題說明

GitHub Actions 顯示錯誤：
```
Error: Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions
```

這表示 GitHub Pages 還沒有啟用，需要手動設定。

## 🛠️ 解決步驟

### 步驟 1: 前往 Repository 設定
1. 打開你的 GitHub repository: https://github.com/boshan200/svelte-breakout-game
2. 點擊 **"Settings"** 分頁（在 repository 頂部選單）

### 步驟 2: 啟用 GitHub Pages
1. 在左側選單中，滾動找到 **"Pages"** 選項
2. 點擊 **"Pages"**

### 步驟 3: 配置 Pages 設定
在 "Pages" 設定頁面中：

1. **Source (來源)**:
   - 選擇 **"GitHub Actions"**
   - 不要選擇 "Deploy from a branch"

2. **確認設定**:
   - 來源應該設為 "GitHub Actions"
   - 會顯示 "GitHub Actions workflows will be used to build and deploy your site"

### 步驟 4: 保存設定
1. 設定會自動保存
2. 你會看到一個綠色提示訊息

### 步驟 5: 觸發重新部署
1. 前往 **"Actions"** 分頁
2. 點擊最新的 workflow run
3. 點擊右上角的 **"Re-run all jobs"** 按鈕

## 🎯 預期結果

設定完成後：
- ✅ GitHub Actions 可以正常部署
- ✅ 網站會部署到 https://boshan200.github.io/svelte-breakout-game/
- ✅ 每次推送到 main 分支都會自動更新

## 📱 替代方案

如果自動設定無法運作，你也可以：

1. **確認 token 權限**: 確保你的 GitHub token 有 `pages: write` 權限
2. **手動觸發**: 使用 repository 的 "Actions" 分頁手動執行 workflow
3. **檢查狀態**: 在 Pages 設定中查看部署狀態

## 🔍 驗證設定

正確設定後，在 Pages 設定頁面你應該看到：
- ✅ Source: "GitHub Actions"
- ✅ Custom domain: 空白或你的自訂域名
- ✅ Enforce HTTPS: 已勾選

## 📞 需要協助？

如果設定後仍有問題：
1. 檢查 Actions 頁面的錯誤訊息
2. 確認所有檔案都已正確上傳
3. 查看 repository 是否為公開（Private repos 需要付費版 GitHub）

完成這些步驟後，你的打磚塊遊戲就會成功部署到線上了！🎮
