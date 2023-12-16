import * as fs from "fs";

let input = fs
  .readFileSync("./2023/11.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "")
  .map((line) => {
    return line.split("");
  });

const filledLines = new Map<number, string[]>();

input.forEach((line, i) => {
  if (!line.find((x) => x === "#")) {
    filledLines.set(i, line);
  }
});

let inputCount = 0;

filledLines.forEach((line, i) => {
  input.splice(i + inputCount, 0, Array(line.length).fill("."));
  inputCount++;
});

const transpose = (matrix: string[][]) => {
  return matrix[0]?.map((_, i) => matrix.map((row) => row[i]!));
};

const transposedInput = transpose(input);

const filledLines2 = new Map<number, string[]>();

transposedInput!.forEach((line, i) => {
  if (!line.find((x) => x === "#")) {
    filledLines2.set(i, line);
  }
});

inputCount = 0;

filledLines2.forEach((line, i) => {
  transposedInput!.splice(i + inputCount, 0, Array(line.length).fill("."));
  inputCount++;
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

for (let i = 0; i < galaxyMap.size; ++i) {
  for (let j = i + 1; j < galaxyMap.size; ++j) {
    distancesBetweenGalaxies.push(
      Math.abs(galaxyMap.get(i)![0]! - galaxyMap.get(j)![0]!) +
        Math.abs(galaxyMap.get(i)![1]! - galaxyMap.get(j)![1]!)
    );
  }
}

console.log(distancesBetweenGalaxies.reduce((a, b) => a + b, 0));

// input.forEach((line) => {
//   console.log(line);
// });
