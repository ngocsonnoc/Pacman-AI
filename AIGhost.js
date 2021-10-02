import { OBJECT_TYPE, DIRECTIONS, GRID_SIZE, CELL_SIZE } from "./setup";

function getDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}
function removeFromArray(arr, cur) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === cur) {
            arr.splice(i, 1)
        }
    }
}
const getToaDo = (pos) => {
    let x = pos % 20
    let y = 0 - (pos - pos % 20)
    return { x, y }
}
function pushArr(n, index) {
    var temp = []
    for (var i = 0; i < n; i++) {
        temp.push(index)
        index++
    }
    return temp
}
function pushArrY(n, index, jump) {
    var temp = []
    for (var i = 0; i < n; i++) {
        temp.push(index)
        index = index + jump
    }
    return temp
}
function isInArr(e, arr) {
    var result = false
    if (arr.length > 0) {
        arr.forEach(element => {
            if (element === e) result = true
        });
    }
    return result
}
const addNeighbors = (pos) => {
    
    if (!isInArr(pos, ox)) {
        this.neighbors.push(pos - 1)
    }
    if (!isInArr(pos, oxMax)) {
        this.neighbors.push(pos + 1)
    }
    if (!isInArr(pos, oy)) {
        this.neighbors.push(pos - 20)
    }
    if (!isInArr(pos, oyMax)) {
        this.neighbors.push(pos + 20)
    }
    return pos.neighbors = this.neighbors
}

export function AStarMove(position, direction, objectExist) {
    let openSet = []
    let closeSet = []
    let neighbors = []
    let comeFrom = 0
    let dir = direction
    var ox = pushArr(20, 0)
    var oy = pushArrY(20, 0, 20)
    var oxMax = pushArr(20, 400)
    var oyMax = pushArrY(20, 19, 20)
    let nextMovePos = position + dir.movement
   


}