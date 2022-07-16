import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import { SpriteBox } from './components/SpriteBox';
import { Map } from './components/Map';
import mapImg from './assets/sam-pico-recreation.png';

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
}

function MapGrid({ position }: MapGridProps) {
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
        y: -position[1],
        x: -position[0],
      }}
    >
      {overlayDivs}
    </motion.div>
  );
}

function Object({ position }: MapGridProps) {
  return (
    <motion.div
      className="object-box"
      animate={{
        y: -position[1],
        x: -position[0],
      }}
    >
      <div className="object-sprite"></div>
    </motion.div>
  );
}

function App() {
  const [position, setPosition] = useState([0, 0]);

  return (
    <div className="game-container">
      <div className="camera">
        {/* <Map position={position} />
         */}
        <div className="map-container">
          <motion.img
            className="map"
            src={mapImg}
            aria-label="map"
            animate={{
              y: -position[1],
              x: -position[0],
            }}
          />
          <MapGrid position={position} />
          <Object position={position} />
        </div>

        {/* <CameraGrid /> */}
        <SpriteBox position={position} setPosition={setPosition} />
      </div>
    </div>
  );
}

export default App;
