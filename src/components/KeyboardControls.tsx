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
}: KeyboardControlsProps) {
  // to limit the number of moves which can be done at once (to prevent lag from too many re-renders; I'd like to create a better approach later)
  let keyCount = 0;

  // These should match the CSS variables and eventually be imported from a game object
  const gridSize = 8; // in pixels
  const scaleFactor = 10;

  let step = gridSize * scaleFactor;

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyRelease);

    //// Let's return to this idea
    // let keyMap = {
    //   left: false,
    //   up: false,
    //   down: false,
    //   jump: false,
    // };

    function handleKeyRelease(event: any) {
      keyCount = 0;
    }

    function handleKeyDown(event: any) {
      event.preventDefault();
      event.stopPropagation();

      const key = event.key;

      // console.log({ key });

      keyCount++;
      if (keyCount > 15) return;

      switch (key) {
        case 'd':
        case 'ArrowRight':
          setRunning(true);
          setDirectionX('right');
          setPosition((prev) => [prev[0] + step, prev[1]]);
          break;
        case 'a':
        case 'ArrowLeft':
          setRunning(true);
          setDirectionX('left');
          setPosition((prev) => [prev[0] - step, prev[1]]);
          break;
        case 'w':
        case 'ArrowUp':
          setRunning(true);
          setDirectionY('up');
          setPosition((prev) => [prev[0], prev[1] - step]);
          break;
        case 's':
        case 'ArrowDown':
          setDirectionY('down');
          setRunning(true);
          setPosition((prev) => [prev[0], prev[1] + step]);
          break;
        case ' ':
          if (!jumping) {
            setJumping(true);
          }
      }
    }
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyRelease);
    };
  }, []);

  return <></>;
}
