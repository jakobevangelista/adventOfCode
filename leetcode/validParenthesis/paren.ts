interface stringHashMap {
  [key: string]: string;
}

function isValid(s: string): boolean {
  const keys: stringHashMap = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (let i = 0; i < s.length; i++) {
    if (keys[s.charAt(s.length - 1)] === s.charAt(s.length - 2)) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}
