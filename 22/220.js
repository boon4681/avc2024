const fs = require('fs');
const secrets = fs.readFileSync("./input.txt", 'utf8').replaceAll("\r", "").split("\n")

let ops = [
    (x) => x << 6,
    (x) => x >> 5,
    (x) => x << 11
];

const base = 16777216;

const round = x => ops.reduce((r, f) => (((f(r) ^ r) % base) + base) % base, x);

const result = secrets.map((secret) => {
    let prev = 0;
    let c = 0;
    for (i = 0; i < 2000; i++) {
        secret = round(secret);
        c = secret % 10;
        prev = c;
    }
    return secret;
});

console.log(result.map(x => x).reduce((s, x) => s + x))