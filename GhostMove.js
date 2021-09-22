import { OBJECT_TYPE, DIRECTIONS } from "./setup";

/// primitive random movement

export function randomMovement(position, direction, objectExist) {
    let dir = direction
    let nextMovePos = position + dir.movement
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
    let toaDoGhost = getToaDo(position)
    let toaDoPacman = getToaDo(pacman)
    let dir = direction
    let keys = []
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

    } else if(toaDoGhost.y===toaDoGhost.x){
        if (toaDoGhost.x > toaDoPacman.x) {
            keys.push('ArrowLeft')
        } else {
            keys.push('ArrowRight')
        }
    }
    const key = keys[Math.floor(Math.random() * keys.length)]//0-3
    // set next move
    dir = DIRECTIONS[key]
    //set the next move
    let nextMovePos = position + dir.movement
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