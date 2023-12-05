import * as fs from "fs";

const file = fs
  .readFileSync("./2023/5.txt", { encoding: "utf-8", flag: "r" })
  .split("\n\n");

const seeds = file[0]!.split(":")[1]!.trim().split(" ");
const numSeeds = seeds.map((seed) => {
  return parseInt(seed);
});

file.shift()!;

const ranges = file.map((line) => {
  let newLine = line.split("\n");
  newLine.shift();
  const numLine = newLine.map((line) => {
    return line.split(" ").map((num) => parseInt(num));
  });
  return numLine;
});

ranges.reverse();

let notEmpty = true;

let smallestLocation = 0;

while (notEmpty) {
  let smallestLocationIndex = -1;

  for (let i = 0; i < ranges[0]!.length; ++i) {
    if (ranges[0]![i]![0]! <= smallestLocation && ranges[0]![i]![2]! > 0) {
      smallestLocation = ranges[0]![i]![0]!;
      smallestLocationIndex = i;
    }
  }
  //   console.log("iteration: ", i, " smallestLocation: ", smallestLocation);
  let tempSmallest = smallestLocation;

  ranges.forEach((range) => {
    let tempDestination = smallestLocation;
    // console.log(i, smallestLocation);

    for (let j = 0; j < range!.length; ++j) {
      if (
        tempSmallest >= range[j]![0]! &&
        tempSmallest < range[j]![0]! + range[j]![2]!
      ) {
        // console.log("range: ", range[j]![i]!);
        // console.log("smallestLocation: ", tempSmallest);
        tempSmallest = range[j]![1]! + (tempSmallest - range[j]![0]!);
        break;
      }
    }

    if (tempDestination !== tempSmallest) {
      return;
    }
  });
  //   console.log("seed number: ", tempSmallest);

  for (let i = 0; i < numSeeds.length; i += 2) {
    if (
      tempSmallest >= numSeeds[i]! &&
      tempSmallest < numSeeds[i + 1]! + numSeeds[i]!
    ) {
      console.log(smallestLocation);
      notEmpty = false;
    }
  }

  smallestLocation++;

  if (smallestLocationIndex < 0) {
    continue;
  } else {
    ranges[0]![smallestLocationIndex]![0]!++;
    ranges[0]![smallestLocationIndex]![2]!--;
  }

  let allEqual = ranges[0]!.every((subArray) => subArray[2] === 0);
  if (allEqual) {
    notEmpty = false;
  }
}

// 3516801060 too high
// 377494819 too high
