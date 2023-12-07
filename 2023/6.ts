import * as fs from "fs";

const file = fs
  .readFileSync("./2023/6.txt", { encoding: "utf-8", flag: "r" })
  .split("\n");

const splits = file.map((line) => {
  return line.split(":")[1]!.split(" ");
});

const parsed = splits.map((split) => {
  return split.filter((a) => a !== "");
});

// console.log(parsed);

const intParse: number[][] = [];

parsed.forEach((split) => {
  let totalSquish = "";

  split.forEach((a) => {
    totalSquish += a;
  });

  intParse.push([parseInt(totalSquish)]);
});

console.log(intParse);

// this block of comment is part 1
// console.log(newArray);
// const intParse = parsed.map((split) => {
//   return split.map((a) => parseInt(a));
// });

// console.log(intParse);

let numWinningRaces: number[] = [];

const doesItBeatRecord = (
  record: number,
  timePressed: number,
  totalTime: number
): boolean => {
  const distanceTraveled = (totalTime - timePressed) * timePressed;

  if (distanceTraveled > record) {
    return true;
  }

  return false;
};

for (let i = 0; i < intParse[0]!.length; ++i) {
  const record = intParse[1]![i]!;
  const totalTime = intParse[0]![i]!;

  const winningRaces: number[] = [];

  for (let j = 1; j <= intParse[0]![i]!; ++j) {
    if (doesItBeatRecord(record, j, totalTime)) {
      winningRaces.push(j);
    }
  }

  numWinningRaces.push(winningRaces.length);
}

console.log(numWinningRaces.reduce((a, b) => a * b, 1));
