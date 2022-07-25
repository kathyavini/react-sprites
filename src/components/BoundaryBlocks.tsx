import { boundaries, gameProperties } from '../gameConfig';
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
    top: `${
      locationY * gameProperties.gridSize * gameProperties.scaleFactor
    }px`,
    left: `${
      locationX * gameProperties.gridSize * gameProperties.scaleFactor
    }px`,
  };

  return <div className="boundary" style={locationStyle}></div>;
}
