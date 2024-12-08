const fs = require("fs")

const file = fs.readFileSync("./input.txt", "utf8")

let might_safe = []
for (const trend of file.split("\r\n").map(a => a.split(" ").map(a => Number(a)))) {
    let increased = trend[0] > trend[1]
    let decreased = trend[0] < trend[1]
    if (increased) {
        for (let i = 0; i < trend.length - 1; i++) {
            const a = trend[i];
            const b = trend[i + 1];
            if (a <= b) {
                increased = false
            }
        }
    }
    if (!increased) {
        for (let i = 0; i < trend.length - 1; i++) {
            const a = trend[i];
            const b = trend[i + 1];
            if (a >= b) {
                decreased = false
            }
        }
    }

    if (increased || decreased) {
        might_safe.push(trend)
    }
}

// console.log(might_safe)
let safe = 0
for (const might of might_safe) {
    let m = true
    for (let i = 0; i < might.length - 1; i++) {
        const a = might[i];
        const b = might[i + 1];
        if (Math.abs(a - b) > 3) {
            m = false
        }
    }
    if (m) {
        safe++
    }
}

console.log(safe)