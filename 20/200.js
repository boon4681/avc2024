const fs = require('fs');
const utils = require("../utils")
const grid = utils.grid(input)
const input = fs.readFileSync("./input.txt", 'utf8')

const dirs = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
];

const start_end = (grid) => {
    let start = undefined
    let end = undefined
    for (const { x, y, i, v } of grid.iter()) {
        if (v == 'S') {
            start = [y, x]
        }
        if (v == 'E') {
            end = [y, x]
        }
    }
    return { start, end }
}

const bfs = (node) => {
    const map = { [node.join(',')]: 0 };
    const queue = [node];

    while (queue.length > 0) {
        const [y, x] = queue.shift();
        const dist = map[[y, x].join(',')];

        for (const [dy, dx] of dirs) {
            const ny = y + dy;
            const nx = x + dx;

            if (!map[[ny, nx].join(',')] && grid.get(nx, ny) !== '#') {
                map[[ny, nx].join(',')] = dist + 1;
                queue.push([ny, nx]);
            }
        }
    }

    return map;
}

const cheating = (map) => {
    const cheats = {};

    for (const key in map) {
        const [y, x] = key.split(',').map(Number);

        for (const [dy, dx] of dirs) {
            const ny = y + 2 * dy;
            const nx = x + 2 * dx;

            if (map[[ny, nx].join(',')] !== undefined) {
                const diff = map[key] - map[[ny, nx].join(',')] - 2;

                if (diff > 0) {
                    cheats[[key, [ny, nx].join(',')]] = diff;
                }
            }
        }
    }

    return cheats;
}

const { start } = start_end(grid);
const map = bfs(start);
const cheats = cheating(map);

let count = 0;

for (const key in cheats) {
    if (cheats[key] >= 100) {
        count++;
    }
}

console.log(count)