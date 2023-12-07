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
      .replaceAll("K", "B")
      .replaceAll("Q", "C")
      .replaceAll("J", "D")
      .replaceAll("T", "E")
      .replaceAll("9", "F")
      .replaceAll("8", "G")
      .replaceAll("7", "H")
      .replaceAll("6", "I")
      .replaceAll("5", "L")
      .replaceAll("4", "M")
      .replaceAll("3", "N")
      .replaceAll("2", "O"),
    parseInt(line.split(" ")[1]!),
  ]);
});

let distinguishedHands: [number, number, Map<string, number>, string][] = [];

handList.forEach((handLine, i) => {
  const hand = handLine[0];
  //   console.log(hand);

  const handType = new Map<string, number>();
  //   console.log(hand);

  for (let i of hand) {
    if (handType.has(i)) {
      handType.set(i, handType.get(i)! + 1);
    } else {
      handType.set(i, 1);
    }
  }

  const sortedHand = new Map(
    [...handType.entries()].sort((a, b) => b[1] - a[1])
  );

  // distinguishedHands.push([i, handType.size, sortedHand, hand]);
  distinguishedHands.push([i, handType.size, sortedHand, hand]);
});

distinguishedHands.sort(
  (a, b) => b[2].values().next().value - a[2].values().next().value
);

// everything above here sorts the hand by the biggest occurence of a card, aka biggest hand strength

// let sortedByIndividualHand = new Map<
//   number,
//   [number, number, Map<string, number>, string][]
// >();

// distinguishedHands.forEach((hand) => {
//   if (!sortedByIndividualHand.has(hand[2].values().next().value)) {
//     sortedByIndividualHand.set(hand[2].values().next().value, []);
//   }
//   let arrayOfMaps = sortedByIndividualHand.get(hand[2].values().next().value)!;

//   arrayOfMaps.push(hand);

//   sortedByIndividualHand.set(hand[2].values().next().value, arrayOfMaps);
// });

let sortedByIndividualHand = new Map<
  number,
  Map<number, [number, number, Map<string, number>, string][]>
>();

distinguishedHands.forEach((hand) => {
  if (!sortedByIndividualHand.has(hand[2].values().next().value)) {
    sortedByIndividualHand.set(
      hand[2].values().next().value,
      new Map<number, [number, number, Map<string, number>, string][]>()
    );
  }

  if (
    !sortedByIndividualHand
      .get(hand[2].values().next().value)!
      .has(hand[2].size)
  ) {
    sortedByIndividualHand
      .get(hand[2].values().next().value)!
      .set(hand[2].size, []);
  }

  let innerMap = sortedByIndividualHand.get(hand[2].values().next().value)!;

  innerMap.get(hand[2].size)!.push(hand);

  // innerMap.get(hand[2].size)!.sort((a, b) => (a[3] > b[3] ? 1 : -1));

  // let arrayOfMaps = sortedByIndividualHand.get(hand[2].values().next().value)!;

  // arrayOfMaps.push(hand);

  sortedByIndividualHand.set(hand[2].values().next().value, innerMap);
});

// console.log(sortedByIndividualHand);

// everything above here sorts the biggest hands by the number of leftover cards in the hand

// console.log(sortedByIndividualHand);

let finalMap = new Map(
  [...sortedByIndividualHand.entries()].sort(
    (a, b) => b[1].keys().next().value - a[1].keys().next().value
  )
);

function sortInnerMap(
  innerMap: Map<number, [number, number, Map<string, number>, string][]>
) {
  // Convert the map to an array of [key, value] pairs, sort them, and then reconstruct the map
  return new Map([...innerMap.entries()].sort((a, b) => a[0] - b[0]));
}

finalMap.forEach((hand, key) => {
  hand.forEach((hand1, key1) => {
    hand1.sort((a, b) => (a[3]! < b[3]! ? 1 : -1));
    hand.set(key1, hand1);
  });

  if (key === 3) {
    finalMap.set(key, sortInnerMap(hand));
  } else {
    finalMap.set(key, hand);
  }
});

// let tempMap = finalMap.get(3)!.get(3)!;
// finalMap.get(3)?.set(3, finalMap.get(3)!.get(2)!);
// finalMap.get(3)?.set(2, tempMap);

// console.log(finalMap);

// console.log(finalMap);

// console.log(sortedByIndividualHand);

// sortedByIndividualHand.forEach((hand, key) => {
//   for (let i = 0; i < hand.length - 1; ++i) {
//     if (
//       hand[i]![2].values().next().value ===
//         hand[i + 1]![2].values().next().value &&
//       hand[i]![2].size === hand[i + 1]![2].size &&
//       hand[i]![3] > hand[i + 1]![3]
//     ) {
//       let temp = hand[i]!;
//       hand[i]! = hand[i + 1]!;
//       hand[i + 1]! = temp;
//     }
//   }

//   sortedByIndividualHand.set(key, hand);
// });

const sortedHandsByStrength: handTuple[] = [];

console.log(finalMap);

finalMap.forEach((hand, key) => {
  console.log(typeof hand);

  const tempHand = new Map(Array.from(hand).reverse());

  if (key === 3) {
    tempHand.forEach((hand1) => {
      hand1.forEach((hand2) => {
        sortedHandsByStrength.push(handList[hand2[0]]!);
      });
    });
  } else {
    hand.forEach((hand1) => {
      hand1.forEach((hand2) => {
        sortedHandsByStrength.push(handList[hand2[0]]!);
      });
    });
  }
});

console.log(sortedHandsByStrength);

let answer = 0;

let index = 1;

for (let i = sortedHandsByStrength.length - 1; i >= 0; --i) {
  if (i <= 10) {
    console.log(
      sortedHandsByStrength[i]![1],
      "*",
      i + 1,
      "=",
      sortedHandsByStrength[i]![1] * (i + 1),
      [
        sortedHandsByStrength[i]![0].replaceAll("B", "K")
          .replaceAll("C", "Q")
          .replaceAll("D", "J")
          .replaceAll("E", "T")
          .replaceAll("F", "9")
          .replaceAll("G", "8")
          .replaceAll("H", "7")
          .replaceAll("I", "6")
          .replaceAll("L", "5")
          .replaceAll("M", "4")
          .replaceAll("N", "3")
          .replaceAll("O", "2"),
        sortedHandsByStrength[i]![1],
      ]
    );
  }
  answer += sortedHandsByStrength[i]![1] * (i + 1);
  ++index;
}

console.log(answer);

// 249676038 wrong
// 249593028 wrong
// 250798180 wrong
// 250919978
// 250849577

//99Q2J 128
//9984t 90
