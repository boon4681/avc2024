const fs = require("fs")

// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")

function permute(n) {
    if (n === 0) return [[]];
    const k = permute(n - 1);
    return k.flatMap((k) => [['+'].concat(k), ['*'].concat(k)]);
}
const data = file.replaceAll("\r", "").split("\n").map(a => [a, b] = a.split(":").map(a => a.trim())).map(a => {
    return [Number(a[0]), a[1].split(" ").map(a => Number(a))]
})
let l = 0
for (const [k, v] of data) {
    console.log(k,v)
    for (const ops of permute(v.length)) {
        let result = v[0];
        for (let i = 0; i < ops.length - 1; i++) {
            if (ops[i] == '+') {
                result += v[i + 1];
            } else if (ops[i] == '*') {
                result *= v[i + 1];
            }
            // console.log(result)
        }
        if (result === k) {
            l += k
            break;
        }
    }
}
console.log(l)