import * as fs from "fs";

let input = fs
  .readFileSync("./2023/15.txt", { encoding: "utf-8", flag: "r" })
  .split(",")
  .filter((x) => x !== "");

let count = 0;
// input = ["pc-"];

type innerHashMapType = Map<string, number>;

type hashMapType = Map<number, innerHashMapType>;

const hashMap: hashMapType = new Map();

const testMap = new Map<string, number>();

input.forEach((x) => {
  let localCount = 0;
  if (x.includes("-")) {
    const code = x.split("-")[0]!;
    for (let i = 0; i < code.length; i++) {
      localCount += code.charCodeAt(i)!;
      localCount *= 17;
      localCount %= 256;
    }

    if (hashMap.has(localCount)) {
      if (hashMap.get(localCount)!.has(code)) {
        hashMap.get(localCount)!.delete(code);
      }
    }
  } else {
    const code = x.split("=");
    for (let i = 0; i < code[0]!.length; i++) {
      localCount += code[0]!.charCodeAt(i)!;
      localCount *= 17;
      localCount %= 256;
    }
    if (hashMap.has(localCount)) {
      hashMap.get(localCount)!.set(code[0]!, parseInt(code[1]!));
    } else {
      const localMap = new Map<string, number>();
      localMap.set(code[0]!, parseInt(code[1]!));
      hashMap.set(localCount, localMap);
    }
  }
});

hashMap.forEach((innerMap, i) => {
  let localCount = 1;
  innerMap.forEach((value) => {
    count += (i + 1) * localCount * value;
    localCount++;
  });
});

console.log(count);
