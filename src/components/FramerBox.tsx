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

    // to limit the number of moves which can be done at once
    // A not great way to limit lag from re-rederings
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
          setRunning(false);
          setJumping(true);
      }
    }

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyRelease);
    };
  }, []);

  return (
    <motion.div
      className="box"
      animate={{
        y: jumping
          ? [position[1], position[1] - 100, position[1]]
          : position[1],
        x: position[0],
      }}
      onAnimationComplete={() => {
        setJumping(false);
      }}
      onTransitionEnd={() => setRunning(false)}
    >
      <Sprite
        mode={jumping ? 'jump' : 'idle'}
        running={running}
        direction={direction}
      />
    </motion.div>
  );
}
