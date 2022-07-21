import { boundaries } from '../gameConfig';

// Just for visualizing on the map; they will function whether or not they are visible due to importing the boundary array direction in SpriteBox
export function BoundaryVisualization() {
  const allBoundaryBlocks = boundaries.map((blockLocation, index) => (
    <BoundaryBlock
      locationY={blockLocation[0]}
      locationX={blockLocation[1]}
      key={index}
    />
  ));

  return <>{allBoundaryBlocks}</>;
}
// These need to be created programatically from the config file...
interface BoundaryBlockProps {
  locationY: number;
  locationX: number;
}
function BoundaryBlock({ locationY, locationX }: BoundaryBlockProps) {
  const gridSize = 8;
  const scaleFactor = 10;

  const locationStyle = {
    top: `${locationY * gridSize * scaleFactor}px`,
    left: `${locationX * gridSize * scaleFactor}px`,
  };

  return <div className="boundary" style={locationStyle}></div>;
}
