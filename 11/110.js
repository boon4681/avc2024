const fs = require("fs")
// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
const data = file.trim().split(" ").map(Number)
console.log(data)
let stones = data;
for (let i = 1; i <= 25; i++) {
    let next = [];

    for (let stone of stones) {
        if (stone === 0) {
            next.push(1);
        } else if (stone.toString().length % 2 === 0) {
            const name = stone.toString();
            const mid = name.length / 2;
            const left = Number(name.slice(0, mid), 10);
            const right = Number(name.slice(mid), 10);

            next.push(left, right);
        } else {
            next.push(stone * 2024);
        }
    }
    stones = next
    console.log(i, stones);
}

console.log(stones.length)
