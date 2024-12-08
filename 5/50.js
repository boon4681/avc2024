const fs = require("fs")

// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
const lines = file.split("\r\n")
const rules = lines.slice(0, lines.findIndex(a => a == "")).map(a => a.split("|").map(a => Number(a)))
const updates = lines.slice(lines.findIndex(a => a == "") + 1).map(a => a.split(",").map(a => Number(a)))

const f = updates.filter(a => {
    for (const [x, y] of rules) {
        const m = a.findIndex(a => a == x)
        const n = a.findIndex(a => a == y)
        if (m > -1 && n > -1 && m > n) {
            return false
        }
    }
    return true
}).map(a => a[Math.floor(a.length / 2)]).reduce((a, b) => a + b)

console.log(f)

// console.log(rules)
// console.log(updates)