import type { GameConfig } from '$types/game';

export const GAME_CONFIG: GameConfig = {
  canvasWidth: 800,
  canvasHeight: 600,
  paddleWidth: 100,
  paddleHeight: 20,
  ballRadius: 10,
  ballSpeed: 5,
  brickWidth: 75,
  brickHeight: 20,
  brickRows: 4,
  brickCols: 10,
  gameTime: 120 // 2 minutes
};

export const BRICK_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#3b82f6', // blue
  '#8b5cf6', // purple
];