import * as fs from "fs";

const file = fs
  .readFileSync("./2023/3.txt", { encoding: "utf-8", flag: "r" })
  .split("\n");

const order = ["up", "upright", "rightdown", "down", "left"];
const arrayOfArrays = file.map((a) => a.split(""));

let sum = 0;

function checkNeighbors(matrix: string[][], row: number, col: number) {
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
    const newRow = row + dRow!;
    const newCol = col + dCol!;

    // Check if the new row and column are within the boundary of the matrix
    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
      neighbors.push(matrix[newRow]![newCol]!);
    }
  });
  let isvalid = false;

  neighbors.forEach((element) => {
    if (element !== "." && isNaN(+element)) isvalid = true;
  });

  return isvalid;
}

// can use bounding box for checking the surrounding elements if super stuck

for (let i = 0; i < arrayOfArrays.length; ++i) {
  let isValid = false;
  let currentNumber = [];

  for (let j = 0; j < arrayOfArrays[i]!.length; ++j) {
    if (!isNaN(+arrayOfArrays[i]![j]!)) {
      let dynamicj = j;
      currentNumber.push(arrayOfArrays[i]![j]!);
      if (checkNeighbors(arrayOfArrays, i, j)) {
        for (let m = 1; j + m <= arrayOfArrays[i]!.length; m++) {
          if (isNaN(+arrayOfArrays[i]![dynamicj + m]!)) break;
          if (!isNaN(+arrayOfArrays[i]![dynamicj + m]!)) {
            currentNumber.push(arrayOfArrays[i]![dynamicj + m]!);
            j++;
          }
        }
        console.log(currentNumber);

        if (currentNumber.length > 0) {
          let currentNumberString = currentNumber.join("");
          let currentNumberInt = parseInt(currentNumberString);
          sum += currentNumberInt;
        }
        currentNumber = [];
      }
    }
    if (arrayOfArrays[i]![j] === ".") currentNumber = [];
  }
}
console.log(sum);

//9356829 too high
//554003
