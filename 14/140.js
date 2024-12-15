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
        console.log(`Step ${step + 1}:`);
        console.log(grid.map(row => row.map(cell => (cell > 0 ? cell : '.')).join('')).join('\n'));
        console.log();
    }
}

function f(steps) {
    for (let step = 0; step < steps; step++) {
        robots.forEach(robot => {
            robot.position.x = (robot.position.x + robot.velocity.x + GRID_WIDTH) % GRID_WIDTH;
            robot.position.y = (robot.position.y + robot.velocity.y + GRID_HEIGHT) % GRID_HEIGHT;
        });
    }
    const midX = Math.floor(GRID_WIDTH / 2);
    const midY = Math.floor(GRID_HEIGHT / 2);
    const quadrants = [0, 0, 0, 0];
    robots.forEach(robot => {
        const { x, y } = robot.position;
        if (x === midX || y === midY) return;
        if (x < midX && y < midY) quadrants[0]++;
        else if (x >= midX && y < midY) quadrants[1]++;
        else if (x < midX && y >= midY) quadrants[2]++;
        else if (x >= midX && y >= midY) quadrants[3]++;
    });

    console.log('Quadrant counts:', quadrants);
    const safetyFactor = quadrants.reduce((product, count) => product * count, 1);
    console.log('Safety factor:', safetyFactor);
    return safetyFactor;
}

f(100);
