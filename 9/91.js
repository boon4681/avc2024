const fs = require("fs")
// const file = fs.readFileSync("./sam.txt", "utf8")
const file = fs.readFileSync("./input.txt", "utf8")

const data = {};
let id = 0;
let nc = 0;
let e = false;

for (let m of file.trim()) {
    let n = Number(m);
    if (!e) {
        if (n != 0) data[nc] = { id, length: n };
        id++;
        e = true;
    } else {
        if (n != 0) data[nc] = { id: -1, length: n };
        e = false;
    }
    nc += n;
}

const list = Object.keys(data);
let n = 0;
while (n < list.length) {
    if (data[list[n]].id !== -1) {
        n++;
        continue;
    }

    let k = 1;
    while (n + k < list.length && data[list[n + k]].id === -1) {
        data[list[n]].length += data[list[n + k]].length;
        delete data[list[n + k]];
        k++;
    }
    n += k;
}

const vvvvv = Object.keys(data).reverse()
for (let i in vvvvv) {
    let b = vvvvv[Number(i)];
    if (data[b].id == -1) continue;
    for (let k in data) {
        let a = Number(k)
        if (a >= b) break;

        if (data[a].id == -1 && data[a].length >= data[b].length) {
            data[a].id = data[b].id;
            data[b].id = -1;

            if (data[a].length > data[b].length) {
                const start = a + data[b].length;
                const length = data[a].length - data[b].length;
                data[a].length = data[b].length;
                data[start] = { id: -1, length: length };
            }
            break;
        }
    }
}

let o = 0;
for (let v in data) {
    let k = Number(v)
    if (data[k].id === -1) continue;
    for (let n = k; n < k + data[k].length; n++) {
        o += data[k].id * n;
    }
}

console.log(o);