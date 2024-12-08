const fs = require("fs")

// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
let m = 0
let e = true
for (const f of file.matchAll(/mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g)) {
    if (f[0] == "don't()") {
        e = false
    }
    if (f[0] == "do()") {
        e = true
    }
    if (e && f[0].startsWith("mul")) {
        m += Number(f[1]) * Number(f[2])
    }
}
console.log(m)