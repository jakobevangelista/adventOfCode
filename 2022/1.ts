import * as fs from "fs";
// console.log(fs.statSync("./deeznuts.txt").isDirectory());
const words = fs
  .readFileSync("./adventOfCode/2022/1.txt", { encoding: "utf-8", flag: "r" })
  .split("\n\n");

if (!words) throw Error("No words found");

const calories = words.map((row) => {
  const section = row!.split("\n");
  const intArray = section.map((a) => parseInt(a));
  const sum = intArray.reduce((part, a) => part + a, 0);
  return sum;
});

const first = Math.max(...calories);
calories.splice(calories.indexOf(Math.max(...calories)), 1);
const second = Math.max(...calories);
calories.splice(calories.indexOf(Math.max(...calories)), 1);
const third = Math.max(...calories);

console.log("calories of highest elf: " + first);
console.log("calories of second highest: " + second);
console.log("calories of third highest: " + third);
console.log("total calories: " + (first + second + third));
