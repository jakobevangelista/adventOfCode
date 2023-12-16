import * as fs from "fs";

let input = fs
  .readFileSync("./2023/15.txt", { encoding: "utf-8", flag: "r" })
  .split(",")
  .filter((x) => x !== "");

let count = 0;

input.forEach((x) => {
  let localCount = 0;
  for (let i = 0; i < x.length; i++) {
    localCount += x.charCodeAt(i)!;
    localCount *= 17;
    localCount %= 256;
  }

  count += localCount;
});

console.log(count);
