const fs = require('fs');
const secrets = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n")

let ops = [
    (x) => x << 6,
    (x) => x >> 5,
    (x) => x << 11
];

let base = 16777216;

const round = x => ops.reduce((r, f) => (((f(r) ^ r) % base) + base) % base, x);


const result = secrets.map((secret) => {
    let map = {};

    let prev = 0;
    let diffs = [];
    let c = 0;
    for (i = 0; i < 2000; i++) {
        secret = round(secret);
        c = secret % 10;
        diffs = [...diffs.slice(-3), c - prev];
        if (i >= 4) {
            map[diffs.join(',')] ??= c
        };
        prev = c;
    }

    return map;
});

console.log(Math.max(
    ...Object.values(
        result.reduce((a, b) => {
            for (let [k, v] of Object.entries(b)) {
                a[k] = v + (a[k] ?? 0)
            };
            return a;
        })
    )
))