const fs = require("fs")
// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
let data = file.replaceAll("\r", "").split("\n").map(a => a.split('').map(Number))

const dfs = (set, map, y, x, trail, height) => {
    if (y < 0 || y >= map.length ||
        x < 0 || x >= map[0].length ||
        map[y][x] !== height) {
        return;
    }

    trail.push([y, x]);

    const directions = [
        [y - 1, x],
        [y + 1, x],
        [y, x - 1],
        [y, x + 1]
    ];

    if (height === 9) {
        set.add(JSON.stringify(trail));
        return;
    }

    for (const [ny, nx] of directions) {
        dfs(set, map, ny, nx, [...trail], height + 1);
    }
};

const heads = [];

for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
        if (data[row][col] === 0) {
            heads.push([row, col]);
        }
    }
}

const scores = [];

for (const [y, x] of heads) {
    const trails = new Set();

    dfs(trails, data, y, x, [], 0);
    const set = new Set(
        Array.from(trails)
            .map(trail => JSON.parse(trail))
            .map(trail => trail.filter(([r, c]) => data[r][c] === 9))
            .flat()
            .map(point => JSON.stringify(point))
    ).size;
    scores.push(set);
}

console.log(scores.reduce((a, b) => a + b, 0))