import * as fs from "fs";

const file = fs.readFileSync("./2023/7.txt", { encoding: "utf-8", flag: "r" });
// .split("\n");
console.log(file.replaceAll("K", "B"));
console.log(file.replaceAll("Q", "C"));
console.log(file.replaceAll("J", "D"));
console.log(file.replaceAll("T", "E"));

file.split("\n");

console.log(file.split("\n"));
