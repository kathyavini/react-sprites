import { motion } from 'framer-motion';
import { MapGrid } from './MapGrid';
import { BoundaryBlocks } from './BoundaryBlocks';
import { map } from '../gameConfig';
import '../styles/Map.css';

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
      <motion.img className="map" src={map.url} aria-label="map" />
      <MapGrid />
      <Object />
      <BoundaryBlocks />
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
