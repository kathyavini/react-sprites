import { useEffect } from 'react';
import { map, camera } from '../gameConfig';

/* Pairs are CSS custom property names and their corresponding value taken from gameConfig */
const gameProperties = [
  /* Map */
  ['--gridSize', `${map.gridSize}px`],
  ['--scale-factor', `${map.scaleFactor}`],
  ['--mapRows', `${map.rows}`],
  ['--mapCols', `${map.columns}`],
  ['--initialY', `${map.initialY}`],
  ['--initialX', `${map.initialX}`],
  ['--mapImageWidth', `${map.imgWidth}px`],
  ['--mapImageHeight', `${map.imgHeight}px`],

  /* Camera */
  ['--spriteOffsetY', `${camera.spriteOffsetY}`],
  ['--spriteOffsetX', `${camera.spriteOffsetX}`],
  ['--cameraRows', `${camera.rows}`],
  ['--cameraCols', `${camera.columns}`],
];

function setCSSProperty(property: string, value: string) {
  document.documentElement.style.setProperty(property, value);
}

export function useConfig() {
  useEffect(() => {
    gameProperties.forEach((pair) => {
      setCSSProperty(pair[0], pair[1]);
    });
  }, []);
}
