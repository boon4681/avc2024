const fs = require('fs');

let data = fs.readFileSync('./input.txt', 'utf8').replaceAll("\r", "").split('\n').map(n => n.split(',').map(Number));

const f = (i) => {
    input = data.slice(0, i)
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
                if (
                    nx >= 0 && nx < size &&
                    ny >= 0 && ny < size &&
                    grid[ny][nx] === "." &&
                    !visited.has(`${nx},${ny}`)
                ) {
                    queue.push([nx, ny, steps + 1]);
                    visited.add(`${nx},${ny}`);
                }
            }
        }

        return -1;
    }
    const shortestPath = find(grid);
    if (shortestPath !== -1) {
        return true
    } else {
        return false
    }

}

let i = 1024
while (i < data.length) {
    let k = f(i)
    console.log(i)
    if (!k) {
        console.log(data.slice(0, i).reverse()[0])
        break
    }
    i++
}