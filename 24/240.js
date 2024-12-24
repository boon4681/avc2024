const fs = require("fs")

const lines = fs.readFileSync("./sam.txt", "utf8").replaceAll("\r", "").split("\n")
const _ = lines.findIndex(a => a == "")
let memo = {}
const v = lines.slice(0, _)
v.map(l => {
    const [a, b] = l.split(": ")
    return memo[a] = Number(b)
})


const program = lines.slice(_ + 1).map(k => {
    const [a, b] = k.split("-> ")
    const [x, o, y] = a.split(" ")
    return {
        a: x,
        b: y,
        opr: o,
        ret: b
    }
})

const oper = (opr, a, b) => {
    switch (opr) {
        case 'AND':
            return a && b ? 1 : 0;
        case 'OR':
            return a || b ? 1 : 0;
        case 'XOR':
            return a !== b ? 1 : 0;
    }
}

const run = (memo, program) => {
    let changed = true;
    while (changed) {
        changed = false;

        for (const p of program) {
            if (!(p.a in memo) || !(p.b in memo)) {
                continue;
            }
            if (p.ret in memo) {
                continue;
            }

            const result = oper(
                p.opr,
                memo[p.a],
                memo[p.b]
            );

            memo[p.ret] = result;
            changed = true;
        }
    }
    return memo
}

memo = run(JSON.parse(JSON.stringify(memo)), program)

const list = Array.from(Object.keys(memo)).filter(a => a.startsWith('z'))

const k = list.sort()
console.log(k)
let result = 0;
for (let i = 0; i < k.length; i++) {
    result += memo[k[i]] * Math.pow(2, i);
}
console.log(result)