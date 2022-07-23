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
    document.addEventListener('keyup', handleKeyUp);

    // Let's return to this idea
    let keyMap = {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
    };

    function handleKeyUp(event: any) {
      event.preventDefault();
      event.stopPropagation();

      const key = event.key;

      switch (key) {
        case 'd':
        case 'ArrowRight':
          keyMap.right = false;
          break;
        case 'a':
        case 'ArrowLeft':
          keyMap.left = false;
          break;
        case 'w':
        case 'ArrowUp':
          keyMap.up = false;
          break;
        case 's':
        case 'ArrowDown':
          keyMap.down = false;
        case ' ':
          keyMap.jump = false;
        // }
      }
    }

    function handleKeyDown(event: any) {
      event.preventDefault();
      event.stopPropagation();

      const key = event.key;

      switch (key) {
        case 'd':
        case 'ArrowRight':
          keyMap.right = true;
          setRunning(true);
          setDirectionX('right');
          // I don't love that I set the position even if there is no change, but it seems like the best way to access the current value, short of maybe putting position in context
          if (keyMap.jump) {
            console.log("I'm jumping while I move right");
            setPosition((prev) => [
              checkCollisions(prev[0] - 1, prev[1]) ||
              checkCollisions(prev[0] - 2, prev[1])
                ? prev[0]
                : prev[0] - 2,
              prev[1] + 1,
            ]);
          } else {
            setPosition((prev) => [
              prev[0],
              checkCollisions(prev[0], prev[1] + 1) ? prev[1] : prev[1] + 1,
            ]);
          }
          break;
        case 'a':
        case 'ArrowLeft':
          keyMap.left = true;
          setRunning(true);
          setDirectionX('left');
          setPosition((prev) => [
            prev[0],
            checkCollisions(prev[0], prev[1] - 1) ? prev[1] : prev[1] - 1,
          ]);
          break;
        case 'w':
        case 'ArrowUp':
          keyMap.up = true;
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
          keyMap.down = true;
          setDirectionY('down');
          setRunning(true);
          setPosition((prev) => [
            checkCollisions(prev[0] + 1, prev[1]) ? prev[0] : prev[0] + 1,
            prev[1],
          ]);
          break;
        case ' ':
          keyMap.jump = true;

          if (keyMap.right) {
            console.log("I'm moving right while jumping!");
            setPosition((prev) => [
              checkCollisions(prev[0] - 1, prev[1]) ||
              checkCollisions(prev[0] - 2, prev[1])
                ? prev[0]
                : prev[0] - 2,
              prev[1] + 1,
            ]);
          } else {
            setJumping(true);
          }
      }
    }
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return <></>;
}
