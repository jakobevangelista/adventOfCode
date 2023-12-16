import * as fs from "fs";

let input = fs
  .readFileSync("./2023/13.txt", { encoding: "utf-8", flag: "r" })
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
  checkIndex: number,
  oldMatch?: number
): number => {
  if (firstIndex === 0 || lastIndex === box.length - 1) {
    if (checkArrayEqual(box[firstIndex]!, box[lastIndex]!)) {
      if (oldMatch === checkIndex + 1) {
        if (oldMatch === box.length - 1) {
          return 0;
        } else {
          return checkBox(
            box,
            checkIndex + 1,
            checkIndex + 2,
            checkIndex + 1,
            oldMatch
          );
        }
      }
      return checkIndex + 1;
    } else if (firstIndex === lastIndex - 1 && checkIndex === 0) {
      return checkBox(
        box,
        firstIndex + 1,
        lastIndex + 1,
        checkIndex + 1,
        oldMatch
      );
    } else if (firstIndex === 0 && checkIndex !== box.length - 1) {
      return checkBox(
        box,
        checkIndex + 1,
        checkIndex + 2,
        checkIndex + 1,
        oldMatch
      );
    } else {
      return 0;
    }
  }

  if (checkArrayEqual(box[firstIndex]!, box[lastIndex]!)) {
    return checkBox(box, firstIndex - 1, lastIndex + 1, checkIndex, oldMatch);
  } else {
    if (firstIndex !== checkIndex) {
      return checkBox(
        box,
        checkIndex + 1,
        checkIndex + 2,
        checkIndex + 1,
        oldMatch
      );
    } else {
      return checkBox(
        box,
        firstIndex + 1,
        lastIndex + 1,
        checkIndex + 1,
        oldMatch
      );
    }
  }
};
let ans = 0;
input.forEach((box, i) => {
  let firstCheck = checkBox(box, 0, 1, 0);
  //   console.log(firstCheck);
  let secondCheck = checkBox(transpose(box)!, 0, 1, 0);
  //   console.log(secondCheck);
  let number: number = 0;
  //   if (i === 8) {
  //     box.forEach((line) => {
  //       console.log(line.join(""));
  //     });
  //   }

  outerloop: for (let i = 0; i < box.length; ++i) {
    innerloop: for (let j = 0; j < box[i]!.length; ++j) {
      let tempBox = [...box];

      if (tempBox[i]![j] === "#") {
        tempBox[i]![j] = ".";
        // console.log(tempBox[i]![j]);
        // console.log(firstCheck, secondCheck);

        number = checkBox(tempBox, 0, 1, 0, firstCheck);
        // console.log(number);
        if (number !== 0 && number !== firstCheck) {
          number = number * 100;

          break outerloop;
        } else {
          number = checkBox(transpose(tempBox)!, 0, 1, 0, secondCheck);
          if (number !== 0 && number !== secondCheck) {
            break outerloop;
          } else {
            tempBox[i]![j] = "#";
          }
        }
      } else {
        tempBox[i]![j] = "#";

        number = checkBox(tempBox, 0, 1, 0, firstCheck);
        // if (i === 9 && j >= 4) {
        //   tempBox.forEach((line) => {
        //     console.log(line.join(""));
        //   });
        //   console.log(number);

        //   break outerloop;
        // }

        if (number !== 0 && number !== firstCheck) {
          number = number * 100;

          break outerloop;
        } else {
          number = checkBox(transpose(tempBox)!, 0, 1, 0, secondCheck);
          if (number !== 0 && number !== secondCheck) {
            break outerloop;
          } else {
            tempBox[i]![j] = ".";
          }
        }
      }
    }
  }
  //   console.log(number);
  ans += number;
});
console.log(ans);

// 29088 too low
