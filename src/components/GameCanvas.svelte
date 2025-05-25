<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { gameState, ball, paddle, bricks, activeBricks, isGameWon, endGame, updateScore, decrementTime } from '$stores/gameStore';
  import { checkBallCollision, movePaddle } from '$stores/gameLogic';
  import { GAME_CONFIG } from '$stores/config';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let animationId: number;
  let gameTimer: number;
  
  let keysPressed: { [key: string]: boolean } = {};
  let mounted = false;

  onMount(() => {
    if (!browser) return;
    
    mounted = true;
    ctx = canvas.getContext('2d')!;
    
    // Keyboard event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Start game timer
    gameTimer = setInterval(() => {
      gameState.update(state => {
        if (state.gameStatus === 'playing') {
          const newTimeLeft = Math.max(0, state.timeLeft - 1);
          if (newTimeLeft === 0) {
            endGame(false);
          }
          return { ...state, timeLeft: newTimeLeft };
        }
        return state;
      });
    }, 1000);

    gameLoop();
  });

  onDestroy(() => {
    if (!browser || !mounted) return;
    
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    if (gameTimer) {
      clearInterval(gameTimer);
    }
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  });

  function handleKeyDown(e: KeyboardEvent) {
    keysPressed[e.key] = true;
  }

  function handleKeyUp(e: KeyboardEvent) {
    keysPressed[e.key] = false;
  }

  function gameLoop() {
    if (!browser || !mounted) return;
    
    update();
    draw();
    animationId = requestAnimationFrame(gameLoop);
  }

  function update() {
    const currentGameState = $gameState;
    if (currentGameState.gameStatus !== 'playing') return;

    // Handle paddle movement
    if (keysPressed['ArrowLeft'] || keysPressed['a'] || keysPressed['A']) {
      paddle.update(p => ({ ...p, ...movePaddle(p, 'left') }));
    }
    if (keysPressed['ArrowRight'] || keysPressed['d'] || keysPressed['D']) {
      paddle.update(p => ({ ...p, ...movePaddle(p, 'right') }));
    }

    // Update ball position and check collisions
    const currentBall = $ball;
    const currentPaddle = $paddle;
    const currentBricks = $bricks;

    const collision = checkBallCollision(currentBall, currentPaddle, currentBricks);

    // Update ball
    ball.update(b => ({ ...b, ...collision.ballUpdate }));

    // Handle destroyed bricks
    if (collision.destroyedBricks.length > 0) {
      bricks.update(brickList =>
        brickList.map(brick =>
          collision.destroyedBricks.includes(brick.id)
            ? { ...brick, destroyed: true }
            : brick
        )
      );
      updateScore(collision.destroyedBricks.length * 10);
    }

    // Check game over conditions
    if (collision.gameOver) {
      endGame(false);
    } else if ($isGameWon) {
      endGame(true);
    }
  }

  function draw() {
    if (!ctx || !mounted) return;
    
    // Clear canvas
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight);

    // Draw bricks
    $bricks.forEach(brick => {
      if (!brick.destroyed) {
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        
        // Add border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      }
    });

    // Draw paddle
    const currentPaddle = $paddle;
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(currentPaddle.x, currentPaddle.y, currentPaddle.width, currentPaddle.height);

    // Draw ball
    const currentBall = $ball;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(currentBall.x, currentBall.y, currentBall.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw game info
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`分數: ${$gameState.score}`, 20, 30);
    ctx.fillText(`時間: ${formatTime($gameState.timeLeft)}`, 20, 60);
    ctx.fillText(`剩餘磚塊: ${$activeBricks.length}`, 20, 90);
  }

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
</script>

<div class="game-canvas-container">
  <canvas
    bind:this={canvas}
    width={GAME_CONFIG.canvasWidth}
    height={GAME_CONFIG.canvasHeight}
    class="border-2 border-gray-400 bg-slate-800"
  ></canvas>
</div>

<style>
  .game-canvas-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
