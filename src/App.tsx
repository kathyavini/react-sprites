import { useState, useEffect, useRef } from 'react';
import './App.css';
import { SpriteBox } from './components/SpriteBox';
import { Map } from './components/Map';
import { Gravity } from './components/Gravity';
import { map, initialX, initialY } from './gameConfig';

function App() {
  // Positions are defined in row, column (array) notation rather than (x, y) point notation (i.e. y values always come first)
  const [position, setPosition] = useState([initialY, initialX]);
  let positionDiff = [position[0] - initialY, position[1] - initialX];

  const step = map.gridSize * map.scaleFactor;

  return (
    <div className="game-container">
      <h2 className="position-label">{`${position[0]}, ${position[1]}`}</h2>
      <div className="camera">
        {map.gravity ? (
          <Gravity position={position} setPosition={setPosition} />
        ) : null}
        <SpriteBox position={position} setPosition={setPosition} step={step} />
        <Map positionDiff={positionDiff} step={step} />
      </div>
    </div>
  );
}

export default App;
