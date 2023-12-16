import * as fs from "fs";

let input = fs
  .readFileSync("./2023/12.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "")
  .map((line) => {
    const lines = line.split(" ");
    const first = lines[0]!
      .concat("?", lines[0]!, "?", lines[0]!, "?", lines[0]!, "?", lines[0]!)
      .split("");
    const second = lines[1]!
      .concat(",", lines[1]!, ",", lines[1]!, ",", lines[1]!, ",", lines[1]!)
      .split(",")!
      .map((x) => {
        if (!isNaN(parseInt(x))) {
          return parseInt(x);
        }
      });

    return [first, second!]!;
  });

let count = 0;

let DP = new Map<string, number>();

const recurseFunction = (
  ogLine: string[],
  arrangement: number[],
  geyserIndex: number,
  arrangementIndex: number,
  dmgCount: number
) => {
  let key =
    geyserIndex.toString() +
    "," +
    arrangementIndex.toString() +
    "," +
    dmgCount.toString();

  if (DP.has(key)) {
    return DP.get(key)!;
  }
  if (geyserIndex === ogLine.length) {
    if (arrangementIndex === arrangement.length && dmgCount === 0) {
      return 1;
    } else if (
      arrangementIndex === arrangement.length - 1 &&
      arrangement[arrangementIndex] === dmgCount
    ) {
      return 1;
    } else {
      return 0;
    }
  }

  let ans = 0;

  for (let c of ["#", "."]) {
    if (ogLine[geyserIndex] === c || ogLine[geyserIndex] === "?") {
      if (c === "." && dmgCount === 0) {
        ans += recurseFunction(
          ogLine,
          arrangement,
          geyserIndex + 1,
          arrangementIndex,
          0
        )!;
      } else if (
        c === "." &&
        dmgCount > 0 &&
        arrangementIndex < arrangement.length &&
        arrangement[arrangementIndex] === dmgCount
      ) {
        ans += recurseFunction(
          ogLine,
          arrangement,
          geyserIndex + 1,
          arrangementIndex + 1,
          0
        )!;
      } else if (c === "#") {
        ans += recurseFunction(
          ogLine,
          arrangement,
          geyserIndex + 1,
          arrangementIndex,
          dmgCount + 1
        )!;
      }
    }
  }
  DP.set(key, ans);
  return ans;
};

input.forEach((line) => {
  DP.clear();
  let currentScore = recurseFunction(
    line[0]! as string[],
    line[1]! as number[],
    0,
    0,
    0
  );
  count += currentScore;
});

console.log(count);
