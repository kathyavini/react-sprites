import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import { SpriteBox } from './components/SpriteBox';
import { Map } from './components/Map';
import mapImg from './assets/sam-pico-recreation.png';

function Boundary({ position, step }: MapGridProps) {
  return (
    <motion.div
      className="boundary"
      animate={{
        y: -position[0] * step,
        x: -position[1] * step,
      }}
    ></motion.div>
  );
}

function CameraGrid() {
  const numRows = 8;
  const numCols = 8;
  const numBoxes = numRows * numCols;

  const gridArray = Array(numBoxes).fill(0);

  const overlayDivs = gridArray.map((box, index) => (
    <div className="overlay-box" key={index}>
      <p>
        {Math.floor(index / numCols)}-{index % numCols}
      </p>
    </div>
  ));

  return <div className="overlay-grid">{overlayDivs}</div>;
}

interface MapGridProps {
  position: number[];
  step: number;
}

function MapGrid({ position, step }: MapGridProps) {
  const numRows = 16;
  const numCols = 40;
  const numBoxes = numRows * numCols;

  const gridArray = Array(numBoxes).fill(0);

  const overlayDivs = gridArray.map((box, index) => (
    <div className="map-grid-box" key={index}>
      <p>
        {Math.floor(index / numCols)}-{index % numCols}
      </p>
    </div>
  ));

  return (
    <motion.div
      className="map-grid"
      animate={{
        y: -position[0] * step,
        x: -position[1] * step,
      }}
    >
      {overlayDivs}
    </motion.div>
  );
}

function Object({ position, step }: MapGridProps) {
  return (
    <motion.div
      className="object-box"
      animate={{
        y: -position[0] * step,
        x: -position[1] * step,
      }}
    >
      <div className="object-sprite"></div>
    </motion.div>
  );
}

function App() {
  // In row, column (array) notation rather than (x, y) point notation
  const [position, setPosition] = useState([8, 8]);
  // const [lastPosition, setLastPosition] = useState(position);
  let positionDiff = [position[0] - 8, position[1] - 8];

  // useEffect(() => {
  //   if (checkCollisions(position[0], position[1])) {
  //     console.log('there was a collision!');
  //     setPosition([lastPosition[0], lastPosition[1]]);
  //     positionDiff = [lastPosition[0] - 8, lastPosition[1] - 8];
  //   } else {
  //     setLastPosition([position[0], position[1]]);
  //   }
  // }, [position]);

  const gridSize = 8; // in pixels
  const scaleFactor = 10;

  let step = gridSize * scaleFactor;

  const boundaryArray = [[8, 10]];

  function checkCollisions(rowDiff: number, columnDiff: number) {
    console.log(
      "I think I'm stitting at: " + position[0] + ' - ' + position[1]
    );
    boundaryArray.forEach((block) => {
      console.log('checking ' + block[0] + ' - ' + block[1]);
      if (
        block[0] === position[0] + rowDiff &&
        block[1] === position[1] + columnDiff
      ) {
        console.log('THERE WAS COLLISION!');
        return true;
      }
    });
    console.log('No collision here');
    return false;
  }

  return (
    <div className="game-container">
      <h2 className="position-label">{`${position[0]}, ${position[1]}`}</h2>
      <div className="camera">
        {/* <Map position={position} />
         */}
        <div className="map-container">
          <motion.img
            className="map"
            src={mapImg}
            aria-label="map"
            animate={{
              y: -positionDiff[0] * step,
              x: -positionDiff[1] * step,
            }}
          />
          <MapGrid position={positionDiff} step={step} />
          <Object position={positionDiff} step={step} />
          <Boundary position={positionDiff} step={step} />
          <SpriteBox
            position={position}
            setPosition={setPosition}
            checkCollisions={checkCollisions}
          />
        </div>

        {/* <CameraGrid /> */}
      </div>
    </div>
  );
}

export default App;
