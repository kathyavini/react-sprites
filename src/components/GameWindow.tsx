import { useState } from 'react';
import { SpriteBox } from './SpriteBox';
import { Map } from './Map';
import { Gravity } from './Gravity';
import { map } from '../gameConfig';
import '../styles/GameWindow.css';

export function GameWindow() {
  // Positions are defined in row, column (array) notation rather than (x, y) point notation (i.e. y values always come first)
  const [position, setPosition] = useState([map.initialY, map.initialX]);
  let positionDiff = [position[0] - map.initialY, position[1] - map.initialX];

  const step = map.gridSize * map.scaleFactor;

  return (
    <div className="camera">
      {map.gravity ? (
        <Gravity position={position} setPosition={setPosition} />
      ) : null}
      <SpriteBox position={position} setPosition={setPosition} step={step} />
      <Map positionDiff={positionDiff} step={step} />
      <h2 className="position-label">{`${position[0]}, ${position[1]}`}</h2>
    </div>
  );
}
