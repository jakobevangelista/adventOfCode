import * as fs from "fs";

let file = fs
  .readFileSync("./2023/7.txt", { encoding: "utf-8", flag: "r" })
  .split("\n");

// file = file.map((line) => {
//   return [line[0]
//     .replaceAll("K", "B")
//     .replaceAll("Q", "C")
//     .replaceAll("J", "D")
//     .replaceAll("T", "E")
//     .replaceAll("9", "F")
//     .replaceAll("8", "G")
//     .replaceAll("7", "H")
//     .replaceAll("6", "I")
//     .replaceAll("5", "J")
//     .replaceAll("4", "K")
//     .replaceAll("3", "L")
//     .replaceAll("2", "M")];
// });

// file = file.replaceAll("K", "B");
// file = file.replaceAll("Q", "C");
// file = file.replaceAll("J", "D");
// file = file.replaceAll("T", "E");
// file = file.replaceAll("9", "F");
// file = file.replaceAll("8", "G");
// file = file.replaceAll("7", "H");
// file = file.replaceAll("6", "I");
// file = file.replaceAll("5", "J");
// file = file.replaceAll("4", "K");
// file = file.replaceAll("3", "L");
// file = file.replaceAll("2", "M");

// const handMap = new Map<string, number>();
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
    //   .replaceAll("K", "B")
    //   .replaceAll("Q", "C")
    //   .replaceAll("J", "0")
    //   .replaceAll("T", "E")
    //   .replaceAll("9", "F")
    //   .replaceAll("8", "G")
    //   .replaceAll("7", "H")
    //   .replaceAll("6", "I")
    //   .replaceAll("5", "L")
    //   .replaceAll("4", "M")
    //   .replaceAll("3", "N")
    //   .replaceAll("2", "O"),
    parseInt(line.split(" ")[1]!),
  ]);
});

let distinguishedHands: [
  number,
  number,
  Map<string, number>,
  string,
  number
][] = [];

handList.forEach((handLine, i) => {
  const hand = handLine[0];
  //   console.log(hand);

  const handType = new Map<string, number>();
  //   console.log(hand);

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
  if (handLine[1] === 793) {
    console.log(handType);
    console.log(keyWithBiggestValue);
  }

  if (handType.has("a") && handType.size !== 1) {
    // const keyWithBiggestValue = [...handType.entries()].reduce((a, e) =>
    //   e[1] > a[1] ? e : a
    // );
    // console.log(keyWithBiggestValue);
    handType.set(
      keyWithBiggestValue[0] as string,
      (keyWithBiggestValue[1]! as number) + handType.get("a")!
    );

    handType.delete("a");
  }
  if (handLine[1] === 793) {
    console.log(handType);
  }

  //   console.log(handType);

  //   handType.set(keyWithBiggestValue[0], keyWithBiggestValue[1] + jCount);

  //   console.log([...handType.entries()].reduce((a, e) => (e[1] > a[1] ? e : a)));

  const sortedHand = new Map(
    [...handType.entries()].sort((a, b) => b[1] - a[1])
  );

  // distinguishedHands.push([i, handType.size, sortedHand, hand]);
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
    // console.log("five of a kind", hand[2]);
    return fiveOfAKind.push([hand[0], hand[2], hand[3], hand[4]]);
  } else if (mapHasValue(hand[2], 4) === 1) {
    // console.log("four of a kind", hand[2]);

    return fourOfAKind.push([hand[0], hand[2], hand[3], hand[4]]);
  } else if (mapHasValue(hand[2], 3) === 1) {
    if (mapHasValue(hand[2], 2) === 1) {
      //   console.log("full house", hand[2]);
      return fullHouse.push([hand[0], hand[2], hand[3], hand[4]]);
    } else {
      //   console.log("three of a kind", hand[2]);
      return threeOfAKind.push([hand[0], hand[2], hand[3], hand[4]]);
    }
  } else if (mapHasValue(hand[2], 2) === 2) {
    // console.log("two pair", hand[2]);
    return twoPair.push([hand[0], hand[2], hand[3], hand[4]]);
  } else if (mapHasValue(hand[2], 2) === 1) {
    // console.log("one pair", hand[2]);
    return onePair.push([hand[0], hand[2], hand[3], hand[4]]);
  } else {
    // console.log("high card", hand[2]);
    return highCard.push([hand[0], hand[2], hand[3], hand[4]]);
  }
});

// console.log(onePair);

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
console.log(totalLength);
fiveOfAKind.toReversed().map((hand) => {
  console.log(handList[hand[0]]![1], "*", totalLength, handList[hand[0]]!);
  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
  //   return order.push(handList[hand[0]]!); //181376
});

fourOfAKind.toReversed().map((hand) => {
  console.log(handList[hand[0]]![1], "*", totalLength, [
    handList[hand[0]]![0].replaceAll("B", "A")
      .replaceAll("C", "K")
      .replaceAll("D", "Q")
      .replaceAll("E", "T")
      .replaceAll("F", "9")
      .replaceAll("G", "8")
      .replaceAll("H", "7")
      .replaceAll("I", "6")
      .replaceAll("L", "5")
      .replaceAll("M", "4")
      .replaceAll("N", "3")
      .replaceAll("O", "2")
      .replaceAll("a", "J"),
    handList[hand[0]]![1],
  ]);

  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
  //   return order.push(handList[hand[0]]!);
});
fullHouse.toReversed().map((hand) => {
  console.log(handList[hand[0]]![1], "*", totalLength, handList[hand[0]]!);

  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
  //   return order.push(handList[hand[0]]!);
});
threeOfAKind.toReversed().map((hand) => {
  console.log(handList[hand[0]]![1], "*", totalLength, handList[hand[0]]!);

  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
  //   return order.push(handList[hand[0]]!);
});
twoPair.toReversed().map((hand) => {
  console.log(handList[hand[0]]![1], "*", totalLength, handList[hand[0]]!);

  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
  //   return order.push(handList[hand[0]]!);
});
onePair.toReversed().map((hand) => {
  console.log(handList[hand[0]]![1], "*", totalLength, handList[hand[0]]!);

  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
  //   return order.push(handList[hand[0]]!);
});
highCard.toReversed().map((hand) => {
  //   console.log(hand);
  console.log(handList[hand[0]]![1], "*", totalLength, [
    handList[hand[0]]![0].replaceAll("B", "A")
      .replaceAll("C", "K")
      .replaceAll("D", "Q")
      .replaceAll("E", "T")
      .replaceAll("F", "9")
      .replaceAll("G", "8")
      .replaceAll("H", "7")
      .replaceAll("I", "6")
      .replaceAll("L", "5")
      .replaceAll("M", "4")
      .replaceAll("N", "3")
      .replaceAll("O", "2")
      .replaceAll("a", "J"),
    handList[hand[0]]![1],
  ]);

  realSum += handList[hand[0]]![1] * totalLength;
  --totalLength;
  //   return order.push(handList[hand[0]]!);
});

console.log(realSum);

// let index = order.length - 1;

// for (let i = 0; i < order.length; ++i) {
//   //   console.log(order[i]![1], "*", i + 1);
//   //   if (i <= 10) {
//   console.log(order[i]![1], "*", i + 1, "=", order[i]![1] * (index + 1), [
//     order[i]![0]
// .replaceAll("B", "A")
//       .replaceAll("C", "K")
//       .replaceAll("D", "Q")
//       .replaceAll("E", "T")
//       .replaceAll("F", "9")
//       .replaceAll("G", "8")
//       .replaceAll("H", "7")
//       .replaceAll("I", "6")
//       .replaceAll("L", "5")
//       .replaceAll("M", "4")
//       .replaceAll("N", "3")
//       .replaceAll("O", "2")
//       .replaceAll("a", "J"),
//     order[i]![1],
//   ]);
//   //   }

//   sum += order[i]![1] * (index + 1);
//   --index;
// }

// console.log(sum);
// console.log("five of a kind: ", fiveOfAKind);

// 249676038 wrong
// 249593028 wrong
// 250798180 wrong
// 250919978
// 250849577
// 250849577
// 250630396
// 250370104
