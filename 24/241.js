const fs = require("fs")

const lines = fs.readFileSync("./input.txt", "utf8").replaceAll("\r", "").split("\n")
const _ = lines.findIndex(a => a == "")
const memo = {}
const p = lines.slice(_ + 1)
const v = lines.slice(0, _).map(l => {
    const [a, b] = l.split(": ")
    memo[a] = Number(b)
    return [a, Math.round(Math.random())]
})

function xor(binStr1, binStr2) {
    const num1 = BigInt("0b" + binStr1);
    const num2 = BigInt("0b" + binStr2);
    const result = num1 ^ num2;
    const resultStr = result.toString(2);
    const maxLength = Math.max(binStr1.length, binStr2.length);
    return resultStr.padStart(maxLength, '0');
}

const program = p.map(k => {
    const [a, b] = k.split("-> ")
    const [x, o, y] = a.split(" ")
    return {
        a: x,
        b: y,
        opr: o,
        ret: b
    }
})

const get = (memo, k) => {
    return Array.from(Object.keys(memo)).filter(a => a.startsWith(k)).sort().reverse().map(a => memo[a]).join("");
}

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
            if (!(p.a in memo) || !(p.b in memo)) continue;
            if (p.ret in memo) continue;
            const result = oper(p.opr, memo[p.a], memo[p.b]);
            memo[p.ret] = result;
            changed = true;
        }
    }
    return memo;
}

const graph = (program) => {
    const graph = {};
    program.forEach(({ ret, opr, a, b }) => {
        if (!graph[ret]) {
            graph[ret] = { d: [], opr: null };
        }
        graph[ret].d.push(a, b);
        graph[ret].opr = opr;
        if (!graph[a]) graph[a] = { d: [], opr: null };
        if (!graph[b]) graph[b] = { d: [], opr: null };
    })
    return graph
}

const walk = (graph, node) => {
    const visited = new Set();
    const dfs = (currentNode) => {
        if (visited.has(currentNode) || !graph[currentNode]) {
            return;
        }
        visited.add(currentNode);
        for (const dep of graph[currentNode].d) {
            dfs(dep);
        }
    }
    dfs(node);
    const dependencies = Array.from(visited);
    dependencies.splice(dependencies.indexOf(node), 1);

    return dependencies;
}

const g = graph(program)
const makeZ = (i) => 'z' + String(i).padStart(2, '0')
let _break_ = false
const wow = (cprogram, set = [], d = 1, vee = new Set()) => {
    const m = run(JSON.parse(JSON.stringify(memo)), cprogram)
    const zv = (parseInt(get(m, 'x'), 2) + parseInt(get(m, 'y'), 2)).toString(2)
    const z = get(m, 'z')
    const s = zv.split("").findLastIndex((a, i) => z[i] != a)
    const e = zv.length - s - 1
    const j = xor(z, zv).split("").filter(a => a == '1').length
    if (zv == z) {
        console.log(set.sort().join(","))
        _break_ = true
        throw new Error("DONE")
        return
    }
    if (set.length >= 8 || d > 4) return
    if (s == -1) {
        return
    }
    let swapList = walk(g, makeZ(e + 1))
    swapList = Array.from(new Set(swapList))
    if (g[makeZ(e)].opr != "XOR") swapList.unshift(makeZ(e))
    swapList = swapList.filter(a => !vee.has(a))
    let program = [...cprogram]
    for (let i = 0; i < swapList.length; i++) {
        const a = swapList[i];
        for (let l = i + 1; l < swapList.length; l++) {
            if (l == i) continue
            const b = swapList[l];
            program = JSON.parse(JSON.stringify(cprogram))
            const t = program.find(v => v.ret == a)
            const v = program.find(v => v.ret == b)
            if (t && v) {
                if (t.opr == v.opr || ![t.opr, v.opr].includes("XOR")) continue
                const r = t.ret + ''
                t.ret = v.ret + ''
                v.ret = r

                const m = run(JSON.parse(JSON.stringify(memo)), program)
                const zv = (parseInt(get(m, 'x'), 2) + parseInt(get(m, 'y'), 2)).toString(2).padStart(45, '0')
                const z = get(m, 'z')
                const s = zv.split("").findLastIndex((a, i) => z[i] != a)
                const u = zv.length - s - 1
                const h = xor(z, zv).split("").filter(a => a == '1').length
                if (u >= e && j - h > 1) {
                    if (h == 0 && set.length + 2 != 8) continue
                    console.log(t.ret, r, h, j)
                    vee.add(t.ret)
                    vee.add(r)
                    swapList.forEach(a => vee.add(a))
                    wow(program, [...set, t.ret, r], d + 1, new Set(vee))
                }
            }
        }
    }
    return [undefined, true, undefined, undefined]
}
let cprogram = [...program];
try {
    wow(cprogram)
} catch (error) {
    console.log(error.message)
}