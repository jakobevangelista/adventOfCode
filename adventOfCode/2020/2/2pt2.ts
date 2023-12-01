const file = Bun.file("./adventOfCode/2020/2/2.txt");

const stringFile = await file.text();

const parsed = stringFile.split("\n");

const processed = parsed.map((element) => {
  return element.split(" ");
});

const determined = processed.map((element) => {
  let isValid = false;

  const indexes = element[0]?.split("-");

  if (
    (element[2]?.charAt(parseInt(indexes![0]!) - 1)! === element![1]![0] ||
      element[2]?.charAt(parseInt(indexes![1]!) - 1)! === element![1]![0]) &&
    !(
      element[2]?.charAt(parseInt(indexes![0]!) - 1)! === element![1]![0] &&
      element[2]?.charAt(parseInt(indexes![1]!) - 1)! === element![1]![0]
    )
  ) {
    isValid = true;
  }

  return isValid;
});

let trueCount = 0;

determined.forEach((element) => {
  if (element === true) {
    ++trueCount;
  }
});

console.log(trueCount);
