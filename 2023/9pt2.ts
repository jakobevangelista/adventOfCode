import * as fs from "fs";

let input = fs
  .readFileSync("./2023/9.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "")
  .map((line) => {
    return line.split(" ").map((x) => parseInt(x));
  });

const allEqual0 = (array: number[]): boolean => {
  return array.every((v) => v === 0);
};

let storedHistory = new Map<number[], number[][]>();

input.forEach((line) => {
  let currentArray = line;
  let tempHistory: number[][] = [];

  while (!allEqual0(currentArray)) {
    let currentArrayCopy = [...currentArray];
    tempHistory.push(currentArrayCopy);
    let newArray: number[] = [];
    currentArray.forEach((x, i) => {
      if (i !== 0) {
        newArray.push(x - currentArray[i - 1]!);
      }
    });
    currentArray = newArray;
  }

  storedHistory.set(line, tempHistory);
});

let nextNums: number[] = [];

storedHistory.forEach((value) => {
  for (let i = value.length - 1; i >= 0; --i) {
    if (i === value.length - 1) {
      value[i]!.unshift(value[i]![value[i]!.length - 1]!);
    } else {
      value[i]!.unshift(value[i]![0]! - value[i + 1]![0]!);
    }
  }

  nextNums.push(value[0]![0]!);
});
console.log(nextNums);

console.log(nextNums.reduce((a, b) => a + b, 0));
