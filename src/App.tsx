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
        {(index % numCols) + 1}-{Math.floor(index / numCols) + 1}
      </p>
    </div>
  ));

  return <div className="overlay-grid">{overlayDivs}</div>;
}

interface MapGridProps {
  position: number[];
}

function MapGrid({ position }: MapGridProps) {
  const numRows = 40;
  const numCols = 16;
  const numBoxes = numRows * numCols;

  const gridArray = Array(numBoxes).fill(0);

  const overlayDivs = gridArray.map((box, index) => (
    <div className="map-box" key={index}>
      <p>
        {(index % numCols) + 1}-{Math.floor(index / numCols) + 1}
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
        </div>

        {/* <CameraGrid /> */}
        <SpriteBox position={position} setPosition={setPosition} />
      </div>
    </div>
  );
}

export default App;
