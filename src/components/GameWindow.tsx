import { useState } from 'react';
import { SpriteBox } from './SpriteBox';
import { Map } from './Map';
import { Gravity } from './Gravity';
import { gameProperties } from '../gameConfig';
import '../styles/GameWindow.css';

export function GameWindow() {
  // Positions are defined in row, column (array) notation rather than (x, y) point notation (i.e. y values always come first)
  const [position, setPosition] = useState([
    gameProperties.initialY,
    gameProperties.initialX,
  ]);
  let positionDiff = [
    position[0] - gameProperties.initialY,
    position[1] - gameProperties.initialX,
  ];

  const step = gameProperties.gridSize * gameProperties.scaleFactor;

  return (
    <div className="camera">
      {gameProperties.gravity ? (
        <Gravity position={position} setPosition={setPosition} />
      ) : null}
      <SpriteBox position={position} setPosition={setPosition} step={step} />
      <Map positionDiff={positionDiff} step={step} />
      <h2 className="position-label">{`${position[0]}, ${position[1]}`}</h2>
    </div>
  );
}
