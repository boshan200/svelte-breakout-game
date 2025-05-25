import { writable, derived } from 'svelte/store';
import type { Ball, Paddle, Brick, GameState } from '$types/game';
import { GAME_CONFIG, BRICK_COLORS } from './config';

// Game state
export const gameState = writable<GameState>({
  gameStatus: 'waiting',
  score: 0,
  timeLeft: GAME_CONFIG.gameTime,
  level: 1
});

// Ball state
export const ball = writable<Ball>({
  x: GAME_CONFIG.canvasWidth / 2,
  y: GAME_CONFIG.canvasHeight - 100,
  dx: GAME_CONFIG.ballSpeed * (Math.random() > 0.5 ? 1 : -1),
  dy: -GAME_CONFIG.ballSpeed,
  radius: GAME_CONFIG.ballRadius
});

// Paddle state
export const paddle = writable<Paddle>({
  x: GAME_CONFIG.canvasWidth / 2 - GAME_CONFIG.paddleWidth / 2,
  y: GAME_CONFIG.canvasHeight - 50,
  width: GAME_CONFIG.paddleWidth,
  height: GAME_CONFIG.paddleHeight
});

// Bricks state
export const bricks = writable<Brick[]>([]);

// Derived stores
export const activeBricks = derived(bricks, ($bricks) => 
  $bricks.filter(brick => !brick.destroyed)
);

export const isGameWon = derived(activeBricks, ($activeBricks) => 
  $activeBricks.length === 0
);

// Game functions
export function initializeBricks() {
  const newBricks: Brick[] = [];
  const totalBricks = Math.floor(Math.random() * 11) + 10; // 10-20 bricks
  const bricksPerRow = Math.ceil(Math.sqrt(totalBricks));
  const startX = (GAME_CONFIG.canvasWidth - (bricksPerRow * (GAME_CONFIG.brickWidth + 5))) / 2;
  
  let brickCount = 0;
  for (let row = 0; row < 4 && brickCount < totalBricks; row++) {
    for (let col = 0; col < bricksPerRow && brickCount < totalBricks; col++) {
      newBricks.push({
        id: `brick-${row}-${col}`,
        x: startX + col * (GAME_CONFIG.brickWidth + 5),
        y: 50 + row * (GAME_CONFIG.brickHeight + 5),
        width: GAME_CONFIG.brickWidth,
        height: GAME_CONFIG.brickHeight,
        destroyed: false,
        color: BRICK_COLORS[row % BRICK_COLORS.length]
      });
      brickCount++;
    }
  }
  
  bricks.set(newBricks);
}

export function resetGame() {
  gameState.set({
    gameStatus: 'waiting',
    score: 0,
    timeLeft: GAME_CONFIG.gameTime,
    level: 1
  });
  
  ball.set({
    x: GAME_CONFIG.canvasWidth / 2,
    y: GAME_CONFIG.canvasHeight - 100,
    dx: GAME_CONFIG.ballSpeed * (Math.random() > 0.5 ? 1 : -1),
    dy: -GAME_CONFIG.ballSpeed,
    radius: GAME_CONFIG.ballRadius
  });
  
  paddle.set({
    x: GAME_CONFIG.canvasWidth / 2 - GAME_CONFIG.paddleWidth / 2,
    y: GAME_CONFIG.canvasHeight - 50,
    width: GAME_CONFIG.paddleWidth,
    height: GAME_CONFIG.paddleHeight
  });
  
  initializeBricks();
}

export function startGame() {
  gameState.update(state => ({
    ...state,
    gameStatus: 'playing'
  }));
}

export function pauseGame() {
  gameState.update(state => ({
    ...state,
    gameStatus: 'paused'
  }));
}

export function endGame(won: boolean) {
  gameState.update(state => ({
    ...state,
    gameStatus: won ? 'won' : 'lost'
  }));
}

export function updateScore(points: number) {
  gameState.update(state => ({
    ...state,
    score: state.score + points
  }));
}

export function decrementTime() {
  gameState.update(state => ({
    ...state,
    timeLeft: Math.max(0, state.timeLeft - 1)
  }));
}
