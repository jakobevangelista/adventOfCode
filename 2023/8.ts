import * as fs from "fs";

let file = fs
  .readFileSync("./2023/8.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "");

const steps = file[0]?.split("");

file.shift();

let map = new Map<string, [string, string]>();
// type mapType = {
//   [key: string]: [string, string];
// };

// let map: mapType = {};

file.map((line, i) => {
  let [key, value] = line.trim().split("=");
  key = key?.trim();
  let realValue = value
    ?.replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll(",", "")
    .trim()
    .split(" ");
  //   console.log(key, realValue);
  map.set(key!, [realValue![0]!, realValue![1]!]);
});

// console.log(map);
// console.log(map.get("BBB"));

let currentStep = "AAA";

let count = 0;

let pathCount = 0;

while (currentStep !== "ZZZ") {
  let [left, right] = map.get(currentStep)!;

  if (steps![pathCount]! === "R") {
    currentStep = right;
  } else {
    currentStep = left;
  }
  count++;
  if (pathCount === steps!.length - 1) {
    pathCount = 0;
  } else {
    pathCount++;
  }
}

console.log(count);

// 11 wrong
