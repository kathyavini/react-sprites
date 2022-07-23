/* ---------- CAMERA ---------- */
// Camera is the visible portion of the game map
export const camera = {
  rows: 8,
  columns: 8,

  // position of hero sprite relative to camera
  spriteOffsetX: 3,
  spriteOffsetY: 3,
};

/* --- CHARACTER SPRITES --- */
/* How your hero character animation spritesheets are laid out */
export const verticalSpriteSheets = true;

/* ---------- MAP ---------- */
export const map = {
  gridSize: 8,
  scaleFactor: 10,
  url: '/sam-pico-recreation.png',
  imgWidth: 320,
  imgHeight: 128,
  rows: 16,
  columns: 40,
  gravity: false,

  // initial location of hero sprite on map
  initialY: 8,
  initialX: 1,
};

/* Intial position of hero sprite */
export const initialY = 8;
export const initialX = 1;

/* --- MAP BOUNDARIES --- */
// Currently walls (edges of the map) are created programmatically, and boundaries/platforms are entered manually

// The last block on all sides cannot be entered and automatically become the map perimeter
let mapPerimeter = [];

for (let i = 0; i < map.rows; i++) {
  mapPerimeter.push([i, 0]);
  mapPerimeter.push([i, map.columns - 1]);
}

for (let j = 0; j < map.columns; j++) {
  mapPerimeter.push([0, j]);
  mapPerimeter.push([map.rows - 1, j]);
}

/* Boundaries are the set of boundary tiles (the list of locations that should be blocked or that form the ground) while collisions are a "0" or "1" array for each grid element of the map, with 1 indicting where a boundary occurs */
export const boundaries = [
  [8, 10],
  [7, 11],
  [7, 12],
  [7, 13],
  [6, 14],
  [5, 15],
  [5, 16],
  [5, 17],
  [5, 18],
  [5, 19],
  [6, 20],
  [6, 21],
  [7, 21],
  [8, 22],
  [9, 23],
  [9, 24],
  [9, 25],
  ...mapPerimeter,
];

export let collisions = Array(map.rows)
  .fill(0)
  .map((x) => Array(map.columns).fill(0));

boundaries.forEach((location) => {
  collisions[location[0]][location[1]] = 1;
});
