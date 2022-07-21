const mapRows = 16;
const mapColumns = 40;

// Boundaries are the set of ground tiles (the list of locations that should be blocked) while collisions are a "0" or "1" array for each grid element of the map.
export const boundaries = [
  [4, 10],
  [4, 11],
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
];

export let collisions = Array(mapRows)
  .fill(0)
  .map((x) => Array(mapColumns).fill(0));

boundaries.forEach((location) => {
  collisions[location[0]][location[1]] = 1;
});
