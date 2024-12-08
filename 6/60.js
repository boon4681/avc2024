const fs = require("fs")

// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
const v = ["^", ">", "v", "<"];
const move = {
    "^": [-1, 0],
    ">": [0, 1],
    "v": [1, 0],
    "<": [0, -1]
}
let a =0
let b =0
let c =0

const map = file.split("\r\n").map(row => row.split(""));
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (v.includes(map[y][x])) {
            a = y;
            b = x;
            c = map[y][x];
            break
        }
    }
}
const visited = new Set();
visited.add(`${a},${b}`);

while (true) {
    const [dy, dx] = move[c];
    const ny = a + dy;
    const nx = b + dx;

    if (ny < 0 || ny >= map.length || nx < 0 || nx >= map[0].length) break;
    if (map[ny][nx] === "#") {
        c = v[(v.indexOf(c) + 1) % 4];
    } else {
        a = ny;
        b = nx;
        visited.add(`${a},${b}`);
        map[ny][nx] = "X"
    }
}
map[a][b] = "&"
console.log(map.map(a=>a.join("")).join("\n"))

console.log(visited.size)