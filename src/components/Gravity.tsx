import { useEffect } from 'react';
import { collisions } from '../gameConfig';

interface GravityProps {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
}
export function Gravity({ position, setPosition }: GravityProps) {
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

  return <></>;
}
