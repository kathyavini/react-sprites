import { useState, useEffect, useRef } from 'react';
import './App.css';
import { FramerBox } from './components/FramerBox';
import { motion } from 'framer-motion';

interface MapProps {
  position: number[];
  setPosition: React.Dispatch<React.SetStateAction<number[]>>;
}
function Map({ position, setPosition }: MapProps) {
  return (
    <motion.div
      className="map"
      /* I don't know why the character doesn't stay centered! The values are opposite-identical!*/
      animate={{
        y: -position[1],
        x: -position[0],
      }}
    ></motion.div>
  );
}

function App() {
  const [position, setPosition] = useState([0, 0]);

  return (
    <div className="game-container">
      <div className="camera">
        <Map position={position} setPosition={setPosition} />
        <FramerBox position={position} setPosition={setPosition} />
      </div>
    </div>
  );
}

export default App;
