const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf-8").replaceAll("\r", "").trim();
const map = new Map();
input.split("\n").map((a) => a.split("-")).forEach(([a, b]) => {
    if (!map.has(a)) {
        map.set(a, new Set());
    }
    map.get(a).add(b);
    if (!map.has(b)) {
        map.set(b, new Set());
    }
    map.get(b).add(a);
});

const memo = new Map();
const findMax = (a, b) => {
    if (memo.has(a.join(","))) return memo.get(a.join(","));
    if (b.length === 0) return a;
    let max = a;
    b.forEach((cc) => {
        const nx = findMax(
            [...a, cc].sort(),
            b.filter((p) => map.get(cc).has(p)),
        );
        if (nx.length > max.length) max = nx;
    });
    memo.set(a.join(","), max);
    return max;
};

let max = [];
Array.from(map.keys()).forEach((a) => {
    const group = findMax([a], [...map.get(a)].sort());
    if (group.length > max.length) max = group;
});
console.log(max.join(","))