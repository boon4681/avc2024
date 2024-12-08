const fs = require("fs")

// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
const grid = file.split("\r\n").map(a => a.split(""))
const word = "XMAS";
const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1]
];

const check = (x, y, direction) => {
    let match = true;
    for (let i = 0; i < 4; i++) {
        const nx = x + i * direction[0];
        const ny = y + i * direction[1];
        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) {
            match = false;
            break
        }
        if (grid[nx][ny] !== word[i]) {
            match = false;
            break
        }
    }
    return match;
}

let a = 0
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        for (const direction of directions) {
            if (check(x, y, direction)) {
                a++
            }
        }
    }
}

console.log(a)
