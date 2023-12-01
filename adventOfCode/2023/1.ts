import { reverse } from "dns";
import * as fs from "fs";

const file = fs
  .readFileSync("./adventOfCode/2023/1.txt", { encoding: "utf-8", flag: "r" })
  .split("\n");

if (!file) throw Error("No file found");

const stringNumbers = new Map<string, number>([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

const deeznuts = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

const reverseString = (str: string) => {
  return str.split("").reverse().join("");
};
const parsed = file.map((a) => {
  let firstString = a;
  let length = a.length;
  let i = 0;
  let firstNumber = "";
  let secondNumber = "";

  while (i < length + 1) {
    let tempString = a.substring(0, i);

    stringNumbers.forEach((value, key) => {
      if (tempString.includes(key) || tempString.includes(value.toString())) {
        firstNumber = value.toString();
        firstString = firstString.replace(key, value.toString());
        i = length + 2;
      }
    });
    ++i;
  }

  let reverseString1 = reverseString(a);

  i = 0;
  length = reverseString1.length;
  while (i < length + 1) {
    let tempString = reverseString1.substring(0, i);

    stringNumbers.forEach((value, key) => {
      if (
        tempString.includes(reverseString(key)) ||
        tempString.includes(value.toString())
      ) {
        secondNumber = value.toString();
        firstString = firstString.replace(key, value.toString());
        i = length + 2;
      }
    });
    ++i;
  }

  const actualNum = firstNumber + secondNumber;
  console.log(actualNum);
  return parseInt(actualNum);

  //   const newString = a.replace(/\D/g, "");

  //   const realNum = newString[0] + newString[newString.length - 1]!;
  //   return parseInt(realNum);
});
console.log(parsed);
// sum all the parsed numbers
const sum = parsed.reduce((part, a) => part + a, 0);
console.log(sum);
