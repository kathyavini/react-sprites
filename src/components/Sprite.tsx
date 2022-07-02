interface SpriteProps {
  mode: string;
  direction: string;
  running: boolean;
}

export function Sprite({ mode, direction, running }: SpriteProps) {
  return (
    <div
      className={`sprite ${mode} ${direction} ${running ? 'running' : ''}`}
    ></div>
  );
}
