import * as fs from "fs";

let file = fs
  .readFileSync("./2023/7.txt", { encoding: "utf-8", flag: "r" })
  .split("\n");

type handTuple = [string, number];
let handList: handTuple[] = [];

file.map((line, i) => {
  return (handList[i] = [
    line
      .split(" ")[0]!
      .replaceAll("A", "B")
      .replaceAll("K", "C")
      .replaceAll("Q", "D")
      .replaceAll("T", "E")
      .replaceAll("9", "F")
      .replaceAll("8", "G")
      .replaceAll("7", "H")
      .replaceAll("6", "I")
      .replaceAll("5", "L")
      .replaceAll("4", "M")
      .replaceAll("3", "N")
      .replaceAll("2", "O")
      .replaceAll("J", "a"),
    parseInt(line.split(" ")[1]!),
  ]);
});

// pt 1 parse
// comment out all the part 2 stuff and uncomment this to work
// file.map((line, i) => {
//   return (handList[i] = [
//     line
//       .split(" ")[0]!
//       .replaceAll("A", "B")
//       .replaceAll("K", "C")
//       .replaceAll("Q", "D")
//       .replaceAll("T", "F")
//       .replaceAll("9", "G")
//       .replaceAll("8", "H")
//       .replaceAll("7", "I")
//       .replaceAll("6", "L")
//       .replaceAll("5", "M")
//       .replaceAll("4", "N")
//       .replaceAll("3", "O")
//       .replaceAll("2", "P")
//       .replaceAll("J", "E"),
//     parseInt(line.split(" ")[1]!),
//   ]);
// });

let distinguishedHands: [
  number,
  number,
  Map<string, number>,
  string,
  number
][] = [];

handList.forEach((handLine, i) => {
  const hand = handLine[0];

  const handType = new Map<string, number>();

  let keyWithBiggestValue = ["", 0];

  for (let i of hand) {
    if (handType.has(i)) {
      handType.set(i, handType.get(i)! + 1);
      if (handType.get(i)! > (keyWithBiggestValue[1] as number) && i !== "a") {
        keyWithBiggestValue = [i, handType.get(i)!];
      }
    } else {
      handType.set(i, 1);
      if (handType.get(i)! > (keyWithBiggestValue[1] as number) && i !== "a") {
        keyWithBiggestValue = [i, handType.get(i)!];
      }
    }
  }

  if (handType.has("a") && handType.size !== 1) {
    handType.set(
      keyWithBiggestValue[0] as string,
      (keyWithBiggestValue[1]! as number) + handType.get("a")!
    );

    handType.delete("a");
  }

  const sortedHand = new Map(
    [...handType.entries()].sort((a, b) => b[1] - a[1])
  );

  distinguishedHands.push([i, handType.size, sortedHand, hand, handLine[1]]);
});

distinguishedHands.sort(
  (a, b) => b[2].values().next().value - a[2].values().next().value
);

// everything above here sorts the hand by the biggest occurence of a card, aka biggest hand strength

let fiveOfAKind: [number, Map<string, number>, string, number][] = [];
let fourOfAKind: [number, Map<string, number>, string, number][] = [];
let threeOfAKind: [number, Map<string, number>, string, number][] = [];
let fullHouse: [number, Map<string, number>, string, number][] = [];
let twoPair: [number, Map<string, number>, string, number][] = [];
let onePair: [number, Map<string, number>, string, number][] = [];
let highCard: [number, Map<string, number>, string, number][] = [];

function mapHasValue(map: Map<string, number>, valueToFind: number) {
  let count = 0;
  for (let value of map.values()) {
    if (value === valueToFind) {
      count++;
    }
  }
  return count;
}

distinguishedHands.forEach((hand, i) => {
  if (mapHasValue(hand[2], 5) === 1) {
    return fiveOfAKind.push([hand[0], hand[2], hand[3], hand[4]]);
  } else if (mapHasValue(hand[2], 4) === 1) {
    return fourOfAKind.push([hand[0], hand[2], hand[3], hand[4]]);
  } else if (mapHasValue(hand[2], 3) === 1) {
    if (mapHasValue(hand[2], 2) === 1) {
      return fullHouse.push([hand[0], hand[2], hand[3], hand[4]]);
    } else {
      return threeOfAKind.push([hand[0], hand[2], hand[3], hand[4]]);
    }
  } else if (mapHasValue(hand[2], 2) === 2) {
    return twoPair.push([hand[0], hand[2], hand[3], hand[4]]);
  } else if (mapHasValue(hand[2], 2) === 1) {
    return onePair.push([hand[0], hand[2], hand[3], hand[4]]);
  } else {
    return highCard.push([hand[0], hand[2], hand[3], hand[4]]);
  }
});

fiveOfAKind.sort((a, b) => (b[2] > a[2] ? 1 : -1));
fourOfAKind.sort((a, b) => (b[2] > a[2] ? 1 : -1));
fullHouse.sort((a, b) => (b[2] > a[2] ? 1 : -1));
threeOfAKind.sort((a, b) => (b[2] > a[2] ? 1 : -1));
twoPair.sort((a, b) => (b[2] > a[2] ? 1 : -1));
onePair.sort((a, b) => (b[2] > a[2] ? 1 : -1));
highCard.sort((a, b) => (b[2] > a[2] ? 1 : -1));
const order: handTuple[] = [];

let realSum = 0;
let totalLength =
  fiveOfAKind.length +
  fourOfAKind.length +
  fullHouse.length +
  threeOfAKind.length +
  twoPair.length +
  onePair.length +
  highCard.length;
fiveOfAKind.toReversed().map((hand) => {
  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
});

fourOfAKind.toReversed().map((hand) => {
  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
});
fullHouse.toReversed().map((hand) => {
  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
});
threeOfAKind.toReversed().map((hand) => {
  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
});
twoPair.toReversed().map((hand) => {
  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
});
onePair.toReversed().map((hand) => {
  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
});
highCard.toReversed().map((hand) => {
  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
});

console.log(realSum);

// 249676038 wrong
// 249593028 wrong
// 250798180 wrong
// 250919978
// 250849577
// 250849577
// 250630396
// 250370104
