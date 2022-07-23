import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprite } from './Sprite';
import { MobileControls } from './MobileControls';
import { KeyboardControls } from './KeyboardControls';
import { collisions } from '../gameConfig';
import '../styles/SpriteBox.css';

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
        className="sprite-box"
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
