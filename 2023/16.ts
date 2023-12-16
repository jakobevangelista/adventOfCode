import { test } from "bun:test";
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
rayList.push({
  location: [0, 0],
  direction: "right",
});

const findRayPath = (ray: rayObject) => {
  let currentLocation = ray!.location;
  //   console.log(currentLocation);

  let currentDirection = ray!.direction;
  if (currentLocation[0] < 0 || currentLocation[1] < 0) {
    rayList.shift();
    return;
  }
  let currentSymbol = input[currentLocation[0]!]![currentLocation[1]];
  rayArray[currentLocation[0]!]![currentLocation[1]]! = "#";
  //   rayArray.forEach((x) => {
  //     console.log(x.join(""));
  //   });

  if (
    currentSymbol === "|" &&
    (currentDirection === "right" || currentDirection === "left")
  ) {
    // console.log("we made first");
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
    // console.log("at the edge and falling off");
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
    // findRayPath(nextRay);
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
      //   findRayPath(nextRay);
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
      //   findRayPath(nextRay);
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
      //   findRayPath(nextRay);
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
      //   findRayPath(nextRay);
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
      //   findRayPath(nextRay);
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
      //   findRayPath(nextRay);
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
      //   findRayPath(nextRay);
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

      //   findRayPath(nextRay);
    }
  }
};
let testCount = 0;

// input.forEach((x) => {
//   console.log(x.join(""));
// });

while (rayList.length > 0) {
  //   if (testCount === 40) {
  //     console.log("before function: ", rayList);
  //     findRayPath(rayList[0]!);
  //     console.log("after function: ", rayList);
  //     rayArray.forEach((x) => {
  //       console.log(x.join(""));
  //     });
  //     console.log("--------------------");
  //     break;
  //   } else {
  findRayPath(rayList[0]!);
  //     testCount++;
  //   }
}

let count = 0;

rayArray.forEach((x) => {
  x.forEach((y) => {
    if (y === "#") {
      count++;
    }
  });
});

console.log(count);
