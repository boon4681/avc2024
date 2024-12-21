const fs = require('fs');
const utils = require("../utils")
const input = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n")

const numpad = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['', '0', 'A'],
];

const dir = [
    ['', '^', 'A'],
    ['<', 'v', '>'],
];

const pad1 = numpad.flatMap((row, y) => row.map((c, j) => [y, j, c])).reduce((r, [y, x, c]) => ((r[c] = [y, x]), r), {})
const pad2 = dir.flatMap((row, y) => row.map((c, j) => [y, j, c])).reduce((r, [y, x, c]) => ((r[c] = [y, x]), r), {})

const keys = (pad, from, to) => {
    const [y1, x1] = pad[from];
    const [y2, x2] = pad[to];
    const [y3, x3] = pad[''];

    let paths = [];

    if (y1 < y2) {
        paths.push(Array(y2 - y1).fill('v').join(''));
    }
    if (y1 > y2) {
        paths.push(Array(y1 - y2).fill('^').join(''));
    }
    if (x1 < x2) {
        paths.push(Array(x2 - x1).fill('>').join(''));
    }
    if (x1 > x2) {
        paths.push(Array(x1 - x2).fill('<').join(''));
    }

    switch (paths.length) {
        case 0:
            return ['A'];
        case 1:
            return [`${paths[0]}A`];
        case 2: {
            let result = [`${paths[0]}${paths[1]}A`, `${paths[1]}${paths[0]}A`];
            if (y1 === y3 && x2 === x3) return [result[0]];
            if (x1 === x3 && y2 === y3) return [result[1]];
            return result;
        }
    }
};

const findPaths = (pad, line) => {
    let result = [''];
    for (let [from, to] of line.split("").map((x, i, a) => (i === 0 ? ['A', x] : [a[i - 1], x]))) {
        const ps = keys(pad, from, to);
        result = result.flatMap(x => ps.map(y => `${x}${y}`));
    }
    return result;
};

const map = {};
const find = (s, n) => {
    const key = `${s},${n}`;
    if (map[key]) return map[key];

    let result;
    if (n === 0) {
        result = s.length;
    } else {
        const paths = findPaths(pad2, s).map(c =>
            c.split('A').map(x => `${x}A`).slice(0, -1).map(s => find(s, n - 1)).reduce((s, x) => s + x)
        )
        result = Math.min(...paths);
    }
    map[key] = result;
    return result;
};

console.log(input.map(a => Number(a.replace(/^0+/, '').slice(0, -1)) * Math.min(...findPaths(pad1, a).map(c =>
    c.split('A').map(x => `${x}A`).slice(0, -1).map(s => find(s, 25)).reduce((s, x) => s + x)
))).reduce((s, x) => s + x))