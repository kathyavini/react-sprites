import React from 'react';
import { motion } from 'framer-motion';

type MapProps = {
  position: number[];
};

export const Map = ({ position }: MapProps) => {
  return (
    <motion.div
      aria-label="boo"
      className="map"
      animate={{
        y: -position[1],
        x: -position[0],
      }}
    ></motion.div>
  );
};
