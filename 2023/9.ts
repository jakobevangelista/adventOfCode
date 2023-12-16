import * as fs from "fs";

let input = fs
  .readFileSync("./2023/9example.txt", { encoding: "utf-8", flag: "r" })
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
        // console.log(x, currentArray[i - 1]);

        newArray.push(x - currentArray[i - 1]!);
      }
    });
    // console.log(newArray);
    currentArray = newArray;
  }

  storedHistory.set(line, tempHistory);
});

// console.log(storedHistory);

let nextNums: number[] = [];

storedHistory.forEach((value, key) => {
  for (let i = value.length - 2; i >= 0; --i) {
    value[i]!.push(
      value[i + 1]![value[i + 1]!.length - 1]! +
        value[i]![value[i]!.length - 1]!
    );
  }
  //   console.log(value);
  nextNums.push(value[0]![value[0]!.length - 1]!);
});

console.log(nextNums.reduce((a, b) => a + b, 0));
