const fs = require("fs")
// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
let data = file.replaceAll("\r\n", "").split("")

data = data.map((a, i) => {
    if (i % 2 == 0) {
        return new Array(Number(a)).fill(i / 2)
    }
    return new Array(Number(a)).fill(".")
}).flat(Infinity)

console.log("DONE")

for (let i = 0; i < data.length; i++) {
    const l = data.findIndex(a => a == ".")
    if (l > -1) {
        const k = data.findLastIndex((a) => /\d/.test(a))
        if (l < k) {
            data[l] = data[k]
            data[k] = "."
        } else {
            break
        }
    }
}

console.log("DONE")
// console.log(data.join(""))
let o = 0

const u = data.map(a => Number(a))
for (let i = 0; i < u.length; i++) {
    const e = u[i];
    if (isNaN(e)) break
    o += e * i
}
console.log(o)
