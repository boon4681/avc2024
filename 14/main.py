import os
import re
import numpy as np
import cv2

GRID_WIDTH = 101
GRID_HEIGHT = 103
CELL_SIZE = 1

with open("./input.txt", "r") as file:
    input_data = file.read().strip()

robots = []
for line in input_data.split("\n"):
    match = re.match(r"p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)", line)
    if match:
        px, py, vx, vy = map(int, match.groups())
        robots.append({"position": {"x": px, "y": py}, "velocity": {"x": vx, "y": vy}})

def simulate(steps):
    for step in range(steps):
        grid = np.zeros((GRID_HEIGHT, GRID_WIDTH), dtype=np.uint8)
        for robot in robots:
            robot["position"]["x"] = (robot["position"]["x"] + robot["velocity"]["x"] + GRID_WIDTH) % GRID_WIDTH
            robot["position"]["y"] = (robot["position"]["y"] + robot["velocity"]["y"] + GRID_HEIGHT) % GRID_HEIGHT
            grid[robot["position"]["y"], robot["position"]["x"]] = 255
        display_grid = cv2.resize(grid, (GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE), interpolation=cv2.INTER_NEAREST)
        output_path = os.path.join("image", f"frame_{step + 1:03d}.png")
        cv2.imwrite(output_path, display_grid)
        print(f"Frame {step + 1} saved to {output_path}")
    cv2.destroyAllWindows()
simulate(100000000)
