var matrix = []
var matrix2 = []
var sizem = 50
var sizerect = 5
for (let i = 0; i < sizem; i++) {
    matrix[i] = []
    matrix2[i] = []
    for (let j = 0; j < sizem; j++) {
        matrix[i][j] = 0
        matrix2[i][j] = 0
    }
}
var GrassArray = []
var PlaneArr = []
var GrassEatterArray = []
PlaneArr.push(new Plane())
GrassArray.push(new Grass(25, 25))
GrassEatterArray.push(new GrassEat(27, 27))
var SnakeArray = []
var bomb = new Bomb()
function setup() {
    createCanvas(sizerect * sizem, sizerect * sizem)
    background("#acacac")
    frameRate(25)
    let i1 = Math.round(Math.random() * (matrix.length - 15))
    let j1 = Math.round(Math.random() * (matrix.length - 15))
    SnakeArray.push(new Snake(i1, j1))
}
var a = 6
let countB = 0
let leng = 0
function draw() {

    for (let key in SnakeArray) {
        SnakeArray[key].fillSnake()
    }
    for (let key in GrassArray) {
        GrassArray[key].fill_grass()
    }
    for (let key in GrassEatterArray) {
        GrassEatterArray[key].AllFunc()
    }
    for (let key in PlaneArr) {
        PlaneArr[key].fillAll()
    }
    bomb.FBomb()
    for (let i = 0; i < sizem; i++) {
        for (let j = 0; j < sizem; j++) {
            if (matrix[i][j] == -1) {
                fill("black")
            }
            if (matrix[i][j] == 0)
                fill("#dee2e6")
            if (matrix[i][j] == 1)
                fill("#6b705c")
            if (matrix[i][j] == 2)
                fill("#fcbf49")
            if (matrix[i][j] == 6)
                fill("#52b788")
            rect(j * sizerect, i * sizerect, sizerect, sizerect)
            if (matrix[i][j] == 5) {
                fill('#d00000')
                rect(j * sizerect, i * sizerect, sizerect, sizerect)
                textSize(sizerect + 2);
                let tnt = bomb.getTNTxy()
                fill('black')
                text("TNT", tnt[1] * sizerect + sizerect / 5, tnt[0] * sizerect + 2 * sizerect);
            }
            if (matrix2[i][j] == 4) {
                fill("#355070")
                rect(j * sizerect, i * sizerect, sizerect, sizerect)
            }
            strokeWeight(0);
        }
    }
    let y11 = Math.round(Math.random() * (matrix.length - 1))
    let x11 = Math.round(Math.random() * (matrix.length - 1))
    if (GrassArray.length == 0) {
        GrassArray.push(new Grass(y11, x11))
        if (matrix[y11][x11] == 0)
            matrix[y11][x11] = 1
    }
    if (GrassEatterArray.length == 0) {
        GrassEatterArray.push(new GrassEat(y11, x11))
        if (matrix[y11][x11] == 1 || matrix[y11][x11] == 0)
            matrix[y11][x11] = 2
    }
    if (countB >= 4) {
        bomb.Boom()
        bomb.updateBomb()
        countB = 0
    }
    countB++
}

