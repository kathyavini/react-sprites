import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprite } from './Sprite';
import { MobileControls } from './MobileControls';
import { KeyboardControls } from './KeyboardControls';
import { collisions } from '../gameConfig';

interface SpriteBoxProps {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
  step: number;
}

export function SpriteBox({ position, setPosition, step }: SpriteBoxProps) {
  const [jumping, setJumping] = useState(false);
  const [running, setRunning] = useState(false);
  const [directionX, setDirectionX] = useState('');
  const [directionY, setDirectionY] = useState('');

  // "Gravity" (= fall to the boundary box below)
  useEffect(() => {
    const boundaryRows = collisions.map((row) => {
      return row[position[1]] === 1;
    });

    let ground = position[0] + 1; // default is ground under you
    if (boundaryRows.includes(true)) {
      for (let i = 0; i < boundaryRows.length; i++) {
        if (boundaryRows[i] && i > position[0]) {
          ground = i;
          break;
        }
      }
    }

    // If you are floating over a defined collision, fall to ground
    if (position[0] !== ground - 1) {
      setPosition([ground - 1, position[1]]);
    }
  }, [position]);

  let jumpHeight = 2 * step;

  const checkCollisions = (row: number, column: number) => {
    return collisions[row][column] ? true : false;
  };

  // For passing into movement control components
  const spriteControls = {
    jumping,
    running, // needed by mobile but not keyboard controls
    setJumping,
    setRunning,
    directionX, // needed by mobile but not keyboard controls
    directionY, // needed by mobile but not keyboard controls
    setDirectionX,
    setDirectionY,
    position,
    setPosition,
    checkCollisions,
  };

  return (
    <>
      <motion.div
        className="box"
        animate={
          jumping
            ? {
                y: [0, -jumpHeight, 0],
              }
            : {}
        }
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
      {/* <MobileControls {...spriteControls} /> */}
      <KeyboardControls {...spriteControls} />
    </>
  );
}
