<script lang="ts">
  import { browser } from '$app/environment';
  import { gameState, resetGame, startGame, pauseGame } from '$stores/gameStore';
  import { formatTime } from '$stores/gameLogic';

  function handleStartGame() {
    if (!browser) return;
    
    if ($gameState.gameStatus === 'waiting' || $gameState.gameStatus === 'won' || $gameState.gameStatus === 'lost') {
      resetGame();
      startGame();
    } else if ($gameState.gameStatus === 'paused') {
      startGame();
    } else {
      pauseGame();
    }
  }

  function handleResetGame() {
    if (!browser) return;
    resetGame();
  }

  $: buttonText = getButtonText($gameState.gameStatus);
  $: statusText = getStatusText($gameState.gameStatus);

  function getButtonText(status: string): string {
    switch (status) {
      case 'waiting':
        return '開始遊戲';
      case 'playing':
        return '暫停遊戲';
      case 'paused':
        return '繼續遊戲';
      case 'won':
      case 'lost':
        return '重新開始';
      default:
        return '開始遊戲';
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'waiting':
        return '準備開始！使用左右箭頭鍵或 A/D 鍵控制板子';
      case 'playing':
        return '遊戲進行中...';
      case 'paused':
        return '遊戲已暫停';
      case 'won':
        return '🎉 恭喜你獲勝了！';
      case 'lost':
        return '😢 遊戲結束，再試一次！';
      default:
        return '';
    }
  }
</script>

<div class="game-controls bg-white p-6 rounded-lg shadow-lg">
  <div class="text-center mb-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-2">打磚塊遊戲</h2>
    <p class="text-gray-600">{statusText}</p>
  </div>

  <div class="game-stats grid grid-cols-3 gap-4 mb-6">
    <div class="stat-item text-center p-3 bg-blue-50 rounded">
      <div class="text-2xl font-bold text-blue-600">{$gameState.score}</div>
      <div class="text-sm text-gray-600">分數</div>
    </div>
    <div class="stat-item text-center p-3 bg-green-50 rounded">
      <div class="text-2xl font-bold text-green-600">{formatTime($gameState.timeLeft)}</div>
      <div class="text-sm text-gray-600">剩餘時間</div>
    </div>
    <div class="stat-item text-center p-3 bg-purple-50 rounded">
      <div class="text-2xl font-bold text-purple-600">{$gameState.level}</div>
      <div class="text-sm text-gray-600">關卡</div>
    </div>
  </div>

  <div class="controls flex gap-4 justify-center">
    <button
      on:click={handleStartGame}
      class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
    >
      {buttonText}
    </button>
    
    <button
      on:click={handleResetGame}
      class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
    >
      重置遊戲
    </button>
  </div>

  {#if $gameState.gameStatus === 'waiting'}
    <div class="instructions mt-6 p-4 bg-yellow-50 rounded-lg">
      <h3 class="font-semibold text-yellow-800 mb-2">遊戲說明：</h3>
      <ul class="text-sm text-yellow-700 space-y-1">
        <li>• 使用左右箭頭鍵或 A/D 鍵控制板子</li>
        <li>• 用板子彈球撞擊磚塊</li>
        <li>• 在2分鐘內消除所有磚塊即可獲勝</li>
        <li>• 不要讓球掉到底部！</li>
      </ul>
    </div>
  {/if}

  {#if $gameState.gameStatus === 'won'}
    <div class="victory-message mt-6 p-4 bg-green-50 rounded-lg text-center">
      <h3 class="font-semibold text-green-800 mb-2">🎉 太棒了！</h3>
      <p class="text-green-700">你在 {formatTime(120 - $gameState.timeLeft)} 內完成了遊戲！</p>
      <p class="text-green-700">最終分數：{$gameState.score} 分</p>
    </div>
  {/if}

  {#if $gameState.gameStatus === 'lost'}
    <div class="defeat-message mt-6 p-4 bg-red-50 rounded-lg text-center">
      <h3 class="font-semibold text-red-800 mb-2">遊戲結束</h3>
      <p class="text-red-700">別灰心，再試一次！</p>
      <p class="text-red-700">你的分數：{$gameState.score} 分</p>
    </div>
  {/if}
</div>

<style>
  .game-controls {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
