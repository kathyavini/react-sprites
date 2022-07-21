// TD: pull rows and columns from the config
export function MapGrid() {
  const numRows = 16;
  const numCols = 40;
  const numBoxes = numRows * numCols;

  const gridArray = Array(numBoxes).fill(0);

  const overlayDivs = gridArray.map((box, index) => (
    <div className="map-grid-box" key={index}>
      <p>
        {Math.floor(index / numCols)}-{index % numCols}
      </p>
    </div>
  ));

  return <div className="map-grid">{overlayDivs}</div>;
}
