import { OBJECT_TYPE, DIRECTIONS } from "./setup";

/// primitive random movement

export function randomMovement(position, direction, objectExist) {

    let dir = direction
    let nextMovePos = position + dir.movement
    const keys = Object.keys(DIRECTIONS);
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
const getDistance = (pac, gho) => {
    let pacman = getToaDo(pac)
    let ghost = getToaDo(gho)
    return Math.sqrt((pacman.x - ghost.x) * (pacman.x - ghost.x) + (pacman.y - ghost.y) * (pacman.y - ghost.y))
}
export function AIGo(position, direction, objectExist) {
    let dir = direction
    let nextMovePos = position + dir.movement
    let pacman = localStorage.getItem('pacman')
    const keys = Object.keys(DIRECTIONS);
    let n = 3
    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)
    ) {
        if (!pacman) {
            const key = keys[Math.floor(Math.random() * keys.length)]//0-3
            dir = DIRECTIONS[key]
            nextMovePos = position + dir.movement
        } else {
            let initDistance = getDistance(position, pacman)
            console.log('initDistance',initDistance)
            while(n>=0){
                let k = keys[n]
                console.log(n)
                console.log(DIRECTIONS.ArrowUp.movement)
                let distance = getDistance(pacman,position+DIRECTIONS.k.movement)
                if(distance<initDistance){
                    console.log('new:',distance)
                }
                n--
            }
            dir = DIRECTIONS[n]
            nextMovePos = position + dir.movement
        }

    }
    return { nextMovePos, direction: dir }
}