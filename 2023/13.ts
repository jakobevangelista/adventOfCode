import * as fs from "fs";

let input = fs
  .readFileSync("./2023/13example1.txt", { encoding: "utf-8", flag: "r" })
  .split("\n\n")
  .filter((x) => x !== "")
  .map((line) => {
    return line.split("\n").map((x) => {
      return x.split("");
    });
  });

const transpose = (matrix: string[][]) => {
  return matrix[0]?.map((_, i) => matrix.map((row) => row[i]!));
};

const checkArrayEqual = (array1: string[], array2: string[]) => {
  if (array1 === array2) return true;
  if (array1 == null || array2 == null) return false;
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; ++i) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
};

const checkBox = (
  box: string[][],
  firstIndex: number,
  lastIndex: number,
  checkIndex: number
): number => {
  //   console.log(firstIndex, lastIndex, checkIndex);
  //   console.log(box[firstIndex]);
  //   console.log(box[lastIndex]);
  if (firstIndex === 0 || lastIndex === box.length - 1) {
    if (checkArrayEqual(box[firstIndex]!, box[lastIndex]!)) {
      return checkIndex + 1;
    } else if (firstIndex === lastIndex - 1 && checkIndex === 0) {
      return checkBox(box, firstIndex + 1, lastIndex + 1, checkIndex + 1);
    } else if (firstIndex === 0 && checkIndex !== box.length - 1) {
      return checkBox(box, checkIndex + 1, checkIndex + 2, checkIndex + 1);
    } else {
      return 0;
    }
  }

  if (checkArrayEqual(box[firstIndex]!, box[lastIndex]!)) {
    // console.log("equal");
    return checkBox(box, firstIndex - 1, lastIndex + 1, checkIndex);
  } else {
    // console.log("not equal");
    if (firstIndex !== checkIndex) {
      //   console.log("made it to reset");
      return checkBox(box, checkIndex + 1, checkIndex + 2, checkIndex + 1);
    } else {
      return checkBox(box, firstIndex + 1, lastIndex + 1, checkIndex + 1);
    }
  }
};
let ans = 0;
input.forEach((box) => {
  let firstCheck = checkBox(box, 0, 1, 0);
  if (firstCheck === 0) {
    let transposedMatrix = transpose(box)!;
    let secondCheck = checkBox(transposedMatrix, 0, 1, 0);
    ans += secondCheck;
  } else {
    ans += firstCheck * 100;
  }
});
console.log(ans);

// 23713 too low
// 26967 too low
// 30575 right!
