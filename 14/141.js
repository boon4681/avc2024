const fs = require("fs")
// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")

const GRID_WIDTH = 101;
const GRID_HEIGHT = 103;

// Parse the input
const input = file.trim();

const robots = input.split('\n').map(line => {
    const [, px, py, vx, vy] = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/).map(Number);
    return { position: { x: px, y: py }, velocity: { x: vx, y: vy } };
});
let o = 0
// Simulate the robots' movement
function simulate(steps) {
    const grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0));

    for (let step = 0; step < steps; step++) {
        // Clear the grid for the current step
        for (let y = 0; y < GRID_HEIGHT; y++) {
            grid[y].fill(0);
        }

        // Update robot positions and wrap around
        robots.forEach(robot => {
            robot.position.x = (robot.position.x + robot.velocity.x + GRID_WIDTH) % GRID_WIDTH;
            robot.position.y = (robot.position.y + robot.velocity.y + GRID_HEIGHT) % GRID_HEIGHT;

            // Increment the count on the grid
            grid[robot.position.y][robot.position.x]++;
        });

        // Print the grid
        console.log(`Step ${o++}:`);
        // console.log(grid.map(row => row.map(cell => (cell > 0 ? cell : '.')).join('')).join('\n'));
        // console.log();
        if (isChristmasTree(grid.map(row => row.map(cell => (cell > 0 ? cell : '.')).join('')))) {
            throw "HI"
        }
    }
}

function isChristmasTree(rows) {
    // Trim leading/trailing spaces from rows and ensure non-empty input
    if (!rows || rows.length === 0) return false;

    let expectedStars = 1;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        // Count stars in the current row
        const starCount = (row.match(/\*/g) || []).length;
        if (starCount !== expectedStars) return false;

        // Check for symmetric spaces
        const leftSpaces = row.indexOf('*');
        const rightSpaces = row.length - (leftSpaces + starCount);

        if (leftSpaces !== rightSpaces) return false;

        // Increment the expected number of stars for the next row
        expectedStars += 2;
    }

    return true;
}

while (true) {
    simulate(1)
}