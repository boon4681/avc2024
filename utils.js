

class Grid {
    data = []
    constructor(text) {
        this.data = text.replaceAll("\r", "").split("\n").map(a => a.split(""))
    }

    get(x, y) {
        return this.data[y][x]
    }

    iter() {
        let i = 0
        let data = this.data
        return {
            [Symbol.iterator]: function* () {
                for (let y = 0; y < data.length; y++) {
                    for (let x = 0; x < data[0].length; x++) {
                        i++
                        yield { x, y, i, v: data[y][x] }
                    }
                }
            }
        }
    }
}

const grid = (text) => {
    return new Grid(text)
}

module.exports = {
    grid
}