import { useEffect } from 'react';

interface KeyboardControlsProps {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
  setJumping: React.Dispatch<React.SetStateAction<boolean>>;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setDirectionX: React.Dispatch<React.SetStateAction<string>>;
  setDirectionY: React.Dispatch<React.SetStateAction<string>>;
  checkCollisions: (arg0: number, arg1: number) => boolean;
}
export function KeyboardControls({
  position,
  setPosition,
  setJumping,
  setRunning,
  setDirectionX,
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
          // I don't love that I set the position even if there is no change, but it seems like the best way to access the current value, short of maybe putting position in context
          setPosition((prev) => [
            prev[0],
            checkCollisions(prev[0], prev[1] + 1) ? prev[1] : prev[1] + 1,
          ]);
          break;
        case 'a':
        case 'ArrowLeft':
          setRunning(true);
          setDirectionX('left');
          setPosition((prev) => [
            prev[0],
            checkCollisions(prev[0], prev[1] - 1) ? prev[1] : prev[1] - 1,
          ]);
          break;
        case 'w':
        case 'ArrowUp':
          setRunning(true);
          setDirectionY('up');
          // if (!checkCollisions(position[0] - 1, position[1])) {
          setPosition((prev) => [
            checkCollisions(prev[0] - 1, prev[1]) ? prev[0] : prev[0] - 1,
            prev[1],
          ]);
          // }
          break;
        case 's':
        case 'ArrowDown':
          setDirectionY('down');
          setRunning(true);
          setPosition((prev) => [
            checkCollisions(prev[0] + 1, prev[1]) ? prev[0] : prev[0] + 1,
            prev[1],
          ]);
          break;
        case ' ':
          // if (!jumping) {
          setJumping(true);
        // }
      }
    }
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <></>;
}
