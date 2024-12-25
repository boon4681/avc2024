const fs = require("fs")

const data = fs.readFileSync("./input.txt", "utf8").replaceAll('\r', '')
let sum = 0;
let f = function (e) {
    let lengths = new Array(e[0].length).fill(-1);

    for (var i = 0; i < e.length; i++) {
        for (let j = 0; j < e[i].length; j++) {
            if (e[i][j] == "#") lengths[j]++;
        }
    }

    return lengths
}

let keys = [];
let locks = [];
data.split("\n\n").map(kl => kl.split("\n").map(line => line.split(""))).forEach(kl => (kl[0][0] == "#") ? locks.push(kl) : keys.push(kl));

for (let i = 0; i < locks.length; i++) locks[i] = f(locks[i]);
for (let i = 0; i < keys.length; i++) keys[i] = f(keys[i]);

for (let i = 0; i < locks.length; i++) {
    for (let j = 0; j < keys.length; j++) {
        let lock = locks[i];
        let key = keys[j];
        let canAdd = true;

        for (let n = 0; n < lock.length; n++) {
            if (lock[n] + key[n] > 5) {
                canAdd = false;
            }
        }

        if (canAdd) sum++;
    }
}
console.log(sum);