// Some of these properties are redundant with the map object below, but since they are needed directly by the JS I wanted to keep them as non-string values. They will be converted into strings for map

export const gameProperties = {
  /*--- Pico ---*/
  mapImg: '/sam-pico-recreation.png',
  rows: 16,
  columns: 40,

  gridSize: 8,
  scaleFactor: 10,

  // initial location of hero sprite on map
  initialY: 8,
  initialX: 1,

  gravity: false,
};

// map, camera, and hero objects are iterated over to create CSS properties so everything has to be a string
/* ---------- MAP ---------- */
export const map = {
  /*--- Pico  ---*/
  imgWidth: '320px',
  imgHeight: '128px',

  gridSize: `${gameProperties.gridSize}px`,
  scaleFactor: `${gameProperties.scaleFactor}`,

  rows: `${gameProperties.rows}`,
  columns: `${gameProperties.columns}`,

  initialY: `${gameProperties.initialY}`,
  initialX: `${gameProperties.initialX}`,
};

/* ---------- CAMERA ---------- */
// Camera is the visible portion of the game map
export const camera = {
  rows: '8',
  columns: '8',

  // position of hero sprite relative to camera
  spriteOffsetX: '3',
  spriteOffsetY: '3',
};

/* --- CHARACTER SPRITES --- */

/* How your hero character animation spritesheets are laid out */
export const verticalSpriteSheets = true;

export const hero = {
  /*--- Pico (no animation) ---*/
  // base: 'url(/sam-pico-ghost.png)',
  // width: '8px',
  // height: '8px',
  // scale: '1'

  /*----- Autumn Town ----*/
  // base: 'url(/PlayerIdle_Night.png)',
  // width: '32px',
  // height: '32px',
  // scale: '.25',

  // speed: '1s',

  // idle: 'url(/PlayerIdle_Night.png)',
  // idleSteps: '10',
  // idleEnd: '320px',

  // run: 'url(/PlayerWalk_Night.png)',
  // runSteps: '10',
  // runEnd: '320px',

  // jump: 'url(/PlayerJump_Night.png)',
  // jumpSteps: '5',
  // jumpEnd: '160px',

  /*----- Blue Witch ----*/
  // Don't forget to change sprite sheet orientation for this character!

  base: 'url(/B_witch_idle.png)',
  width: '32px',
  height: '48px',
  scale: '.25',

  idle: 'url(/B_witch_idle.png)',
  idleSteps: '6',
  idleEnd: '288px',

  run: 'url(/B_witch_run.png)',
  runSteps: '8',
  runEnd: '384px',

  jump: 'url(/B_witch_charge.png)',
  jumpWidth: '48px',
  jumpSteps: '5',
  jumpEnd: '240px',
};

/* --- MAP BOUNDARIES --- */
// Currently walls (edges of the map) are created programmatically, and boundaries/platforms are entered manually

// The last block on all sides cannot be entered and automatically become the map perimeter
let mapPerimeter = [];

for (let i = 0; i < gameProperties.rows; i++) {
  mapPerimeter.push([i, 0]);
  mapPerimeter.push([i, gameProperties.columns - 1]);
}

for (let j = 0; j < gameProperties.columns; j++) {
  mapPerimeter.push([0, j]);
  mapPerimeter.push([gameProperties.rows - 1, j]);
}

/* Boundaries are the set of boundary tiles (the list of locations that should be blocked or that form the ground) Collisions are a "0" or "1" array for each grid element of the map generated from the list of boundary tiles */
export const boundaries = [
  /*--- Pico ---*/
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

export let collisions = Array(gameProperties.rows)
  .fill(0)
  .map((x) => Array(gameProperties.columns).fill(0));

boundaries.forEach((location) => {
  collisions[location[0]][location[1]] = 1;
});
