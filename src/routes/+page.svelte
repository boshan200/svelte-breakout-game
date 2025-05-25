<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import ClientOnly from '$components/ClientOnly.svelte';
  import GameCanvas from '$components/GameCanvas.svelte';
  import GameControls from '$components/GameControls.svelte';
  import { resetGame } from '$stores/gameStore';

  onMount(() => {
    if (browser) {
      resetGame();
    }
  });
</script>

<svelte:head>
  <title>打磚塊遊戲</title>
  <meta name="description" content="使用 Svelte 開發的打磚塊遊戲" />
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
  <div class="container mx-auto px-4">
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">🧱 打磚塊遊戲</h1>
      <p class="text-gray-600">經典的打磚塊遊戲，使用 Svelte + TypeScript 開發</p>
    </header>

    <ClientOnly>
      <div class="game-layout flex flex-col lg:flex-row gap-8 items-start justify-center">
        <!-- Game Controls -->
        <div class="game-controls-section">
          <GameControls />
        </div>

        <!-- Game Canvas -->
        <div class="game-canvas-section">
          <GameCanvas />
        </div>
      </div>
    </ClientOnly>

    <footer class="text-center mt-8 text-gray-500 text-sm">
      <p>使用方向鍵 ← → 或 A/D 鍵控制板子移動</p>
    </footer>
  </div>
</main>

<style>
  .game-layout {
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    .game-layout {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
