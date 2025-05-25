import type { Ball, Paddle, Brick } from '$types/game';
import { GAME_CONFIG } from '$stores/config';

export function checkBallCollision(
  ball: Ball,
  paddle: Paddle,
  bricks: Brick[]
): {
  ballUpdate: Partial<Ball>;
  destroyedBricks: string[];
  gameOver: boolean;
} {
  let ballUpdate: Partial<Ball> = {
    x: ball.x + ball.dx,
    y: ball.y + ball.dy
  };
  
  const destroyedBricks: string[] = [];
  let gameOver = false;

  // Wall collisions
  if (ballUpdate.x! <= ball.radius || ballUpdate.x! >= GAME_CONFIG.canvasWidth - ball.radius) {
    ballUpdate.dx = -ball.dx;
    ballUpdate.x = ball.x; // Reset position to prevent getting stuck
  }
  
  if (ballUpdate.y! <= ball.radius) {
    ballUpdate.dy = -ball.dy;
    ballUpdate.y = ball.y;
  }
  
  // Bottom wall (game over)
  if (ballUpdate.y! >= GAME_CONFIG.canvasHeight - ball.radius) {
    gameOver = true;
    return { ballUpdate, destroyedBricks, gameOver };
  }

  // Paddle collision
  if (
    ballUpdate.y! + ball.radius >= paddle.y &&
    ballUpdate.y! - ball.radius <= paddle.y + paddle.height &&
    ballUpdate.x! >= paddle.x &&
    ballUpdate.x! <= paddle.x + paddle.width
  ) {
    // Calculate hit position on paddle for angle adjustment
    const hitPos = (ballUpdate.x! - paddle.x) / paddle.width;
    const angle = (hitPos - 0.5) * Math.PI / 3; // Max 60 degrees
    
    const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
    ballUpdate.dx = speed * Math.sin(angle);
    ballUpdate.dy = -Math.abs(speed * Math.cos(angle)); // Always bounce up
    ballUpdate.y = paddle.y - ball.radius;
  }

  // Brick collisions
  for (const brick of bricks) {
    if (brick.destroyed) continue;
    
    if (
      ballUpdate.x! + ball.radius >= brick.x &&
      ballUpdate.x! - ball.radius <= brick.x + brick.width &&
      ballUpdate.y! + ball.radius >= brick.y &&
      ballUpdate.y! - ball.radius <= brick.y + brick.height
    ) {
      destroyedBricks.push(brick.id);
      
      // Determine collision side for proper bounce
      const ballCenterX = ballUpdate.x!;
      const ballCenterY = ballUpdate.y!;
      const brickCenterX = brick.x + brick.width / 2;
      const brickCenterY = brick.y + brick.height / 2;
      
      const dx = ballCenterX - brickCenterX;
      const dy = ballCenterY - brickCenterY;
      
      if (Math.abs(dx / brick.width) > Math.abs(dy / brick.height)) {
        ballUpdate.dx = -ball.dx;
      } else {
        ballUpdate.dy = -ball.dy;
      }
      
      break; // Only handle one brick collision per frame
    }
  }

  return { ballUpdate, destroyedBricks, gameOver };
}

export function movePaddle(paddle: Paddle, direction: 'left' | 'right', speed: number = 8): Partial<Paddle> {
  let newX = paddle.x;
  
  if (direction === 'left') {
    newX = Math.max(0, paddle.x - speed);
  } else {
    newX = Math.min(GAME_CONFIG.canvasWidth - paddle.width, paddle.x + speed);
  }
  
  return { x: newX };
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}