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

let bestScore = Number.MAX_SAFE_INTEGER;

let best_list = [];

while (stack.length) {
    const t = stack.pop();

    if (t.v > bestScore) {
        continue;
    }

    if (input[t.y][t.x] == 'E') {
        if (t.v == bestScore) {
            best_list.push(t);
        }
        if (t.v < bestScore) {
            bestScore = t.v;
            best_list = [];
            best_list.push(t)
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

            if (input[ny][nx] != '#') {
                const key = [nx, ny, di].join(",");
                if (nv <= (visited[key] ?? Number.MAX_SAFE_INTEGER)) {
                    visited[key] = nv;
                    stack.push({
                        v: nv,
                        x: nx,
                        y: ny,
                        d: di,
                        parent: t
                    });
                }
            }
        }
    }
}

const get = (n) => {
    let list = [];

    while (n.parent) {
        list.push(n.x + ',' + n.y);
        n = n.parent;
    }
    return list;
}

const K = new Set();

best_list.forEach(p => {
    const tiles = get(p);
    for (const n of tiles) {
        K.add(n)
    }
})

console.log(K.size + 1);