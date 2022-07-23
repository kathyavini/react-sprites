// Ideally these would generate the corresponding CSS variables as well. Right now they have to be manually entered with the same values

/* How your animation spritesheets are laid out -- sets all animations of Sprite component */
export const verticalSpriteSheets = false;

export const map = {
  gridSize: 8,
  scaleFactor: 10,
  url: '/sam-pico-recreation.png',
  rows: 16,
  columns: 40,
  gravity: false,
};

/* Intial position of hero sprite */
export const initialY = 8;
export const initialX = 1;

// MAP BOUNDARIES
/* Currently walls are created programmatically boundaries/platforms are entered manually */

/* The last block on all sides cannot be entered */
let mapWalls = [];

for (let i = 0; i < map.rows; i++) {
  mapWalls.push([i, 0]);
  mapWalls.push([i, map.columns - 1]);
}

for (let j = 0; j < map.columns; j++) {
  mapWalls.push([0, j]);
  mapWalls.push([map.rows - 1, j]);
}

/* Boundaries are the set of ground tiles (the list of locations that should be blocked) while collisions are a "0" or "1" array for each grid element of the map. */
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
  ...mapWalls,
];

export let collisions = Array(map.rows)
  .fill(0)
  .map((x) => Array(map.columns).fill(0));

boundaries.forEach((location) => {
  collisions[location[0]][location[1]] = 1;
});
