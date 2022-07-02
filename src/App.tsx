import { useState, useEffect, useRef } from 'react';
import './App.css';
import { FramerBox } from './components/FramerBox';
import { motion } from 'framer-motion';

function App() {
  const [position, setPosition] = useState([0, 0]);

  return (
    <motion.div className="app">
      <div className="camera">
        <motion.div
          className="background"
          animate={{
            y: -position[1],
            x: -position[0],
          }}
        >
          <FramerBox position={position} setPosition={setPosition} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default App;
