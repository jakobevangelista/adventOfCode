import * as fs from "fs";

// Function to convert spelled-out numbers to digits
function wordToDigit(word) {
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return words.indexOf(word);
}

// Function to find the first and last digit in a string
function findDigits(str) {
  const regex = /\b(zero|one|two|three|four|five|six|seven|eight|nine|\d)\b/g;
  const matches = [...str.matchAll(regex)];
  if (matches.length < 2) return null;

  let first = isNaN(matches[0][0])
    ? wordToDigit(matches[0][0])
    : parseInt(matches[0][0]);
  let last = isNaN(matches[matches.length - 1][0])
    ? wordToDigit(matches[matches.length - 1][0])
    : parseInt(matches[matches.length - 1][0]);

  return first * 10 + last;
}

// Read the file and process each line
fs.readFile("./adventOfCode/2023/1.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");
  let sum = 0;

  lines.forEach((line) => {
    const value = findDigits(line);
    if (value !== null) sum += value;
  });

  console.log(`The sum of all calibration values is: ${sum}`);
});
