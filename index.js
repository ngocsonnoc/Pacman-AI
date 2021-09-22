import { DIRECTIONS, LEVEL, OBJECT_TYPE } from "./setup";
import GameBoard from "./GameBoard";
import Pacman from "./Pacman";
import { randomMovement,AIGo } from "./GhostMove";
import Ghost from "./Ghost";
import soundDot from './sounds/munch.wav'
import soundPill from './sounds/pill.wav'
import soundGameStart from './sounds/game_start.wav'
import soundGameOver from './sounds/death.wav'
import soundGhost from './sounds/eat_ghost.wav'

function playAudio(audio) {
    const soundEffect = new Audio(audio)
    soundEffect.play()
}
//dinh nghia cac phan tu trong DOM
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score')
const startButton = document.querySelector('#start-button')


// dinh nghia cac hang so 
const POWER_PILL_TIME = 10000
const GLOBAL_SPEED = 80 // ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL)

// setup

let score = 0
let timer = null
let gameWin = false
let powerPillActive = false
let powerPillTimer = null

function gameOver(pacman, grid) {
    playAudio(soundGameOver)
    document.removeEventListener('keydown', e => {
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    })
    gameBoard.showGameStatus(gameWin)

    clearInterval(timer)
    startButton.classList.remove('hide')
}
function checkCollision(pacman, ghosts) {
    const collidedGhost = ghosts.find(ghost => pacman.pos === ghost.pos)
    if (collidedGhost) {
        if (pacman.powerPill) {
            playAudio(soundGhost)
            gameBoard.removeObject(collidedGhost.pos, [
                OBJECT_TYPE.GHOST,
                OBJECT_TYPE.SCARED,
                collidedGhost.name
            ])
            collidedGhost.pos = collidedGhost.startPos
            score += 100
        } else {
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN])
            gameBoard.rotateDiv(pacman.pos, 0)
            gameOver(pacman, gameGrid)
        }
    }
}

function gameLoop(pacman, ghosts) {
    localStorage.setItem('pacman',pacman.pos)
    gameBoard.moveCharacter(pacman)
    checkCollision(pacman, ghosts)
    ghosts.forEach(ghost => gameBoard.moveCharacter(ghost))
    checkCollision(pacman, ghosts)
   
    // kiem tra pacman an diem

    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
        playAudio(soundDot)
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT])
        gameBoard.dotCount--
        score += 10
    }
    // check pacman an diem to
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
        playAudio(soundPill)
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL])
        pacman.powerPill = true
        score += 50
        clearTimeout(powerPillTimer)
        powerPillTimer = setTimeout(() => (pacman.powerPill = false),
            POWER_PILL_TIME)

    }
    // ghost in mode power pill
    if (pacman.powerPill !== powerPillActive) {
        powerPillActive = pacman.powerPill
        ghosts.forEach(ghost => (ghost.isScared = pacman.powerPill))
    }

    // kiem tra an het diem
    if (gameBoard.dotCount === 0) {
        gameWin = true
        gameOver(pacman, ghosts)
    }
    // show scrollBehavior:
    scoreTable.innerHTML = score
}


function startGame() {
    playAudio(soundGameStart)
    gameWin = false
    powerPillActive = false
    score = 0
    startButton.classList.add('hide')
    gameBoard.createGrid(LEVEL)
    const pacman = new Pacman(50, 0)// speed 2 vi tri 287
    gameBoard.addObject(0, [OBJECT_TYPE.PACMAN]);// dat pacman o vi tri 287
    document.addEventListener('keydown', (e) =>
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    )
   
    // add ghost
    const ghosts = [
        new Ghost(300, 6, randomMovement, OBJECT_TYPE.BLINKY),
        // new Ghost(300, 209, AIGo, OBJECT_TYPE.INKY),
        // new Ghost(250, 230, randomMovement, OBJECT_TYPE.CLYDE),
        // new Ghost(270, 251, randomMovement, OBJECT_TYPE.PINKY)
    ]

    timer = setInterval(() => {
        gameLoop(pacman, ghosts), GLOBAL_SPEED
    })
}
// initialize game 

startButton.addEventListener('click', startGame)