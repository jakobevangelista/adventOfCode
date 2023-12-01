const file = Bun.file("./adventOfCode/2020/3/3.txt");

const stringFile = await file.text();

const parsed = stringFile.split("\n");

function deeznuts(right: number, down: number): number {
  let count = 0;

  let location = 0;

  for (let i = down; i < parsed.length; i += down) {
    // if (location === 28) {
    //   location = 0;
    // } else if (location === 29) {
    //   location = 1;
    // } else if (location === 30) {
    //   location = 2;
    // } else {
    //   location = location + 3;
    // }

    if (location + right >= 31) {
      location = right - (31 - location);
    } else {
      location = location + right;
    }

    if (parsed[i]![location] === "#") {
      count++;
    }
  }

  return count;
}
console.log(deeznuts(1, 1));
console.log(deeznuts(3, 1));
console.log(deeznuts(5, 1));
console.log(deeznuts(7, 1));
console.log(deeznuts(1, 2));
console.log(
  deeznuts(1, 1) *
    deeznuts(3, 1) *
    deeznuts(5, 1) *
    deeznuts(7, 1) *
    deeznuts(1, 2)
);
