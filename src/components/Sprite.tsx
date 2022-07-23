import '../styles/Sprite.css';
import { verticalSpriteSheets } from '../gameConfig';

interface SpriteProps {
  mode: string;
  directionX: string;
  directionY: string;
  running: boolean;
}

export function Sprite({ mode, directionX, directionY, running }: SpriteProps) {
  return (
    <div
      className={`sprite ${
        verticalSpriteSheets ? 'vertical' : ''
      } ${mode} ${directionX} ${directionY} ${running ? 'running' : ''}`}
    ></div>
  );
}
