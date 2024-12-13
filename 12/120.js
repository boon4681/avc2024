const fs = require("fs")
// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
const data = file.replaceAll("\r", "").split("\n").map(a => a.split(""))

const visited = Array.from({ length: data.length }, () => Array(data[0].length).fill(false));
let perims = {};
let o = 0

const directions = [
    [-1, 0], [0, 1], [1, 0], [0, -1]
]

function valid(x, y) {
    return x >= 0 && x < data.length && y >= 0 && y < data[0].length && !visited[x][y];
}

function validb(x, y) {
    return x >= 0 && x < data.length && y >= 0 && y < data[0].length;
}

function flood(cx, cy, plantType) {
    let area = 0;
    let perimeter = 0;
    if (!valid(cx, cy) || data[cx][cy] !== plantType) return { area, perimeter };
    if (visited[cx][cy]) return { area, perimeter }

    visited[cx][cy] = true;
    area++;

    for (let i = 0; i < directions.length; i++) {
        const [dx, dy] = directions[i]
        const nx = cx + dx;
        const ny = cy + dy;
        if (validb(nx, ny) && data[nx][ny] == plantType) {
            const { area: a, perimeter: b } = flood(nx, ny, plantType)
            area += a
            perimeter += b
        } else {
            perimeter++;
        }
    }

    return { area, perimeter };
}

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
        if (!visited[i][j]) {
            const plantType = data[i][j];
            const { area, perimeter } = flood(i, j, plantType);
            o += area * perimeter;
            perims = {}
        }
    }
}


console.log(o)