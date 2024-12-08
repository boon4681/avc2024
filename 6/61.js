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
let o = 0
let p = 0
let k = 0

const _map_ = file.split("\r\n").map(row => row.split(""));
for (let y = 0; y < _map_.length; y++) {
    for (let x = 0; x < _map_[0].length; x++) {
        if (v.includes(_map_[y][x])) {
            o = y;
            p = x;
            k = _map_[y][x];
            break
        }
    }
}
const looping = new Set()
let loop = 0
for (let y = 0; y < _map_.length; y++) {
    for (let x = 0; x < _map_[0].length; x++) {
        let a = o
        let b = p
        let c = k
        const map = JSON.parse(JSON.stringify(_map_))
        map[y][x] = "#"
        // console.log(map.map(a => a.join("")).join("\n"))
        const visited = new Set();
        const states = new Set();
        visited.add(`${a},${b}`);
        states.add(`${a},${b},${k}`);

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
            const state = `${a},${b},${c}`;
            if (states.has(state)) {
                // looping.add(Array.from(states).join(' '))
                loop++
                break
            }
            states.add(state);
        }
        // const [dy, dx] = move[k];
        // const ny = a + dy;
        // const nx = b + dx;

        // if (ny < 0 || ny >= map.length || nx < 0 || nx >= map[0].length) break;
        // if (map[ny][nx] === "#") {
        //     k = v[(v.indexOf(k) + 1) % 4];
        //     if (map[a][b] == "|" || map[a][b] == "-") map[a][b] = "+"
        // } else {
        //     a = ny;
        //     b = nx;
        //     visited.add(`${a},${b}`);
        //     if (map[ny][nx] == "|" || map[ny][nx] == "-") map[ny][nx] = "+"
        //     if (dy == 0 && map[ny][nx] == ".") map[ny][nx] = "-"
        //     if (dx == 0 && map[ny][nx] == ".") map[ny][nx] = "|"
        // }
    }
}
console.log(looping.size)
// console.log(looping)
console.log(loop)
// console.log(map.map(a => a.join("")).join("\n"))

// console.log(visited.size)