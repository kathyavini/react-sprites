import { useState, useRef, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Sprite } from './Sprite';
import { MobileControls } from './MobileControls';
import { KeyboardControls } from './KeyboardControls';

interface SpriteBoxProps {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
  checkCollisions: (arg0: number, arg1: number) => boolean;
}

export function SpriteBox({
  position,
  setPosition,
  checkCollisions,
}: SpriteBoxProps) {
  const [jumping, setJumping] = useState(false);
  const [running, setRunning] = useState(false);
  const [directionX, setDirectionX] = useState('');
  const [directionY, setDirectionY] = useState('');

  // For passing into movement control components
  const spriteControls = {
    jumping,
    running,
    setJumping,
    setRunning,
    directionX,
    directionY,
    setDirectionX,
    setDirectionY,
    position,
    setPosition,
    checkCollisions,
  };

  let jumpHeight = 70;

  return (
    <>
      <motion.div
        className="box"
        // animate={{
        //   y: jumping
        //     ? [position[1], position[1] - jumpHeight, position[1]]
        //     : position[1],
        //   x: position[0],
        // }}
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
