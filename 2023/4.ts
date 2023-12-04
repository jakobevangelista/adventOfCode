import * as fs from "fs";

const file = fs
  .readFileSync("./2023/4.txt", { encoding: "utf-8", flag: "r" })
  .split("\n");

let sum = 0;

file.forEach((line, rowindex) => {
  const lineSplit = line.split(":");
  const allNumbers = lineSplit[1]!.split("|");
  const winningNumbers = allNumbers[0]!
    .trim()
    .split(" ")
    .filter((a) => a !== "");
  const yourNumbers = allNumbers[1]!
    .trim()
    .split(" ")
    .filter((a) => a !== "");

  let lineSum = 0;

  yourNumbers.forEach((number) => {
    if (winningNumbers.includes(number)) {
      if (lineSum === 0) {
        lineSum = 1;
      } else {
        lineSum *= 2;
      }
    }
  });
  console.log("lineSum: ", lineSum);

  sum += lineSum;
});

console.log(sum);

//126642 wrong
