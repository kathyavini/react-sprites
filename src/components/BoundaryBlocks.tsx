import { boundaries, map } from '../gameConfig';
import '../styles/BoundaryBlocks.css';

// Just for visualizing on the map; they will function whether or not they are displayed so this is an optional component
export function BoundaryBlocks() {
  const allBoundaryBlocks = boundaries.map((blockLocation, index) => (
    <BoundaryBlock
      locationY={blockLocation[0]}
      locationX={blockLocation[1]}
      key={index}
    />
  ));

  return <>{allBoundaryBlocks}</>;
}

interface BoundaryBlockProps {
  locationY: number;
  locationX: number;
}
function BoundaryBlock({ locationY, locationX }: BoundaryBlockProps) {
  const locationStyle = {
    top: `${locationY * map.gridSize * map.scaleFactor}px`,
    left: `${locationX * map.gridSize * map.scaleFactor}px`,
  };

  return <div className="boundary" style={locationStyle}></div>;
}
