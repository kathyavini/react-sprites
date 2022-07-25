import { gameProperties } from '../gameConfig';
import '../styles/MapGrid.css';

export function MapGrid() {
  const numBoxes = gameProperties.rows * gameProperties.columns;

  const gridArray = Array(numBoxes).fill(0);

  const overlayDivs = gridArray.map((box, index) => (
    <div className="map-grid-box" key={index}>
      <p>
        {Math.floor(index / gameProperties.columns)}-
        {index % gameProperties.columns}
      </p>
    </div>
  ));

  return <div className="map-grid">{overlayDivs}</div>;
}
