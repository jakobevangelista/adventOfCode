import * as fs from "fs";

const file = fs
  .readFileSync("./2023/4.txt", { encoding: "utf-8", flag: "r" })
  .split("\n");

const occurenceCount: number[] = new Array<number>(file.length).fill(0);

const firstFunction = (line: string, rowindex: number) => {
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

  occurenceCount[rowindex]++;

  let lineSum = 0;
  yourNumbers.forEach((number) => {
    if (winningNumbers.includes(number)) {
      lineSum++;
    }
  });

  for (let i = 1; i <= lineSum; ++i) {
    firstFunction(file[rowindex + i]!, rowindex + i);
  }
};

file.forEach((line, index) => {
  firstFunction(line, index);
});

console.log(occurenceCount);

const ans = occurenceCount.reduce((a, b) => a + b, 0);

console.log(ans);
