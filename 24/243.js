const fs = require("fs")

const [raw_input, raw_circuit] = fs.readFileSync("./input.txt", "utf8").replaceAll("\r", "").split("\n\n")
const memo = {}
raw_input.split("\n").forEach(l => {
    const [a, b] = l.split(": ")
    memo[a] = Number(b)
})
const circuit = raw_circuit.split("\n").map(r => {
    const [a, opr, b, ret] = r.replace('-> ', '').split(" ")
    return { a, opr, b, ret }
})
const graph = (program) => {
    const graph = {};
    program.forEach(({ ret, opr, a, b }) => {
        if (!graph[ret]) graph[ret] = { d: [], opr: null }
        graph[ret].d.push(a, b);
        graph[ret].opr = opr;
        if (!graph[a]) graph[a] = { d: [], opr: null };
        if (!graph[b]) graph[b] = { d: [], opr: null };
    })
    return graph
}

const walk = (graph, node, limit = Infinity) => {
    const visited = new Set();
    const depth = new Map();
    const dfs = (curr, d) => {
        if (visited.has(curr) || !graph[curr]) return;
        if (d > limit) return
        visited.add(curr);
        depth.set(curr, d);
        for (const dep of graph[curr].d) dfs(dep, d + 1);
    }
    dfs(node, 0);
    const list = Array.from(visited);
    list.splice(list.indexOf(node), 1);
    return [list, depth];
}

const g = graph([...circuit])
const possible1 = circuit.filter(a => a.a.slice(1) == a.b.slice(1) && parseInt(a.a.slice(1)) > 0 && a.opr == 'AND').filter(a => {
    return Array.from(Object.keys(g)).filter(b => g[b].d.includes(a.ret) && g[b].opr == 'OR').map(a => g[a]).length != 1
})
const possible2 = circuit.filter(a => a.ret.startsWith('z') && parseInt(a.ret.slice(1)) != 45 && a.opr != 'XOR')

let list = new Set()
possible1.forEach(a => list.add(a))
possible2.forEach(a => list.add(a))

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
const makeZ = (i) => 'z' + String(i).padStart(2, '0')
const get = (memo, k) => {
    return Array.from(Object.keys(memo)).filter(a => a.startsWith(k)).sort().reverse().map(a => memo[a]).join("");
}

list = Array.from(list).sort((a, b) => {
    const m = /.\d+/.test(a.a) ? Number(a.a.slice(1)) : Number(a.ret.slice(1))
    const n = /.\d+/.test(b.a) ? Number(b.a.slice(1)) : Number(b.ret.slice(1))
    return m - n
})

const sample = []
const check = (i, poss, cprogram, set = [], pivot = 0) => {
    if (i >= poss.length) return set;
    const a = poss[i]
    const na = Number(a.a.slice(1))
    const nret = Number(a.ret.slice(1))
    let list = [];
    [list] = Number.isInteger(na) ? walk(g, makeZ(na + 1), 2) : walk(g, makeZ(nret + 1), 2)

    const t = cprogram.find(v => v.ret == a.ret)
    const swap = []
    for (const k of list) {
        let program = JSON.parse(JSON.stringify(cprogram))
        const v = program.find(v => v.ret == k)
        if (t && v) {
            if (t.opr == v.opr || ![t.opr, v.opr].includes("XOR")) continue
            const r = t.ret + ''
            t.ret = v.ret + ''
            v.ret = r
            const m = run(JSON.parse(JSON.stringify(memo)), program)
            const zv = (parseInt(get(m, 'x'), 2) + parseInt(get(m, 'y'), 2)).toString(2).padStart(45, '0').slice(-pivot - 1)
            const z = get(m, 'z').padStart(45, '0').slice(-pivot - 1)
            if (zv == z) {
                swap.push({ program, set: [...set, [a.ret, k]] })
            }
        }
    }
    if (swap.filter(a => a.set.length == 4).length) {
        swap.forEach(a => sample.push([...a.set]))
    }
    for (const { program, set } of swap) {
        check(i + 1, poss, program, set, pivot + 1)
    }
}
let cprogram = JSON.parse(JSON.stringify(circuit))
check(0, list, cprogram)

for (const set of sample) {
    const program = JSON.parse(JSON.stringify(circuit))
    set.forEach(a => {
        const t = program.find(v => v.ret == a[0])
        const v = program.find(v => v.ret == a[1])
        if (t && v) {
            const r = t.ret + ''
            t.ret = v.ret + ''
            v.ret = r
        }
    })
    const m = run(JSON.parse(JSON.stringify(memo)), program)
    const zv = (parseInt(get(m, 'x'), 2) + parseInt(get(m, 'y'), 2)).toString(2).padStart(45, '0')
    const z = get(m, 'z')
    if (zv == z) {
        console.log(set)
        console.log(set.flat().sort().join(","))
        break
    }
}