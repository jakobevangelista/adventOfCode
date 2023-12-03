import * as fs from "fs";

const file = fs
  .readFileSync("./2023/2.txt", { encoding: "utf-8", flag: "r" })
  .split("\n");

// console.log(file);

// split the file string by a colon and a space

const deeznuts = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];
let count = 0;
const parsed = file.map((a, i) => {
  //   let localCount = 0;

  const splitString = a.split(":");
  const secondSplit = splitString[1]?.split(";");
  let isValid = true;

  secondSplit?.forEach((element) => {
    let red = 12;
    let green = 13;
    let blue = 14;
    const splitColors = element.split(", ");
    splitColors.forEach((element) => {
      const colorCount = element.trim().split(" ");

      if (colorCount[1]!.includes("red")) {
        if (parseInt(colorCount[0]!) > red) {
          isValid = false;
        }
      }
      if (colorCount[1]!.includes("green")) {
        if (parseInt(colorCount[0]!) > green) {
          isValid = false;
        }
      }
      if (colorCount[1]!.includes("blue")) {
        if (parseInt(colorCount[0]!) > blue) {
          isValid = false;
        }
      }
    });
  });

  if (isValid) {
    count += i + 1;
  }

  return a;
});

console.log(count);
