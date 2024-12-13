const fs = require("fs")
// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")
const data = file.replaceAll("\r", "").split("\n")

const input = []
for (let i = 0; i < data.length; i += 4) {
    const [, ax, ay] = /X.(\d+), Y.(\d+)/.exec(data[i])
    const [, bx, by] = /X.(\d+), Y.(\d+)/.exec(data[i + 1])
    const [, px, py] = /X.(\d+), Y.(\d+)/.exec(data[i + 2])
    input.push({
        a: { x: Number(ax), y: Number(ay) },
        b: { x: Number(bx), y: Number(by) },
        p: { x: Number(px) + 1e13, y: Number(py) + 1e13 }
    })
}

function find(a1, b1, c1, a2, b2, c2) {
    const d = a1 * b2 - a2 * b1;
    if (d === 0) {
        throw new Error("The lines are parallel and do not intersect.");
    }
    const x = (b2 * c1 - b1 * c2) / d;
    const y = (a1 * c2 - a2 * c1) / d;
    return { x, y };
}


console.log(
    input.map(({ a, b, p }, _) => {
        const { x, y } = find(a.x, b.x, p.x, a.y, b.y, p.y)
        if (!Number.isInteger(x) || !Number.isInteger(y)) return 0
        console.log(_, x, y)
        return x * 3 + y
    }).reduce((a, b) => a + b, 0)
)