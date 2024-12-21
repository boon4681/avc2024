const fs = require('fs');

function count(target, patterns, memo = new Map()) {
    if (!target) {
        return 1;
    }
    if (memo.has(target)) {
        return memo.get(target);
    }
    let sum = 0;
    for (const pattern of patterns) {
        if (target.startsWith(pattern)) {
            sum += count(target.slice(pattern.length), patterns, memo);
        }
    }

    memo.set(target, sum);
    return sum;
}

const input = fs.readFileSync("./input.txt", 'utf8').trim()
    .split('\n')
    .map(line => line.replace(/\r$/, ''));

const patterns = new Set();
input[0].split(', ').forEach(pattern => patterns.add(pattern));
let designs = input.slice(2);

let c = 0;
let sum = 0;

for (const design of designs) {
    const ways = count(design, patterns);
    if (ways > 0) {
        c++;
    }
    sum += ways;
}

console.log(c)
console.log(sum)