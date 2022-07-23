import '../styles/Sprite.css';

interface SpriteProps {
  mode: string;
  directionX: string;
  directionY: string;
  running: boolean;
}

export function Sprite({ mode, directionX, directionY, running }: SpriteProps) {
  return (
    <div
      className={`sprite ${mode} ${directionX} ${directionY} ${
        running ? 'running' : ''
      }`}
    ></div>
  );
}
