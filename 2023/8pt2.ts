import * as fs from "fs";

let file = fs
  .readFileSync("./2023/8.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "");

const steps = file[0]?.split("");

file.shift();

let map = new Map<string, [string, string]>();

file.map((line, i) => {
  let [key, value] = line.trim().split("=");
  key = key?.trim();
  let realValue = value
    ?.replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll(",", "")
    .trim()
    .split(" ");

  map.set(key!, [realValue![0]!, realValue![1]!]);
});

let translationKey = new Map<string, number>();

let newKeyMap = new Map<string, string>();

map.forEach((value, key) => {
  if (translationKey.has(key[2]!)) {
    translationKey.set(key[2]!, translationKey.get(key[2]!)! + 1);

    newKeyMap.set(key, translationKey.get(key[2]!)! + key[2]!);
  } else {
    translationKey.set(key[2]!, 1);
    newKeyMap.set(key, translationKey.get(key[2]!)! + key[2]!);
  }
});

let translatedMap = new Map<string, [string, string]>();

map.forEach((value, key) => {
  translatedMap.set(newKeyMap.get(key)!, [
    newKeyMap.get(value![0]!)!,
    newKeyMap.get(value![1]!)!,
  ]);
});

const keysThatEndInA = [...translatedMap.keys()].filter((x) => x.endsWith("A"));
const keysThatEndInZ = [...translatedMap.keys()].filter((x) => x.endsWith("Z"));

let numberOFStepsPerPath: number[] = [];
// console.log(keysThatEndInZ);
// console.log(translatedMap);
// console.log(keysThatEndInA);
// console.log(steps);

// const allEqual = (array: string[]) => array.every((v) => v.endsWith("Z"));

// let count = 0;
// let pathCount = 0;

// while (!allEqual(keysThatEndInA)) {
//   //   console.log(keysThatEndInA);
//   keysThatEndInA.forEach((key, i) => {
//     let currentStep = key;
//     let [left, right] = translatedMap.get(currentStep)!;
//     if (steps![pathCount]! === "R") {
//       keysThatEndInA[i] = right;
//     } else {
//       keysThatEndInA[i] = left;
//     }
//   });
//   count++;

//   if (pathCount === steps!.length - 1) {
//     pathCount = 0;
//   } else {
//     pathCount++;
//   }
//   //   console.log(count);
// }

// console.log(count);

keysThatEndInA.forEach((key, i) => {
  //   if (i > 0) return;
  let currentStep = key;
  let count = 0;
  let pathCount = 0;

  while (!currentStep.endsWith("Z")) {
    let [left, right] = translatedMap.get(currentStep)!;
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
  numberOFStepsPerPath.push(count);
});

const primeFactorsMap = new Map<number, number[]>();

numberOFStepsPerPath.forEach((number) => {
  const ogNumber = number;
  let factors = [];
  let divisor = 2;

  while (number >= 2) {
    if (number % divisor === 0) {
      factors.push(divisor);
      console.log(divisor);
      console.log(number);
      number = number / divisor;
    } else {
      divisor++;
    }
  }

  primeFactorsMap.set(ogNumber, factors);
});

// console.log(primeFactorsMap);

const listOfRuns = [...primeFactorsMap.keys()].sort((a, b) => {
  return a - b;
});

let multiplier = 1;
let overallNumber = listOfRuns[5]!;

const areAllDivisble = (overallNumber: number, listOfRuns: number[]) => {
  let isAllDivisible = 0;

  listOfRuns.forEach((number) => {
    // console.log(overallNumber, number);
    // console.log("overallNumber % number = ", overallNumber % number);
    if (overallNumber % number === 0) {
      isAllDivisible++;
    }
  });

  if (isAllDivisible < 6) return false;
  console.log(overallNumber);
  return true;
};

while (!areAllDivisble(overallNumber, listOfRuns)) {
  multiplier++;
  overallNumber = listOfRuns[5]! * multiplier;
}
console.log(listOfRuns);
