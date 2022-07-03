import { useState, useEffect, useRef, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Sprite } from './Sprite';

interface FramerBoxProps {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
}

export function FramerBox({ position, setPosition }: FramerBoxProps) {
  const [jumping, setJumping] = useState(false);
  const [running, setRunning] = useState(false);
  const [direction, setDirection] = useState('');

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

      //// Might do something like this later. For now transitionEnd / animationEnd events set the state
      // const key = event.key;
      // switch (key) {
      // case 'd':
      // case 'ArrowRight':
      // case 'a':
      // case 'ArrowLeft':
      //   setRunning(false);
      //   break;
      // case ' ':
      //   setJumping(false);
      // }
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
          setDirection('right');
          setPosition((prev) => [prev[0] + 25, prev[1]]);
          break;
        case 'a':
        case 'ArrowLeft':
          setRunning(true);
          setDirection('left');
          setPosition((prev) => [prev[0] - 25, prev[1]]);
          break;
        case 'w':
        case 'ArrowUp':
          setDirection('right');
          setPosition((prev) => [prev[0], prev[1] - 20]);
          break;
        case 's':
        case 'ArrowDown':
          setDirection('left');
          // Note that setteing a conditional on position here doesn't work
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

  function handleTap() {
    setPosition((prev) => [prev[0] + 25, prev[1]]);
  }

  return (
    <motion.div
      onTap={handleTap}
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
        direction={direction}
      />
    </motion.div>
  );
}
