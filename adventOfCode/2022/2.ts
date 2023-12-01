import * as fs from "fs";

const words = fs
  .readFileSync("./adventOfCode/2022/2.txt", { encoding: "utf-8", flag: "r" })
  .split("\n");
console.log(words);
