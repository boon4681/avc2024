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
        console.log(`Step ${step + 1}:`);
        console.log(grid.map(row => row.map(cell => (cell > 0 ? cell : '.')).join('')).join('\n'));
        console.log();
    }
}

// Run the simulation for 5 steps
// simulate(100);
// Determine the safest area
function calculateSafetyFactor(steps) {
    // Simulate the movement for the given steps
    for (let step = 0; step < steps; step++) {
        robots.forEach(robot => {
            robot.position.x = (robot.position.x + robot.velocity.x + GRID_WIDTH) % GRID_WIDTH;
            robot.position.y = (robot.position.y + robot.velocity.y + GRID_HEIGHT) % GRID_HEIGHT;
        });
    }

    // Count robots in quadrants
    const midX = Math.floor(GRID_WIDTH / 2);
    const midY = Math.floor(GRID_HEIGHT / 2);
    const quadrants = [0, 0, 0, 0]; // Top-left, Top-right, Bottom-left, Bottom-right

    robots.forEach(robot => {
        const { x, y } = robot.position;
        if (x === midX || y === midY) return; // Ignore robots on the middle lines

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

calculateSafetyFactor(100);
