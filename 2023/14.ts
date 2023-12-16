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
    matrix.map((row) => row[row.length - 1 - index])
  );
};

const transposedInput = transpose(input)!;

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

let totalLoad = 0;

transposedInput.forEach((line, i) => {
  const movedBlocks = moveBlocksToStart(line);
  transposedInput[i] = movedBlocks;
  totalLoad += calculateLoad(transposedInput[i]!);
});

// transposedInput.forEach((line, i) => {
//   console.log(line);
// });

console.log(totalLoad);
