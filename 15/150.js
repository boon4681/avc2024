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

        while (map[cy][cx] === 'O') {
            boxes.push({ x: cx, y: cy });
            cx += d.x;
            cy += d.y;

            if (map[cy][cx] == '#') {
                boxes = [];
                break;
            }
        }

        if (boxes.length > 0) {
            for (let i = boxes.length - 1; i >= 0; i--) {
                const box = boxes[i];
                map[box.y + d.y][box.x + d.x] = 'O';
                map[box.y][box.x] = '.';
            }
            map[ny][nx] = '@';
            map[robot.y][robot.x] = '.';
            robot = { x: nx, y: ny };
        } else if (map[ny][nx] === '.') {
            map[ny][nx] = '@';
            map[robot.y][robot.x] = '.';
            robot = { x: nx, y: ny };
        }
    }

    return map;
}

const m = file.replaceAll("\r", "").split("\n")
const map = m.slice(0, m.findIndex(a => a == "")).map(a => a.split(""))
const moves = m.slice(m.findIndex(a => a == "") + 1).map(a => a.split("")).flat()
const finalMap = move(map, moves);
console.log(finalMap.map((a, y) => {
    return a.map((a, x) => {
        return a == 'O' ? 100 * y + x : 0
    })
}).flat().reduce((a, b) => a + b))
