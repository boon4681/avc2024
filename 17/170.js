
const fs = require('fs');

const [a, b, c, ___, p] = fs.readFileSync('./input.txt', 'utf8').replaceAll("\r", "").split('\n');

let A = Number(a.slice(12))
let B = Number(b.slice(12))
let C = Number(c.slice(12))
let P = p.slice(9).split(",").map(Number)

let reg_A = A;
let reg_B = B;
let reg_C = C;
let pointer = 0
let output = []
console.log(A, B, C, P)

const operator = (opr) => {
    switch (opr) {
        case 0: return 0;
        case 1: return 1;
        case 2: return 2;
        case 3: return 3;
        case 4: return reg_A;
        case 5: return reg_B;
        case 6: return reg_C;
        default: throw new Error(``);
    }
}

while (pointer < P.length) {
    const opcode = P[pointer];
    const operand = P[pointer + 1];

    switch (opcode) {
        case 0:
            reg_A = Math.trunc(reg_A / Math.abs(Math.pow(2, operator(operand))));
            break;
        case 1:
            reg_B ^= operand;
            break;
        case 2:
            reg_B = operator(operand, true) & 7;
            break;
        case 3:
            if (reg_A !== 0) {
                pointer = operand;
                continue;
            }
            break;
        case 4:
            reg_B ^= reg_C;
            break;
        case 5:
            output.push(operator(operand) & 7);
            break;
        case 6:
            reg_B = Math.trunc(reg_A / 2 ** operator(operand));
            break;
        case 7:
            reg_C = Math.trunc(reg_A / 2 ** operator(operand));
            break;
        default:
            throw new Error(``);
    }

    pointer += 2;
}

console.log(output.join(","))