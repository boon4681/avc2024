const fs = require("fs")

let left = []
let right = []

for (const list of fs.readFileSync("./input.txt", "utf8").split("\r\n").map(a => a.split("   ").map(a => Number(a)))) {
    left.push(list[0])
    right.push(list[1])
}

left = left.sort((a, b) => a - b)
right = right.sort((a, b) => a - b)

const table = {}
let m = 0
for (let i = 0; i < left.length; i++) {
    const k = left[i]
    for (let l = 0; l < right.length; l++) {
        const v = right[l]
        if (k == v) {
            if (table[k] == undefined) {
                table[k] = 0
            }
            table[k] += 1
        }
    }
}

for (const k in table) {
    m += Number(k) * table[k]
}

console.log(m)