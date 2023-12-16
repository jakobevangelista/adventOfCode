import * as fs from "fs";

let input = fs
  .readFileSync("./2023/16.txt", { encoding: "utf-8", flag: "r" })
  .split("\n")
  .filter((x) => x !== "")
  .map((x) => {
    let returnString = x.split("");
    returnString = returnString.map((x) => {
      if (x === "\\") {
        return ")";
      } else {
        return x;
      }
    });
    return returnString;
  });

let rayArray: string[][] = new Array(input.length);

for (let i = 0; i < rayArray.length; i++) {
  rayArray[i] = new Array(input[0]!.length).fill(".");
}

let ogRayArray: string[][] = structuredClone(rayArray);

type rayObject = {
  location: [number, number];
  direction: string;
};

const directionMap = new Map<string, number[]>([
  ["up", [-1, 0]],
  ["down", [1, 0]],
  ["left", [0, -1]],
  ["right", [0, 1]],
]);

const splitterMap = new Map<string, string>();

let rayList = new Array<rayObject>();

const findRayPath = (ray: rayObject) => {
  let currentLocation = ray!.location;

  let currentDirection = ray!.direction;
  if (
    currentLocation[0] < 0 ||
    currentLocation[1] < 0 ||
    currentLocation[0] > input.length - 1 ||
    currentLocation[1] > input[0]!.length - 1
  ) {
    rayList.shift();
    return;
  }
  let currentSymbol = input[currentLocation[0]!]![currentLocation[1]];
  rayArray[currentLocation[0]!]![currentLocation[1]]! = "#";
  if (
    currentSymbol === "|" &&
    (currentDirection === "right" || currentDirection === "left")
  ) {
    if (!splitterMap.has(currentLocation.toString())) {
      rayList.push({
        location: [
          currentLocation[0]! + directionMap.get("up")![0]!,
          currentLocation[1]! + directionMap.get("up")![1]!,
        ],
        direction: "up",
      });
      rayList.push({
        location: [
          currentLocation[0]! + directionMap.get("down")![0]!,
          currentLocation[1]! + directionMap.get("down")![1]!,
        ],
        direction: "down",
      });
      rayList.shift();
      splitterMap.set(currentLocation.toString(), currentDirection);
      return;
    } else {
      rayList.shift();
      return;
    }
  }

  if (
    currentSymbol === "-" &&
    (currentDirection === "down" || currentDirection === "up")
  ) {
    if (!splitterMap.has(currentLocation.toString())) {
      rayList.push({
        location: [
          currentLocation[0]! + directionMap.get("left")![0]!,
          currentLocation[1]! + directionMap.get("left")![1]!,
        ],
        direction: "left",
      });
      rayList.push({
        location: [
          currentLocation[0]! + directionMap.get("right")![0]!,
          currentLocation[1]! + directionMap.get("right")![1]!,
        ],
        direction: "right",
      });
      rayList.shift();
      splitterMap.set(currentLocation.toString(), currentDirection);
      return;
    } else {
      rayList.shift();
      return;
    }
  }

  if (
    ((currentLocation[0] === input.length - 1 && currentDirection === "down") ||
      (currentLocation[1] === input[0]!.length - 1 &&
        currentDirection === "right") ||
      (currentLocation[0] === 0 && currentDirection === "up") ||
      (currentLocation[1] === 0 && currentDirection === "left")) &&
    currentSymbol !== ")" &&
    currentSymbol !== "/"
  ) {
    rayList.shift();
    return;
  }

  if (
    currentSymbol === "." ||
    (currentSymbol === "-" &&
      (currentDirection === "left" || currentDirection === "right")) ||
    (currentSymbol === "|" &&
      (currentDirection === "up" || currentDirection === "down"))
  ) {
    let nextRay: rayObject = {
      location: [
        currentLocation[0]! + directionMap.get(currentDirection)![0]!,
        currentLocation[1]! + directionMap.get(currentDirection)![1]!,
      ],
      direction: currentDirection,
    };

    rayList.push(nextRay);
    rayList.shift();

    return;
  } else if (currentSymbol === "/") {
    if (currentDirection === "down") {
      let nextRay: rayObject = {
        location: [
          currentLocation[0]! + directionMap.get("left")![0]!,
          currentLocation[1]! + directionMap.get("left")![1]!,
        ],
        direction: "left",
      };

      rayList.push(nextRay);
      rayList.shift();

      return;
    } else if (currentDirection === "up") {
      let nextRay: rayObject = {
        location: [
          currentLocation[0]! + directionMap.get("right")![0]!,
          currentLocation[1]! + directionMap.get("right")![1]!,
        ],
        direction: "right",
      };

      rayList.push(nextRay);
      rayList.shift();

      return;
    } else if (currentDirection === "left") {
      let nextRay: rayObject = {
        location: [
          currentLocation[0]! + directionMap.get("down")![0]!,
          currentLocation[1]! + directionMap.get("down")![1]!,
        ],
        direction: "down",
      };

      rayList.push(nextRay);
      rayList.shift();

      return;
    } else if (currentDirection === "right") {
      let nextRay: rayObject = {
        location: [
          currentLocation[0]! + directionMap.get("up")![0]!,
          currentLocation[1]! + directionMap.get("up")![1]!,
        ],
        direction: "up",
      };

      rayList.push(nextRay);
      rayList.shift();

      return;
    }
  } else if (currentSymbol === ")") {
    if (currentDirection === "up") {
      let nextRay: rayObject = {
        location: [
          currentLocation[0]! + directionMap.get("left")![0]!,
          currentLocation[1]! + directionMap.get("left")![1]!,
        ],
        direction: "left",
      };

      rayList.push(nextRay);
      rayList.shift();

      return;
    } else if (currentDirection === "down") {
      let nextRay: rayObject = {
        location: [
          currentLocation[0]! + directionMap.get("right")![0]!,
          currentLocation[1]! + directionMap.get("right")![1]!,
        ],
        direction: "right",
      };

      rayList.push(nextRay);
      rayList.shift();

      return;
    } else if (currentDirection === "left") {
      let nextRay: rayObject = {
        location: [
          currentLocation[0]! + directionMap.get("up")![0]!,
          currentLocation[1]! + directionMap.get("up")![1]!,
        ],
        direction: "up",
      };

      rayList.push(nextRay);
      rayList.shift();

      return;
    } else if (currentDirection === "right") {
      let nextRay: rayObject = {
        location: [
          currentLocation[0]! + directionMap.get("down")![0]!,
          currentLocation[1]! + directionMap.get("down")![1]!,
        ],
        direction: "down",
      };
      rayList.push(nextRay);
      rayList.shift();

      return;
    }
  }
};

// pt 1 is the next paragraph

// rayList.push({
//   location: [0, 0],
//   direction: "right",
// });
// while (rayList.length > 0) {
//   findRayPath(rayList[0]!);
// }
// let count = 0;
// rayArray.forEach((x) => {
//   x.forEach((y) => {
//     if (y === "#") {
//       count++;
//     }
//   });
// });
// console.log(count);

// splitterMap.clear();

let biggestCount = 0;

for (let i = 0; i < input[0]!.length; i++) {
  rayList.push({
    location: [0, i],
    direction: "down",
  });

  while (rayList.length > 0) {
    findRayPath(rayList[0]!);
  }

  let count = 0;

  rayArray.forEach((x) => {
    x.forEach((y) => {
      if (y === "#") {
        count++;
      }
    });
  });
  //   if (i === 3) {
  //     console.log(count);

  //     rayArray.forEach((x) => {
  //       console.log(x.join(""));
  //     });
  //   }
  if (count > biggestCount) {
    biggestCount = count;
  }

  rayArray = structuredClone(ogRayArray);

  rayList = [];
  splitterMap.clear();
}
console.log(biggestCount);

for (let i = 0; i < input[input.length - 1]!.length; i++) {
  rayList.push({
    location: [input.length - 1, i],
    direction: "up",
  });
  while (rayList.length > 0) {
    findRayPath(rayList[0]!);
  }

  let count = 0;

  rayArray.forEach((x) => {
    x.forEach((y) => {
      if (y === "#") {
        count++;
      }
    });
  });
  if (count > biggestCount) {
    biggestCount = count;
  }
  rayArray = structuredClone(ogRayArray);

  rayList = [];
  splitterMap.clear();
}
console.log(biggestCount);

for (let i = 0; i < input.length; i++) {
  rayList.push({
    location: [i, 0],
    direction: "right",
  });
  //   console.log(rayList);
  while (rayList.length > 0) {
    findRayPath(rayList[0]!);
  }

  let count = 0;
  //   rayArray.forEach((x) => {
  //     console.log(x.join(""));
  //   });

  rayArray.forEach((x) => {
    x.forEach((y) => {
      if (y === "#") {
        count++;
      }
    });
  });
  if (count > biggestCount) {
    biggestCount = count;
  }
  rayArray = structuredClone(ogRayArray);

  rayList = [];
  //   console.log(count);
  splitterMap.clear();
}
console.log(biggestCount);

for (let i = 0; i < input.length; i++) {
  rayList.push({
    location: [i, input[i]!.length - 1],
    direction: "left",
  });
  while (rayList.length > 0) {
    findRayPath(rayList[0]!);
  }

  let count = 0;

  rayArray.forEach((x) => {
    x.forEach((y) => {
      if (y === "#") {
        count++;
      }
    });
  });
  //   if (i === 3) {
  //   console.log(count);

  //   rayArray.forEach((x) => {
  //     console.log(x.join(""));
  //   });
  //   }

  if (count > biggestCount) {
    biggestCount = count;
  }
  rayList = [];
  splitterMap.clear();
  rayArray = structuredClone(ogRayArray);
}
console.log(biggestCount);

// 8703 too high
