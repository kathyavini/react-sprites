import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapGrid } from './MapGrid';
import mapImg from '../assets/sam-pico-recreation.png';
import { BoundaryVisualization } from './BoundaryVisualization';

type MapProps = {
  positionDiff: number[];
  step: number;
};

export const Map = ({ positionDiff, step }: MapProps) => {
  return (
    <motion.div
      className="map-container"
      animate={{
        y: -positionDiff[0] * step,
        x: -positionDiff[1] * step,
      }}
    >
      <motion.img className="map" src={mapImg} aria-label="map" />
      <MapGrid />
      <Object />
      <BoundaryVisualization />
    </motion.div>
  );
};

function Object() {
  return (
    <motion.div className="object-box">
      <div className="object-sprite"></div>
    </motion.div>
  );
}
