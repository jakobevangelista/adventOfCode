import * as fs from "fs";

const file = fs
  .readFileSync("./2023/5.txt", { encoding: "utf-8", flag: "r" })
  .split("\n\n");

const seeds = file[0]!.split(":")[1]!.trim().split(" ");
const numSeeds = seeds.map((seed) => {
  return parseInt(seed);
});

let lowest = Infinity;

file.shift()!;

const ranges = file.map((line) => {
  let newLine = line.split("\n");
  newLine.shift();
  const numLine = newLine.map((line) => {
    return line.split(" ").map((num) => parseInt(num));
  });
  return numLine;
});

for (let i = 0; i < numSeeds.length; i += 2) {
  for (let j = numSeeds[i]!; j < numSeeds[i]! + numSeeds[i + 1]!; ++j) {
    let destination = j;

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

    //   locations.push(destination);
    if (destination < lowest) {
      lowest = destination;
    }
  }
}
// parseSeeds.forEach((seed) => {

// });

// let lowest = Infinity;

// locations.forEach((location) => {
//   if (location < lowest) {
//     lowest = location;
//   }
// });
console.log(lowest);

// const array = [
//   127158107, 70478641, 1312864011, 239072070, 374323335, 56931769, 4225564962,
//   942540950, 1254705509, 197937586,
// ];

// let smallestNumber = Infinity;
// array.map((element) => {
//   if (element < smallestNumber) {
//     smallestNumber = element;
//   }
// });
// console.log(smallestNumber);

// 127158107
// 70478641
// 1312864011
// 239072070
// 374323335
// 56931769
// 4225564962
// 942540950
// 1254705509
// 197937586
