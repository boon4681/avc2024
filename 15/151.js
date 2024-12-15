const fs = require("fs")
// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")

const directions = {
    '^': { x: 0, y: -1 },
    'v': { x: 0, y: 1 },
    '<': { x: -1, y: 0 },
    '>': { x: 1, y: 0 },
};

function move(map, moves) {
    let robot = undefined
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === '@') {
                robot = { x, y };
                break
            }
        }
        if (robot) break
    }
    for (const move of moves) {
        const d = directions[move];
        let nx = robot.x + d.x;
        let ny = robot.y + d.y;
        if (map[ny][nx] === '#') continue;

        let cx = nx;
        let cy = ny;
        let boxes = [];
        let stack = []
        let visited = new Set()
        let m = new Set()
        if (map[cy][cx] === '[' || map[cy][cx] === ']') {
            stack.push({ x: cx, y: cy, tile: map[cy][cx] })
        }
        let wall = false

        while (stack.length > 0 && !wall) {
            const box = stack.pop()
            let cx = box.x + 0
            let cy = box.y + 0
            if (visited.has(`${cx},${cy},${map[cy][cx]}`)) continue
            visited.add(`${cx},${cy},${map[cy][cx]}`)
            while (map[cy][cx] === '[' || map[cy][cx] === ']') {
                if (!m.has(`${cx},${cy},${map[cy][cx]}`)) {
                    m.add(`${cx},${cy},${map[cy][cx]}`);
                    boxes.push({ x: cx, y: cy, tile: map[cy][cx] });
                }
                if (d.x == 0) {
                    if (map[cy][cx] === '['){
                        stack.push({ x: cx + 1, y: cy, tile: map[cy][cx + 1] });
                    }
                    else {
                        stack.push({ x: cx - 1, y: cy, tile: map[cy][cx - 1] });
                    }
                }
                cx += d.x;
                cy += d.y;
                if (map[cy][cx] == '#') {
                    wall = true
                    stack = []
                    boxes = []
                    break;
                }
            }
        }
        boxes = boxes.sort((a, b) => (b.x - a.x) * d.x + (b.y - a.y) * d.y)
        if (boxes.length > 0 || map[ny][nx] === '.') {
            for (let i = 0; i < boxes.length; i++) {
                const box = boxes[i];
                map[box.y + d.y][box.x + d.x] = map[box.y][box.x];
                map[box.y][box.x] = '.';
            }
            map[ny][nx] = '@';
            map[robot.y][robot.x] = '.';
            robot = { x: nx, y: ny };
        }
    }
    return map;
}
const m = file.replaceAll("\r", "").split("\n")
const map = m.slice(0, m.findIndex(a => a == "")).map(a => a.split("").map(a => {
    if (a == "#") return ["#", "#"]
    if (a == "O") return ["[", "]"]
    if (a == "@") return ["@", "."]
    return ['.', '.']
}).flat())
const moves = m.slice(m.findIndex(a => a == "") + 1).map(a => a.split("")).flat()
const finalMap = move(map, moves);
console.log(finalMap.map((a, y) => {
    return a.map((a, x) => {
        return a == '[' ? 100 * y + x : 0
    })
}).flat().reduce((a, b) => a + b))