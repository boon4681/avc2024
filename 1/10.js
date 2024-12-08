const fs = require("fs")

let left = []
let right = []

for (const list of fs.readFileSync("./input.txt", "utf8").split("\r\n").map(a => a.split("   ").map(a => Number(a)))) {
    left.push(list[0])
    right.push(list[1])
}

left = left.sort((a, b) => a - b)
right = right.sort((a, b) => a - b)

let m = 0
for (let i = 0; i < left.length; i++) {
    m += Math.abs(right[i] - left[i])
}
console.log(m)