import * as fs from "fs";

let input = fs
  .readFileSync("./2023/10.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "")
  .map((line) => {
    let madeLine = line.split("");
    madeLine.unshift(".");
    madeLine.push(".");
    return madeLine;
  });

const boundary = new Array(input[0]!.length).fill(".");
input.unshift(boundary);
input.push(boundary);

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
    }
  }
}

let currentPoint = [0, 0];

let nextPlace = "";

directions.forEach((value, key) => {
  let tempNext = [value[0]! + startingPoint[0]!, value[1]! + startingPoint[1]!];
  const directionMap = directionalLegend.get(key);
  if (directionMap.has(input[tempNext[0]!]![tempNext[1]!])) {
    currentPoint = tempNext;
    nextPlace = directionMap.get(input[tempNext[0]!]![tempNext[1]!])[2];
    return;
  }
});

let count = 1;

while (input[currentPoint[0]!]![currentPoint[1]!] !== "S") {
  count++;
  currentPoint = [
    directions.get(nextPlace)![0]! + currentPoint[0]!,
    directions.get(nextPlace)![1]! + currentPoint[1]!,
  ];
  if (input[currentPoint[0]!]![currentPoint[1]!] === "S") {
    break;
  }
  console.log(
    input[currentPoint[0]!]![currentPoint[1]!],
    directionalLegend
      .get(nextPlace)
      .get(input[currentPoint[0]!]![currentPoint[1]!])![2]
  );

  nextPlace = directionalLegend
    .get(nextPlace)
    .get(input[currentPoint[0]!]![currentPoint[1]!])![2];
}

console.log(count / 2);
