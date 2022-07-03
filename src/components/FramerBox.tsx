import { useState, useEffect, useRef, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Sprite } from './Sprite';
import { MobileControls } from './MobileControlsProps';

interface FramerBoxProps {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
}

export function FramerBox({ position, setPosition }: FramerBoxProps) {
  const [jumping, setJumping] = useState(false);
  const [running, setRunning] = useState(false);
  const [directionX, setDirectionX] = useState('');
  const [directionY, setDirectionY] = useState('');

  let keyCount = 0;

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyRelease);

    let keyMap = {
      left: false,
      up: false,
      down: false,
      jump: false,
    };

    function handleKeyRelease(event: any) {
      // to limit the number of moves which can be done at once
      // A not great way to limit lag from re-reders
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
          setPosition((prev) => [prev[0] + 25, prev[1]]);
          break;
        case 'a':
        case 'ArrowLeft':
          setRunning(true);
          setDirectionX('left');
          setPosition((prev) => [prev[0] - 25, prev[1]]);
          break;
        case 'w':
        case 'ArrowUp':
          setRunning(true);
          setDirectionY('up');
          setPosition((prev) => [prev[0], prev[1] - 20]);
          break;
        case 's':
        case 'ArrowDown':
          setDirectionY('down');
          setRunning(true);
          setPosition((prev) => [prev[0], prev[1] + 20]);
          break;
        case ' ':
          if (!jumping) {
            setJumping(true);
          }
      }
    }

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyRelease);
    };
  }, []);

  return (
    <>
      <motion.div
        className="box"
        animate={{
          y: jumping
            ? [position[1], position[1] - 100, position[1]]
            : position[1],
          x: position[0],
        }}
        onAnimationComplete={() => {
          /* It's meant to complete when y has returned to 0 but it seems to also end prematurely*/
          setJumping(false);
        }}
        onTransitionEnd={() =>
          /* Triggered, I think, when movement to the side has ended*/
          setRunning(false)
        }
      >
        <Sprite
          mode={jumping ? 'jump' : 'idle'}
          running={running}
          directionX={directionX}
          directionY={directionY}
        />
      </motion.div>
      <MobileControls
        position={position}
        setPosition={setPosition}
        jumping={jumping}
        setJumping={setJumping}
        running={running}
        setRunning={setRunning}
        directionX={directionX}
        setDirectionX={setDirectionX}
        directionY={directionY}
        setDirectionY={setDirectionY}
      />
    </>
  );
}
