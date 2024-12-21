

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

class PriorityQueue{
    constructor(){
        this.values = [];
    }
    
    enqueue(node, priority){
        var flag = false;
        for(let i=0; i<this.values.length; i++){
            if(this.values[i].priority>priority){
                this.values.splice(i, 0, {node, priority})
                flag = true;
                break;
            }
        }
        if(!flag){
            this.values.push({node, priority})
        }
    }
    
    dequeue(){
        return this.values.shift()
    }
    
    size(){
        return this.values.length;
    }
}

const grid = (text) => {
    return new Grid(text)
}

module.exports = {
    grid,
    PriorityQueue
}