import * as fs from "fs";

let input = fs
  .readFileSync("./2023/14.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "")
  .map((line) => {
    return line.split("");
  });

const transpose = (matrix: string[][]) => {
  return matrix[0]?.map((_, i) => matrix.map((row) => row[i]!));
};

const rotateClockwise = (matrix: string[][]) => {
  return matrix[0]!.map((_, index) =>
    matrix.map((row) => row[index]!).reverse()
  );
};

const validmovePostion = (line: string[], i: number) => {
  let validPosition = i;
  loop: for (let j = i - 1; j >= 0; j--) {
    if (line[j] === "O" || line[j] === "#") {
      validPosition = j + 1;
      break loop;
    } else if (j === 0) {
      validPosition = 0;
    }
  }
  return validPosition;
};

const moveBlocksToStart = (input: string[]): string[] => {
  input.forEach((symbol, i) => {
    if (symbol === "O") {
      const movePostion = validmovePostion(input, i)!;

      let temp = input[i]!;
      input[i] = input[movePostion]!;
      input[movePostion] = temp;
    }
  });
  return input;
};

const calculateLoad = (line: string[]): number => {
  let localLoad = 0;
  let load = line.length;

  loop: for (let i = 0; i < line.length; i++) {
    if (line[i] === "O") {
      localLoad += load;
    }

    load--;
  }
  return localLoad;
};

let input2 = fs
  .readFileSync("./2023/14example.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "")
  .map((line) => {
    return line.split("");
  });

let totalLoad = 0;
let transposedInput = input2;
let testTransposedInput = input;

const DP = new Map<string, string[][]>();
const DPtest = new Map<string, number>();
let time = 0;
// console.log(transposedInput.toString());
let numCycles = 100000;
// correct numCycles is 118
console.log((1000000000 - 104) % 14);
outerloop: for (let i = 0; i < 104; ++i) {
  if (DPtest.has(testTransposedInput.toString())) {
    console.log(DPtest.get(testTransposedInput.toString())!);
    console.log(DPtest.size!);
    break outerloop;
  } else {
    let originalInput = testTransposedInput;
    innerloop: for (let j = 0; j < 4; ++j) {
      testTransposedInput = transpose(testTransposedInput)!;
      testTransposedInput = testTransposedInput!.map((line, i) => {
        const movedBlocks = moveBlocksToStart(line)!;
        return movedBlocks!;
      });

      testTransposedInput = transpose(testTransposedInput)!;
      testTransposedInput = rotateClockwise(testTransposedInput)!;
      //   console.log("-----------------");
      //   testTransposedInput.forEach((line, i) => {
      //     console.log(line);
      //   });
    }
    DP.set(originalInput.toString(), testTransposedInput);
    DPtest.set(originalInput.toString(), time!);
    time++;
  }
  //   console.log(i);
}

testTransposedInput = transpose(testTransposedInput)!;
testTransposedInput!.forEach((line, i) => {
  totalLoad += calculateLoad(testTransposedInput![i]!);
});
console.log("real input load", totalLoad);

// 94253 too low
// 96486 too high
