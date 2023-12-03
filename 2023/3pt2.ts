import * as fs from "fs";

let file = fs
  .readFileSync("./2023/3.txt", { encoding: "utf-8", flag: "r" })
  .split("\n");

file = file.map((a) => "." + a + ".");
file.unshift(".".repeat(file[0]!.length));
file.push(".".repeat(file[0]!.length));

const arrayOfArrays = file.map((a) => a.split(""));
// console.log(arrayOfArrays);
let sum = 0;

function checkNeighbors(
  matrix: string[][],
  starrow: number,
  starcol: number,
  row: number,
  col: number
) {
  const neighbors: string[] = [];
  const numRows = matrix.length;
  const numCols = matrix[0]!.length;

  // Offsets for the eight neighboring cells
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1], // Above rows
    [0, -1],
    [0, 1], // Same row
    [1, -1],
    [1, 0],
    [1, 1], // Below rows
  ];
  let isvalid = false;

  directions.forEach(([dRow, dCol]) => {
    const newRow = row + dRow!;
    const newCol = col + dCol!;

    // Check if the new row and column are within the boundary of the matrix
    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
      neighbors.push(matrix[newRow]![newCol]!);
      if (
        newRow === starrow &&
        newCol === starcol &&
        matrix[newRow]![newCol] === "*"
      )
        isvalid = true;
    }
  });

  return isvalid;
}

function checkStar(
  matrix: string[][],

  starrow: number,
  starcol: number
) {
  const neighbors: string[] = [];
  const numRows = matrix.length;
  const numCols = matrix[0]!.length;

  // Offsets for the eight neighboring cells
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1], // Above rows
    [0, -1],
    [0, 1], // Same row
    [1, -1],
    [1, 0],
    [1, 1], // Below rows
  ];

  directions.forEach(([dRow, dCol]) => {
    const newRow = starrow + dRow!;
    const newCol = starcol + dCol!;

    // Check if the new row and column are within the boundary of the matrix
    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
      neighbors.push(matrix[newRow]![newCol]!);
    }
  });

  //   let surroundingNums = [];
  //   for (let i = 0; i < neighbors.length; ++i) {
  //     if (!isNaN(+neighbors[i]!)) surroundingNums.push(neighbors[i]!);
  //   }

  const newdirections = [-1, 0, 1];

  let surroundingNumbers: number[] = [];

  newdirections.forEach((targetRow) => {
    let currentNumber: string[] = [];

    for (let j = 0; j < matrix[starrow + targetRow]!.length; ++j) {
      if (!isNaN(+matrix[starrow + targetRow]![j]!)) {
        let dynamicj = j;
        currentNumber.push(matrix[starrow + targetRow]![j]!);
        if (
          checkNeighbors(
            arrayOfArrays,
            starrow,
            starcol,
            starrow + targetRow,
            j
          )
        ) {
          for (let m = 1; j + m <= matrix[starrow + targetRow]!.length; m++) {
            if (isNaN(+matrix[starrow + targetRow]![dynamicj + m]!)) break;
            if (!isNaN(+matrix[starrow + targetRow]![dynamicj + m]!)) {
              currentNumber.push(matrix[starrow + targetRow]![dynamicj + m]!);
              j++;
            }
          }
          console.log(currentNumber);

          if (currentNumber.length > 0) {
            let currentNumberString = currentNumber.join("");
            let currentNumberInt = parseInt(currentNumberString);
            surroundingNumbers.push(currentNumberInt);
          }
          currentNumber = [];
        }
      }
      if (matrix[starrow + targetRow]![j] === ".") currentNumber = [];
    }
  });

  if (surroundingNumbers.length === 2) {
    return surroundingNumbers[0]! * surroundingNumbers[1]!;
  }

  return 0;
}

for (let i = 0; i < arrayOfArrays.length; ++i) {
  for (let j = 0; j < arrayOfArrays[i]!.length; ++j) {
    if (arrayOfArrays[i]![j] === "*") {
      sum += checkStar(arrayOfArrays, i, j);
    }
  }
}
console.log(sum);
