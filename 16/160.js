const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').replaceAll("\r","").split('\n').map(n => n.split(''));

let sx = 0;
let sy = 0;

input.forEach((r, y) => {
    r.forEach((c, x) => {
        if (c == 'S') {
            sx = x;
            sy = y;
        }
    })
})

const visited = {};

const stack = [{
    v: 0,
    x: sx,
    y: sy,
    d: 0
}];

const dir = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
];


let lowestScore = Number.MAX_SAFE_INTEGER;

let counter = 0;

while (stack.length) {
    counter++;
    const t = stack.pop();

    if (input[t.y][t.x] == 'E') {
        if (t.v < lowestScore) {
            lowestScore = t.v;
        }
        continue;
    }

    for (let di = 0; di < dir.length; di++) {
        const d = dir[di]
        const diff = Math.abs(di - t.d);
        if (diff != 2) {
            const nx = t.x + d[0];
            const ny = t.y + d[1];
            const nv = diff == 0 ? (t.v + 1) : (t.v + 1001);
            const key = [nx, ny, di].join(",")
            if (nv < (visited[key] ?? Number.MAX_SAFE_INTEGER)) {
                visited[key] = nv;
                if (input[ny][nx] != '#') {
                    stack.push({
                        v: nv,
                        x: nx,
                        y: ny,
                        d: di
                    })
                }
            }
        }
    }
}

console.log(lowestScore);