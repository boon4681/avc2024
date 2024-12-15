const fs = require("fs")
// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")

const GRID_WIDTH = 101;
const GRID_HEIGHT = 103;
const input = file.trim();

const robots = input.split('\n').map(line => {
    const [, px, py, vx, vy] = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/).map(Number);
    return { position: { x: px, y: py }, velocity: { x: vx, y: vy } };
});
let o = 0

function simulate(steps) {
    const grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0));

    for (let step = 0; step < steps; step++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            grid[y].fill(0);
        }
        robots.forEach(robot => {
            robot.position.x = (robot.position.x + robot.velocity.x + GRID_WIDTH) % GRID_WIDTH;
            robot.position.y = (robot.position.y + robot.velocity.y + GRID_HEIGHT) % GRID_HEIGHT;
            grid[robot.position.y][robot.position.x]++;
        });
        console.log(`Step ${++o}:`);
        const dbb = dbscan(
            grid.map((a, y) => a.map((a, x) => (a > 0 ? { x, y } : undefined)).filter(a => a)).flat(2),
            2,
            2
        )
        console.log(dbb)
        if (dbb < 10) {
            throw new Error("")
        }
    }
}

function euclideanDistance(point1, point2) {
    return Math.sqrt(
        Math.pow(point1.x - point2.x, 2) +
        Math.pow(point1.y - point2.y, 2)
    );
}
function rangeQuery(database, point, eps) {
    return database.filter(other => other.id !== point.id && euclideanDistance(point, other) <= eps);
}
function dbscan(points, eps, minPts) {
    const database = points.map((point, index) => {
        point.id = index;
        point.cid = null
        return point
    });

    let ccid = 0;

    for (let i = 0; i < database.length; i++) {
        const point = database[i];
        if (point.cid !== null) continue;
        const neighbors = rangeQuery(database, point, eps);
        if (neighbors.length < minPts) {
            point.cid = -1;
            continue;
        }
        ccid++;
        if (ccid > 5) {
            return Infinity
        }
        point.cid = ccid;
        const seedSet = neighbors.filter(n => n.cid === null);
        while (seedSet.length > 0) {
            const cp = seedSet.pop();
            if (cp.cid !== null) continue;
            if (cp.cid === -1) cp.cid = ccid;
            const currentNeighbors = rangeQuery(database, cp, eps);
            if (currentNeighbors.length >= minPts) {
                currentNeighbors.forEach(neighbor => {
                    if (neighbor.cid === null) {
                        seedSet.push(neighbor);
                    }
                });
            }
            if (cp.cid === null) {
                cp.cid = ccid;
            }
        }
    }

    return ccid;
}

while (true) {
    simulate(1)
}