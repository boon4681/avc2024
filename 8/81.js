const fs = require("fs")
// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
const data = file.replaceAll("\r", "").split("\n").map(a => a.split(""))
const map = {}
const check = {}
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
        const a = data[y][x]
        if (a != "." && a != "#") {
            if (!map[a]) {
                map[a] = []
            }
            map[a].push({ x, y })
        }
        if (a == "#") {
            if (!check[a]) {
                check[a] = []
            }
            check[a].push({ x, y })
        }
    }
}
console.log(map)
console.log(check)

const state = new Set()
for (const k in map) {
    const list = map[k]
    for (let i = 0; i < list.length; i++) {
        const m = list[i];
        for (let l = 0; l < list.length; l++) {
            if (i == l) continue
            const n = list[l]
            let u = 1;
            while (true) {
                const k = {
                    y: (m.y - n.y) * u + n.y,
                    x: (m.x - n.x) * u + n.x
                };
                if (k.y < 0 || k.y >= data.length || k.x < 0 || k.x >= data[0].length) break
                state.add(`${k.x},${k.y}`)
                // data[k.y][k.x] = "#"
                u++
            }
        }
    }
}
// for (const k in map) {
//     const list = map[k]
//     for (let i = 0; i < list.length; i++) {
//         const m = list[i];
//         state.delete(`${m.x},${m.y}`)
//     }
// }
console.log(data.map(a => a.join("")).join("\n"))
console.log(state.size)