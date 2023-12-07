import * as fs from "fs";

const file = fs
  .readFileSync("./2023/5.txt", { encoding: "utf-8", flag: "r" })
  .split("\n\n");

const seeds = file[0]!.split(":")[1]!.trim().split(" ");
const numSeeds = seeds.map((seed) => {
  return parseInt(seed);
});

const locations: number[] = [];

file.shift()!;

const ranges = file.map((line) => {
  let newLine = line.split("\n");
  newLine.shift();
  const numLine = newLine.map((line) => {
    return line.split(" ").map((num) => parseInt(num));
  });
  return numLine;
});

numSeeds.forEach((seed) => {
  let destination = seed;

  ranges.forEach((range) => {
    let tempDestination = destination;

    for (let j = 0; j < range!.length; ++j) {
      if (
        destination >= range[j]![1]! &&
        destination < range[j]![1]! + range[j]![2]!
      ) {
        destination = range[j]![0]! + (destination - range[j]![1]!);
        break;
      }
    }

    if (tempDestination !== destination) {
      return;
    }
  });

  locations.push(destination);
});

let lowest = Infinity;

locations.forEach((location) => {
  if (location < lowest) {
    lowest = location;
  }
});
console.log(lowest);
