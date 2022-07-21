import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import { SpriteBox } from './components/SpriteBox';
import { Map } from './components/Map';

function App() {
  // Positions are defined in row, column (array) notation rather than (x, y) point notation (i.e. y values always come first)

  // For this to automatically line up, the offset of the map has to be be considered along with the offset of the sprite... can't be changed just here
  const initialY = 8;
  const initialX = 8;

  const [position, setPosition] = useState([initialY, initialX]);

  let positionDiff = [position[0] - initialY, position[1] - initialX];

  const gridSize = 8; // in pixels
  const scaleFactor = 10;

  let step = gridSize * scaleFactor;

  // function checkCollisions(rowDiff: number, columnDiff: number) {
  //   console.log(
  //     "I think I'm stitting at: " + position[0] + ' - ' + position[1]
  //   );
  //   boundaryArray.forEach((block) => {
  //     console.log('checking ' + block[0] + ' - ' + block[1]);
  //     if (
  //       block[0] === position[0] + rowDiff &&
  //       block[1] === position[1] + columnDiff
  //     ) {
  //       console.log('THERE WAS COLLISION!');
  //       return true;
  //     }
  //   });
  //   console.log('No collision here');
  //   return false;
  // }

  return (
    <div className="game-container">
      <h2 className="position-label">{`${position[0]}, ${position[1]}`}</h2>
      <div className="camera">
        <SpriteBox
          position={position}
          setPosition={setPosition}
          // checkCollisions={checkCollisions}
          step={step}
        />
        <Map positionDiff={positionDiff} step={step} />
      </div>
    </div>
  );
}

export default App;
