const fs = require("fs")

const input = fs.readFileSync("./input.txt", "utf8").replaceAll("\r", "").split("\n\n")
const gates = input[1].split('\n').filter(Boolean).map(line => line.match(/^(\S+) (AND|X?OR) (\S+) -> (\S+)$/)).map(matches => ({ left: matches[1], operator: matches[2], right: matches[3], output: matches[4] }));

function name(gate, newName) {
    for (const g of gates) {
        if (g.left === gate.output) {
            g.left = newName;
        }
        if (g.right === gate.output) {
            g.right = newName;
        }
    }
    gate.output = newName;
}

for (const gate of gates) {
    name(gate, gate.operator + '_' + gate.output);
}

console.log('digraph x {');
for (const gate of gates) {
    console.log(gate.left + ' -> ' + gate.output);
    console.log(gate.right + ' -> ' + gate.output);
}
console.log('}');