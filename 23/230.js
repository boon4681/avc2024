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

const visited = new Set();
map.forEach((a, b) => {
    if (!b.startsWith("t")) return;
    a.forEach((aa) =>
        a.forEach((bb) => {
            if (aa === bb) return;
            if (!map.get(aa).has(bb)) return;
            visited.add([b, aa, bb].sort().join("-"));
        }),
    );
});

console.log(visited.size)