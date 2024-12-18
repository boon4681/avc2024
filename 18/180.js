const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf8').replaceAll("\r", "").split('\n').map(n => n.split(',').map(Number));
input = input.slice(0, 1024)
const size = 71;
const grid = Array.from({ length: size }, () => Array(size).fill("."));

input.forEach(([x, y], i) => {
    if (x < size && y < size) {
        grid[y][x] = "#";
    }
});

function find(grid) {
    const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];

    const queue = [[0, 0, 0]];
    const visited = new Set();
    visited.add("0,0");

    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();
        if (x === size - 1 && y === size - 1) {
            return steps;
        }

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < size && ny >= 0 && ny < size && grid[ny][nx] === "." && !visited.has(`${nx},${ny}`)) {
                queue.push([nx, ny, steps + 1]);
                visited.add(`${nx},${ny}`);
            }
        }
    }

    return -1;
}
grid.forEach(row => console.log(row.join("")));

console.log(find(grid))