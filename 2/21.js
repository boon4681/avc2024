const fs = require("fs")

const file = fs.readFileSync("./input.txt", "utf8")

let safe = 0
for (const trend of file.split("\r\n").map(a => a.split(" ").map(a => Number(a))).map(a => {
    let l = [[...a]]
    for (let i = 0; i < a.length; i++) {
        l.push([...a].filter((_, n) => n != i))
    }
    return l.filter(trend => {
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
        return increased || decreased
    }).filter(might => {
        let m = true
        for (let i = 0; i < might.length - 1; i++) {
            const a = might[i];
            const b = might[i + 1];
            if (Math.abs(a - b) > 3) {
                m = false
            }
        }
        if (m) {
            return true
        }
        return false
    })
})
) {
    // console.log(trend)
    if (trend.length > 0) {
        safe++
    }
}

// console.log(might_safe)

console.log(safe)