import * as fs from "fs";

let input = fs
  .readFileSync("./2023/12.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "")
  .map((line) => {
    const lines = line.split(" ");
    const first = lines[0]!.split("");
    const second = lines[1]!.split(",")!.map((x) => {
      if (!isNaN(parseInt(x))) {
        return parseInt(x);
      }
    });
    return [first, second!]!;
  });

let count = 0;

// let permuations: string[][] = [];

const generatePermutations = (
  array: string[],
  index = 0,
  returnArray: string[][]
) => {
  if (index === array.length) {
    returnArray.push([...array]);
    return;
  }

  if (array[index] === "?") {
    array[index] = ".";
    generatePermutations(array, index + 1, returnArray);

    array[index] = "#";
    generatePermutations(array, index + 1, returnArray);

    array[index] = "?";
  } else {
    generatePermutations(array, index + 1, returnArray);
  }
};

input.forEach((line) => {
  let questionMarks: string[] = [];
  let questionMarkLocations: number[] = [];

  line[0]!.forEach((x, i) => {
    if (x === "?") {
      questionMarks.push("?");
      questionMarkLocations.push(i);
    }
  });

  let permuations: string[][] = [];
  generatePermutations(questionMarks, 0, permuations);

  let tempLines = permuations.map((permutation) => {
    let tempLine = [...line[0]!];
    questionMarkLocations.forEach((location, i) => {
      tempLine[location] = permutation[i]!;
    });
    return tempLine.join("");
  });

  tempLines.forEach((line1) => {
    const compareLine = line1.split(".").filter((x) => x !== "." && x !== "");

    let isValidLine = true;

    if (compareLine.length === line[1]!.length) {
      line[1]!.forEach((x, i) => {
        // console.log(x, compareLine[i], compareLine[i]!.length);
        if (x !== compareLine[i]!.length) {
          isValidLine = false;
        }
      });
    } else {
      isValidLine = false;
    }

    if (isValidLine) {
      count++;
    }
  });
  //   console.log(tempLines);
});

console.log(count);
