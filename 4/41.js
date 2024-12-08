const fs = require("fs")

// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
const grid = file.split("\r\n").map(a => a.split(""))
const check = (x, y) => {
    try {
        return (
            grid[y][x] === 'M' &&
            grid[y][x + 2] === 'S' &&
            grid[y + 1][x + 1] === 'A' &&
            grid[y + 2][x] === "M" &&
            grid[y + 2][x + 2] === "S"
        ) || (
            grid[y][x] === 'S' &&
            grid[y][x + 2] === 'M' &&
            grid[y + 1][x + 1] === 'A' &&
            grid[y + 2][x] === "S" &&
            grid[y + 2][x + 2] === "M"
        ) || (
            grid[y][x] === 'M' &&
            grid[y][x + 2] === 'M' &&
            grid[y + 1][x + 1] === 'A' &&
            grid[y + 2][x] === "S" &&
            grid[y + 2][x + 2] === "S"
        ) || (
            grid[y][x] === 'S' &&
            grid[y][x + 2] === 'S' &&
            grid[y + 1][x + 1] === 'A' &&
            grid[y + 2][x] === "M" &&
            grid[y + 2][x + 2] === "M"
        );
    } catch (e) {
        return false;
    }
};

let a = 0
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        if (check(x, y)) {
            a++
        }
    }
}

console.log(a)