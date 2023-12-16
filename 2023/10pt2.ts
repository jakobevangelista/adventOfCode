import * as fs from "fs";
import { on } from "process";

let pt2Array: string[][] = [];
let countArray: number[][] = [];

let input = fs
  .readFileSync("./2023/10.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "")
  .map((line) => {
    let madeLine = line.split("");
    // madeLine.unshift("O");
    // madeLine.push("O");
    return madeLine;
  });

for (let i = 0; i < input.length; ++i) {
  pt2Array.push(new Array(input[i]!.length).fill(" "));
  countArray.push(new Array(input[i]!.length).fill(-10));
}
input.map((line, i) => {
  input[i]!.unshift("O");
  input[i]!.push("O");
  pt2Array[i]!.unshift("O");
  pt2Array[i]!.push("O");
  countArray[i]!.unshift(-10);
  countArray[i]!.push(-10);
});

const boundary = new Array(input[0]!.length).fill("O");
input.unshift(boundary);
input.push(boundary);
pt2Array.unshift(boundary);
pt2Array.push(boundary);

const boundary1 = new Array(input[0]!.length).fill(-10);
countArray.unshift(boundary1);
countArray.push(boundary1);

const directions = new Map([
  ["north", [-1, 0]],
  ["east", [0, 1]],
  ["south", [1, 0]],
  ["west", [0, -1]],
]);

const legend = new Map([
  ["|", [1, 0]],
  ["-", [0, 1]],
  ["L", [1, 1]],
  ["J", [1, -1]],
  ["7", [-1, -1]],
  ["F", [-1, 1]],
]);

const directionalLegend = new Map();

directionalLegend.set(
  "north",
  new Map([
    ["|", [1, 0, "north"]],
    ["7", [-1, -1, "west"]],
    ["F", [-1, 1, "east"]],
  ])
);

directionalLegend.set(
  "east",
  new Map([
    ["-", [0, 1, "east"]],
    ["J", [-1, 1, "north"]],
    ["7", [-1, -1, "south"]],
  ])
);

directionalLegend.set(
  "south",
  new Map([
    ["|", [-1, 0, "south"]],
    ["L", [1, 1, "east"]],
    ["J", [1, -1, "west"]],
  ])
);

directionalLegend.set(
  "west",
  new Map([
    ["-", [0, -1, "west"]],
    ["F", [1, -1, "south"]],
    ["L", [1, 1, "north"]],
  ])
);

const prevPlaceMap = new Map([
  ["north", "south"],
  ["east", "west"],
  ["south", "north"],
  ["west", "east"],
]);

let startingPoint = [0, 0];

for (let i = 0; i < input.length; ++i) {
  for (let j = 0; j < input[i]!.length; ++j) {
    if (input[i]![j] === "S") {
      startingPoint = [i, j];
      pt2Array[i]![j] = "S";
    }
  }
}

let currentPoint = [0, 0];

let nextPlace = "";

let firstPoint = [0, 0];

directions.forEach((value, key) => {
  let tempNext = [value[0]! + startingPoint[0]!, value[1]! + startingPoint[1]!];
  const directionMap = directionalLegend.get(key);
  if (directionMap.has(input[tempNext[0]!]![tempNext[1]!])) {
    currentPoint = tempNext;
    firstPoint = tempNext;
    countArray[currentPoint[0]!]![currentPoint[1]!]! = 1;

    pt2Array[tempNext[0]!]![tempNext[1]!]! =
      input[tempNext[0]!]![tempNext[1]!]!;
    nextPlace = directionMap.get(input[tempNext[0]!]![tempNext[1]!])[2];
    return;
  }
});

let count = 1;
let lastPoint = [0, 0];

while (input[currentPoint[0]!]![currentPoint[1]!] !== "S") {
  count++;
  currentPoint = [
    directions.get(nextPlace)![0]! + currentPoint[0]!,
    directions.get(nextPlace)![1]! + currentPoint[1]!,
  ];
  countArray[currentPoint[0]!]![currentPoint[1]!]! = count;
  pt2Array[currentPoint[0]!]![currentPoint[1]!]! =
    input[currentPoint[0]!]![currentPoint[1]!]!;
  if (input[currentPoint[0]!]![currentPoint[1]!] === "S") {
    break;
  }

  lastPoint = currentPoint;

  nextPlace = directionalLegend
    .get(nextPlace)
    .get(input[currentPoint[0]!]![currentPoint[1]!])![2];
}
console.log(count / 2);

let startingDirections: string[] = [];
if (firstPoint[0]! - lastPoint[0]! === -1) {
  startingDirections.push("south");
} else if (firstPoint[0]! - lastPoint[0]! === 1) {
  startingDirections.push("north");
}

if (firstPoint[1]! - lastPoint[1]! === -1) {
  startingDirections.push("east");
} else if (firstPoint[1]! - lastPoint[1]! === 1) {
  startingDirections.push("west");
}

if (startingDirections.length === 1) {
  startingDirections.push(startingDirections[0]!);
}

let startingSymbol = "";

directionalLegend
  .get(startingDirections[0]!)!
  .forEach((value: [number, number, string], key: string) => {
    if (value[2] === startingDirections[1]!) {
      startingSymbol = key;
    }
  });

pt2Array[startingPoint[0]!]![startingPoint[1]!] = startingSymbol;

pt2Array[0]![0] = "O";

const checkSides = (map: string[][], i: number, j: number) => {
  let borderingO = false;

  if (map[i]![j + 1] === "O" && map[i]![j + 1] !== undefined) borderingO = true;
  if (map[i]![j - 1] === "O" && map[i]![j - 1] !== undefined) borderingO = true;
  if (map[i + 1]![j] === "O" && map[i + 1]![j] !== undefined) borderingO = true;
  if (map[i - 1]![j] === "O" && map[i - 1]![j] !== undefined) borderingO = true;

  return borderingO;
};

pt2Array.forEach((line, i) => {
  //   console.log(line);
  line.forEach((symbol, j) => {
    if (symbol === " " && checkSides(pt2Array, i, j)) {
      pt2Array[i]![j] = "O";
    }
  });
});

for (let i = pt2Array.length - 1; i >= 0; --i) {
  for (let j = pt2Array[i]!.length - 1; j >= 0; --j) {
    if (pt2Array[i]![j] === " " && checkSides(pt2Array, i, j)) {
      pt2Array[i]![j] = "O";
    }
  }
}

let spaceCount = 0;
pt2Array.forEach((line, i) => {
  let onOrOff = false;
  if (i === pt2Array.length - 1) return;
  line.forEach((symbol, j) => {
    if (
      countArray[i]![j]! - countArray[i + 1]![j]! === 1 ||
      countArray[i]![j]! - countArray[i + 1]![j]! === -1
    ) {
      onOrOff = !onOrOff;
    }
    if (symbol === " " && onOrOff) {
      pt2Array[i]![j] = "X";
      spaceCount++;
    }
  });
});

console.log(spaceCount);
