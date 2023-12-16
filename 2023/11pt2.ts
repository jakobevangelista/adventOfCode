import * as fs from "fs";

let input = fs
  .readFileSync("./2023/11.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "")
  .map((line) => {
    return line.split("");
  });

let clearRows: number[] = [];

input.forEach((line, i) => {
  if (!line.find((x) => x === "#")) {
    clearRows.push(i);
  }
});

const transpose = (matrix: string[][]) => {
  return matrix[0]?.map((_, i) => matrix.map((row) => row[i]!));
};

const transposedInput = transpose(input);

let clearCols: number[] = [];

transposedInput!.forEach((line, i) => {
  if (!line.find((x) => x === "#")) {
    clearCols.push(i);
  }
});

input = transpose(transposedInput!)!;

const galaxyMap = new Map<number, number[]>();

let galaxyCounter = 0;

input.forEach((line, i) => {
  line.forEach((symbol, j) => {
    if (symbol === "#") {
      galaxyMap.set(galaxyCounter, [i, j]);
      galaxyCounter++;
    }
  });
});

let distancesBetweenGalaxies: number[] = [];

const multiplier = 1000000;

for (let i = 0; i < galaxyMap.size; ++i) {
  for (let j = i + 1; j < galaxyMap.size; ++j) {
    let colsCrossed = 0;
    let rowsCrossed = 0;
    let firstCol =
      galaxyMap.get(i)![1]! > galaxyMap.get(j)![1]!
        ? galaxyMap.get(i)![1]!
        : galaxyMap.get(j)![1]!;
    let secondCol =
      galaxyMap.get(i)![1]! > galaxyMap.get(j)![1]!
        ? galaxyMap.get(j)![1]!
        : galaxyMap.get(i)![1]!;
    let firstRow =
      galaxyMap.get(i)![0]! > galaxyMap.get(j)![0]!
        ? galaxyMap.get(i)![0]!
        : galaxyMap.get(j)![0]!;
    let secondRow =
      galaxyMap.get(i)![0]! > galaxyMap.get(j)![0]!
        ? galaxyMap.get(j)![0]!
        : galaxyMap.get(i)![0]!;
    let absCols = Math.abs(galaxyMap.get(i)![1]! - galaxyMap.get(j)![1]!);
    let absRows = Math.abs(galaxyMap.get(i)![0]! - galaxyMap.get(j)![0]!);

    clearCols.forEach((col) => {
      if (col > secondCol && col < firstCol) {
        colsCrossed += multiplier;
        absCols -= 1;
      }
    });

    clearRows.forEach((row) => {
      if (row > secondRow && row < firstRow) {
        rowsCrossed += multiplier;
        absRows -= 1;
      }
    });
    let totalCols = colsCrossed + absCols;

    let totalRows = rowsCrossed + absRows;

    distancesBetweenGalaxies.push(totalCols + totalRows);
  }
}

console.log(distancesBetweenGalaxies.reduce((a, b) => a + b, 0));
