const file = Bun.file("./adventOfCode/2020/2/2.txt");

const stringFile = await file.text();

const parsed = stringFile.split("\n");

const processed = parsed.map((element) => {
  return element.split(" ");
});

const determined = processed.map((element) => {
  let isValid = false;
  let count = 0;

  for (let i = 0; i < element[2]!.length; ++i) {
    if (element[2]![i] === element[1]![0]) {
      ++count;
    }
  }

  const range = element[0]?.split("-");

  if (count >= parseInt(range![0]!) && count <= parseInt(range![1]!)) {
    isValid = true;
  }

  return isValid;
});

let trueCount = 0;

const count = determined.forEach((element) => {
  if (element === true) {
    ++trueCount;
  }
});

console.log(trueCount);
