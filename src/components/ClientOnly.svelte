<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

{#if browser && mounted}
  <slot />
{:else}
  <div class="loading-container flex items-center justify-center min-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p class="text-gray-600">正在載入遊戲...</p>
    </div>
  </div>
{/if}

<style>
  .loading-container {
    min-height: 600px;
  }
</style>
