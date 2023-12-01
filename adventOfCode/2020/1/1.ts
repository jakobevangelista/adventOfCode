import * as fs from "fs";
// console.log(fs.statSync("./deeznuts.txt").isDirectory());
const readNumbers = fs
  .readFileSync("./adventOfCode/2020/1/1.txt", {
    encoding: "utf-8",
  })
  .toString()
  .split("\n");

// const bunRead = Bun.file("./adventOfCode/2020/1/1.txt");
// console.log("this is bun: ", bunRead);
console.log(Bun.version);
const numbers = readNumbers.map((a) => parseInt(a));

for (let i = 0; i < numbers.length - 2; ++i) {
  for (let j = i + 1; j < numbers.length - 1; ++j) {
    for (let k = j + 2; k < numbers.length; ++k) {
      let element1 = numbers[i];
      let element2 = numbers[j];
      let element3 = numbers[k];
      if (
        element1 === undefined ||
        element2 === undefined ||
        element3 === undefined
      )
        throw Error("No elements found");
      if (element1 + element2 + element3 === 2020) {
        console.log(element1 * element2 * element3);
      }
    }
  }
}
