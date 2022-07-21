import { useEffect } from 'react';

interface KeyboardControlsProps {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
  jumping: boolean;
  setJumping: React.Dispatch<React.SetStateAction<boolean>>;
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  directionX: string;
  setDirectionX: React.Dispatch<React.SetStateAction<string>>;
  directionY: string;
  setDirectionY: React.Dispatch<React.SetStateAction<string>>;
  checkCollisions: (arg0: number, arg1: number) => boolean;
}
export function KeyboardControls({
  position,
  setPosition,
  jumping,
  setJumping,
  running,
  setRunning,
  directionX,
  setDirectionX,
  directionY,
  setDirectionY,
  checkCollisions,
}: KeyboardControlsProps) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    //// Let's return to this idea
    // let keyMap = {
    //   left: false,
    //   up: false,
    //   down: false,
    //   jump: false,
    // };

    function handleKeyDown(event: any) {
      event.preventDefault();
      event.stopPropagation();

      const key = event.key;

      switch (key) {
        case 'd':
        case 'ArrowRight':
          setRunning(true);
          setDirectionX('right');
          if (!checkCollisions(0, 1)) {
            setPosition((prev) => [prev[0], prev[1] + 1]);
          }
          break;
        case 'a':
        case 'ArrowLeft':
          setRunning(true);
          setDirectionX('left');
          if (!checkCollisions(position[0], position[1] - 1)) {
            setPosition((prev) => [prev[0], prev[1] - 1]);
          }
          break;
        case 'w':
        case 'ArrowUp':
          setRunning(true);
          setDirectionY('up');
          if (!checkCollisions(position[0] - 1, position[1])) {
            setPosition((prev) => [prev[0] - 1, prev[1]]);
          }
          break;
        case 's':
        case 'ArrowDown':
          setDirectionY('down');
          setRunning(true);
          if (!checkCollisions(position[0] + 1, position[1])) {
            setPosition((prev) => [prev[0] + 1, prev[1]]);
          }
          break;
        case ' ':
          if (!jumping) {
            setJumping(true);
          }
      }
    }
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <></>;
}
