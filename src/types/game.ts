export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Ball extends Position, Velocity {
  radius: number;
}

export interface Paddle extends Position, Size {}

export interface Brick extends Position, Size {
  id: string;
  destroyed: boolean;
  color: string;
}

export interface GameState {
  gameStatus: 'waiting' | 'playing' | 'paused' | 'won' | 'lost';
  score: number;
  timeLeft: number;
  level: number;
}

export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  paddleWidth: number;
  paddleHeight: number;
  ballRadius: number;
  ballSpeed: number;
  brickWidth: number;
  brickHeight: number;
  brickRows: number;
  brickCols: number;
  gameTime: number; // 2 minutes in seconds
}