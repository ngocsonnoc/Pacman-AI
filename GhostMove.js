
import { OBJECT_TYPE, DIRECTIONS } from "./setup";

/// primitive random movement
// get distance 
function getDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}
export function randomMovement(position, direction, objectExist) {
    let dir = direction
    let nextMovePos = position + dir.movement
    console.log(dir)
    const keys = Object.keys(DIRECTIONS);//['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']
    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)
    ) {
        const key = keys[Math.floor(Math.random() * keys.length)]//0-3
        // set next move
        dir = DIRECTIONS[key]
        //set the next move

        nextMovePos = position + dir.movement
    }
    return { nextMovePos, direction: dir }

}
const getToaDo = (pos) => {
    let x = pos % 20
    let y = 0 - (pos - pos % 20)
    return { x, y }
}
export function AMovement(position, direction, objectExist) {
    let pacman = localStorage.getItem('pacman')
    let powerPill = localStorage.getItem('powerPill')
    let toaDoGhost = getToaDo(position)
    let toaDoPacman = getToaDo(pacman)
    let dir = direction
    let keys = []

    if (!powerPill) {
        if (toaDoGhost.x > toaDoPacman.x) {
            keys.push('ArrowLeft')
        } else if (toaDoGhost.x < toaDoPacman.x) {
            keys.push('ArrowRight')
        } else {
            if (toaDoGhost.y > toaDoPacman.y) {
                keys.push('ArrowDown')
            } else {
                keys.push('ArrowUp')

            }
        }
        if (toaDoGhost.y > toaDoPacman.y) {
            keys.push('ArrowDown')

        } else {
            keys.push('ArrowUp')
        }
        if (toaDoGhost.y > toaDoPacman.y) {
            keys.push('ArrowDown')

        } else if (toaDoGhost.y === toaDoGhost.x) {
            if (toaDoGhost.x > toaDoPacman.x) {
                keys.push('ArrowLeft')
            } else {
                keys.push('ArrowRight')
            }
        }
    }
    if (powerPill) {
        if (toaDoGhost.x > toaDoPacman.x) {
            keys.push('ArrowRight')
        } else if (toaDoGhost.x < toaDoPacman.x) {
            keys.push('ArrowLeft')
        } else {
            if (toaDoGhost.y > toaDoPacman.y) {
                keys.push('ArrowUp')
            } else {
                keys.push('ArrowDown')
            }
        }
        if (toaDoGhost.y > toaDoPacman.y) {
            keys.push('ArrowUp')

        } else {
            keys.push('ArrowDown')
        }
        if (toaDoGhost.y > toaDoPacman.y) {
            keys.push('ArrowUp')

        } else if (toaDoGhost.y === toaDoGhost.x) {
            if (toaDoGhost.x > toaDoPacman.x) {
                keys.push('ArrowRight')
            } else {
                keys.push('ArrowLeft')
            }
        }
    }

    const key = keys[0]//0-3
    // set next move
    dir = DIRECTIONS[key]
    //set the next move
    let nextMovePos = position + dir.movement

    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)
    ) {
        let key2 = Object.keys(DIRECTIONS)
        key2.push('ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowUp', 'ArrowUp', 'ArrowUp')
        // let index = arr.findIndex(dir)
        const key = key2[Math.floor(Math.random() * key2.length)]//0-3
        // set next move
        dir = DIRECTIONS[key]
        //set the next move

        nextMovePos = position + dir.movement
    }
    return { nextMovePos, direction: dir }

}
function getKeyFromMove(move) {
    switch (move) {
        case 1: return 'ArrowLeft'
        case -1: return 'ArrowRight'
        case 20: return 'ArrowDown'
        case -20: return 'ArrowUp'
            break
    }
}
function removeFromArray(arr, cur) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === cur) {
            arr.splice(i, 1)
            return arr
        }
    }
}
export function AStarMovement(position, direction, objectExist) {
    let pacman = localStorage.getItem('pacman')
    let powerPill = localStorage.getItem('powerPill')
    let toaDoGhost = getToaDo(position)
    let toaDoPacman = getToaDo(pacman)
    let dir = direction
    let nextMovePos = position + dir.movement;
    let comeFrom = direction;
    var keys = []
    const cameFrom = getKeyFromMove(direction.movement)
    //    if(isInArr(toaDoGhost.x,pushArr(0,19)) ){

    //    }
    if (toaDoGhost.x !== 0) {
        if (objectExist(position - 1, OBJECT_TYPE.WALL) === false &&
            objectExist(position - 1, OBJECT_TYPE.GHOST) === false ) {
            if(cameFrom !== 'ArrowLeft'){
                keys.push('ArrowLeft')
            }
        }
    }
    if (toaDoGhost.x !== 19) {
        if (objectExist(position + 1, OBJECT_TYPE.WALL) === false &&
            objectExist(position + 1, OBJECT_TYPE.GHOST) === false ) {
                if(cameFrom !== 'ArrowRight'){
                    keys.push('ArrowRight')
                }
            console.log(cameFrom)
        }
    }
    if (toaDoGhost.y !== 0) {
        if (objectExist(position - 20, OBJECT_TYPE.WALL) === false &&
            objectExist(position - 20, OBJECT_TYPE.GHOST) === false &&
            cameFrom !== 'ArrowDown') {
            keys.push('ArrowUp')
        }
    }
    if (toaDoGhost.y !== -420) {
        if (objectExist(position + 20, OBJECT_TYPE.WALL) === false &&
            objectExist(position + 20, OBJECT_TYPE.GHOST) === false &&
            cameFrom !== 'ArrowUp') {
            keys.push('ArrowDown')
        }
    }

    console.log('key:', keys)
    console.log(getToaDo(position))
    // const key1 = Object.keys(DIRECTIONS);//['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']
    var key = keys[0]
    var index = 0
    if(keys.length===1){
        index=0
    }
    if (keys.length > 1) {
        let distance = getDistance(toaDoPacman, getToaDo(position + DIRECTIONS[keys[0]].movement))
        for (var i = 0; i < keys.length; i++) {
            if (getDistance(toaDoPacman, getToaDo(position + DIRECTIONS[keys[i]].movement)) < distance) {
                distance = getDistance(toaDoPacman, getToaDo(position + DIRECTIONS[keys[i]].movement))
                index = i
            }
        }
    }
    dir = DIRECTIONS[keys[index]]
    //set the next move

    nextMovePos = position + dir.movement
    keys = []
    return { nextMovePos, direction: dir }

}
