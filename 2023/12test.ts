type myTuple = [number, number, number];

let DP = new Map<[number, number, number], number>();

let newTuple: myTuple = [1, 2, 3];

DP.set(newTuple, 5);
DP.set(newTuple, 6);
let testTuple: myTuple = [1, 2, 3];

console.log(DP.get(testTuple));
