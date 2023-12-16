import * as fs from "fs";

// let input = fs
//   .readFileSync("./2023/14example.txt", { encoding: "utf-8", flag: "r" })
//   .split("\n")
//   .filter((x) => x !== "")
//   .map((line) => {
//     return line.split("");
//   });

let input = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

const transpose = (matrix: string[][]) => {
  return matrix[0]?.map((_, i) => matrix.map((row) => row[i]!));
};

const rotateClockwise = (matrix: number[][]) => {
  return matrix[0]!.map((_, index) =>
    matrix.map((row) => row[index]!).reverse()
  );
};

const rotated = rotateClockwise(input);

rotated.forEach((line) => {
  console.log(line);
});
