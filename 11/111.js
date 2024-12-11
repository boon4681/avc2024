const fs = require("fs");

const file = fs.readFileSync("./input.txt", "utf8");
const data = file.trim().split(" ").map(Number);

let map = new Map();

for (const num of data) {
    map.set(num, 1);
}

for (let i = 1; i <= 75; i++) {
    const n = new Map();

    for (let [stone, count] of map) {
        if (stone === 0) {
            n.set(1, (n.get(1) || 0) + count);
        } else if (stone.toString().length % 2 === 0) {
            const name = stone.toString();
            const mid = name.length / 2;
            const left = Number(name.slice(0, mid));
            const right = Number(name.slice(mid));

            n.set(left, (n.get(left) || 0) + count);
            n.set(right, (n.get(right) || 0) + count);
        } else {
            const result = stone * 2024;
            n.set(result, (n.get(result) || 0) + count);
        }
    }
    map = n
    // console.log(i);
}

const totalCount = Array.from(map.values()).reduce((a, b) => a + b, 0);
console.log(totalCount);
