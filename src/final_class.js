class Grass {
    constructor(i, j) {
        this.i = i
        this.j = j
        this.direction = [
            [this.i - 1, this.j - 1],
            [this.i - 1, this.j],
            [this.i - 1, this.j + 1],
            [this.i, this.j - 1],
            [this.i, this.j + 1],
            [this.i + 1, this.j - 1],
            [this.i + 1, this.j],
            [this.i + 1, this.j + 1]
        ]
        this.t = 0
    }
    find_empty(n) {
        let empty = []
        for (let index = 0; index < this.direction.length; index++) {
            let i = this.direction[index][0]
            let j = this.direction[index][1]
            if (i >= 0 && j >= 0 && i < sizem && j < sizem && matrix[i][j] == n) {
                empty.push(this.direction[index])
            }
        }
        return empty
    }
    fill_grass() {
        if (this.t >= 2) {
            let freeGrass = this.find_empty(0)
            let randGrass = random(freeGrass)
            if (freeGrass.length != 0) {
                let y = randGrass[0]
                let x = randGrass[1]
                matrix[y][x] = 1
                GrassArray.push(new Grass(y, x))
            }
            this.t = 0
        }
        this.t++
    }
}
class GrassEat {
    constructor(y, x) {
        this.y = y
        this.x = x
        this.direction = []
        this.energy = 4
    }
    updateDirection() {
        this.direction = [
            [this.y - 1, this.x - 1],
            [this.y - 1, this.x],
            [this.y - 1, this.x + 1],
            [this.y, this.x - 1],
            [this.y, this.x + 1],
            [this.y + 1, this.x - 1],
            [this.y + 1, this.x],
            [this.y + 1, this.x + 1],
            [this.y - 1, this.x - 2],
            [this.y - 2, this.x - 1],
            [this.y - 2, this.x + 1],
            [this.y + 1, this.x - 2],
            [this.y + 2, this.x - 1],
            [this.y + 2, this.x + 1],
            [this.y + 1, this.x + 2],
            [this.y, this.x - 2],
            [this.y - 2, this.x],
            [this.y + 2, this.x],
            [this.y, this.x + 2],
        ]
    }
    find_empty(num) {
        let arr = []
        this.updateDirection()
        for (let ind in this.direction) {
            let y = this.direction[ind][0]
            let x = this.direction[ind][1]
            if (x >= 0 && y >= 0 && x < sizem && y < sizem && matrix[y][x] == num) {
                arr.push(this.direction[ind])
            }
        }
        return arr
    }
    eatGrass() {
        let arr = this.find_empty(1)
        if (arr.length != 0) {
            let arr1 = random(arr)
            let y = arr1[0]
            let x = arr1[1]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            for (let ind in GrassArray) {
                if (GrassArray[ind].i == y && GrassArray[ind].j == x) {
                    GrassArray.splice(ind, 1)
                    break
                }
            }
            this.y = y
            this.x = x
            this.energy++
        } else
            this.energy -= 2
    }
    moveOne() {
        let arr = this.find_empty(0)
        if (arr.length != 0) {
            let arr1 = random(arr)
            let y = arr1[0]
            let x = arr1[1]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
        }
        this.energy--
    }
    mulOne() {
        let arr = this.find_empty(0)
        if (arr.length != 0) {
            let arr1 = random(arr)
            let y = arr1[0]
            let x = arr1[1]
            matrix[y][x] = 2
            GrassEatterArray.push(new GrassEat(y, x))
        }
    }
    dieOne() {
        matrix[this.y][this.x] = 0
        for (let ind in GrassEatterArray) {
            if (GrassEatterArray[ind].x == this.x && GrassEatterArray[ind].y == this.y) {
                GrassEatterArray.splice(ind, 1)
                break;
            }
        }
    }
    AllFunc() {
        if (this.energy > 0) {
            if (this.energy > 15 && this.find_empty(0).length != 0) {
                this.mulOne()
            }
            if (this.find_empty(1).length != 0) {
                this.eatGrass()
            }
            else {
                this.moveOne()
            }
        } else {
            this.dieOne()
        }
    }
}
class Plane {
    constructor() {
        this.x = 2
        this.y = 2
        this.direction = []
        this.p = 0
    }
    updateDirection() {
        this.direction = [
            [this.y - 2, this.x - 2],
            [this.y - 2, this.x + 1],
            [this.y - 1, this.x - 1],
            [this.y - 1, this.x + 1],
            [this.y, this.x],
            [this.y, this.x + 1],
            [this.y + 1, this.x - 2],
            [this.y + 1, this.x - 1],
            [this.y + 1, this.x],
            [this.y + 1, this.x + 1],
            [this.y + 2, this.x + 2],
        ]
    }
    deleteAll() {
        this.updateDirection()
        for (let key in this.direction) {
            let y = this.direction[key][0]
            let x = this.direction[key][1]
            matrix2[y][x] = 0
        }
        this.x += 2
        this.y += 2
        this.updateDirection()
    }
    fillAll() {

        this.updateDirection()

        for (let key in this.direction) {
            let y = this.direction[key][0]
            let x = this.direction[key][1]
            matrix2[y][x] = 4
        }
        if (this.p == 4) {
            this.deleteAll()
            for (let key in this.direction) {
                let y = this.direction[key][0]
                let x = this.direction[key][1]
                if (y == x && x >= matrix2.length) {
                    this.x = 2
                    this.y = 2
                    PlaneArr.push(new Plane())
                }
            }
            this.p = 0
        }
        this.p++
    }
}
class Bomb {
    constructor() {
        this.tnt = []
        this.bomb = []
        this.p1 = 0
    }
    updateBomb() {
        let i = Math.round(Math.random() * (matrix.length - 7))
        let j = Math.round(Math.random() * (matrix.length - 7))
        this.tnt = [
            [i + 2, j + 2],
            [i + 2, j + 3],
            [i + 2, j + 4],
            [i + 3, j + 2],
            [i + 3, j + 3],
            [i + 3, j + 4],
            [i + 4, j + 2],
            [i + 4, j + 3],
            [i + 4, j + 4],
        ]
        this.bomb = [
            [i + 5, j + 1],
            [i + 1, j + 1],
            [i + 5, j + 5],
            [i + 1, j + 5],
            [i, j],
            [i + 1, j],
            [i + 2, j],
            [i + 3, j],
            [i + 4, j],
            [i + 5, j],
            [i + 6, j],
            [i + 6, j + 1],
            [i + 6, j + 2],
            [i + 6, j + 3],
            [i + 6, j + 4],
            [i + 6, j + 5],
            [i + 6, j + 6],
            [i, j + 6],
            [i + 1, j + 6],
            [i + 2, j + 6],
            [i + 3, j + 6],
            [i + 4, j + 6],
            [i + 5, j + 6],
            [i, j + 1],
            [i, j + 2],
            [i, j + 3],
            [i, j + 4],
            [i, j + 5],
            [i + 1, j + 2],
            [i + 1, j + 3],
            [i + 1, j + 4],
            [i + 2, j + 1],
            [i + 3, j + 1],
            [i + 4, j + 1],
            [i + 2, j + 5],
            [i + 3, j + 5],
            [i + 4, j + 5],
            [i + 5, j + 2],
            [i + 5, j + 3],
            [i + 5, j + 4],
        ]
    }
    Boom() {
        for (let key in this.tnt) {
            let y = this.tnt[key][0]
            let x = this.tnt[key][1]

            for (let key1 in GrassArray) {
                if (GrassArray[key1].i == y && GrassArray[key1].j == x) {
                    GrassArray.splice(key1, 1)
                }
            }
            for (let key1 in GrassEatterArray) {
                if (GrassEatterArray[key1].y == y && GrassEatterArray[key1].x == x) {
                    GrassEatterArray.splice(key1, 1)
                }
            }
            matrix[y][x] = 0
        }
        for (let key in this.bomb) {
            let y = this.bomb[key][0]
            let x = this.bomb[key][1]

            for (let key1 in GrassArray) {
                if (GrassArray[key1].i == y && GrassArray[key1].j == x) {
                    GrassArray.splice(key1, 1)
                }
            }
            for (let key1 in GrassEatterArray) {
                if (GrassEatterArray[key1].y == y && GrassEatterArray[key1].x == x) {
                    GrassEatterArray.splice(key1, 1)
                }
            }
            matrix[y][x] = 0
        }
    }
    FBomb() {
        for (let key in this.tnt) {
            let y = this.tnt[key][0]
            let x = this.tnt[key][1]

            for (let key1 in GrassArray) {
                if (GrassArray[key1].i == y && GrassArray[key1].j == x) {
                    GrassArray.splice(key1, 1)
                }
            }
            for (let key1 in GrassEatterArray) {
                if (GrassEatterArray[key1].y == y && GrassEatterArray[key1].x == x) {
                    GrassEatterArray.splice(key1, 1)
                }
            }
            matrix[y][x] = 5
        }
    }
    getTNTxy() {
        return this.tnt[0]
    }
}
class Snake {
    constructor(i, j) {
        this.i = i
        this.j = j
        this.Snk = [
            [this.i, this.j + 1],
            [this.i, this.j + 2],
            [this.i, this.j + 3],
            [this.i, this.j + 4],
            [this.i, this.j + 5],
            [this.i, this.j + 6],
            [this.i, this.j + 7],
            [this.i, this.j + 8],
            [this.i, this.j + 9],
            [this.i, this.j + 10],
            [this.i, this.j + 11],
            [this.i, this.j + 12],
            [this.i, this.j + 13],
            [this.i, this.j + 14],
        ]
    }
    fillSnake() {
        let leng = this.Snk.length - 1
        let y = this.Snk[leng][0]
        let x = this.Snk[leng][1]
        let zan = [
            [y, (x - 1)],
            [y, (x + 1)],
            [(y - 1), x],
            [(y + 1), x]
        ]
        let emptyZan = []
        for (let key in zan) {
            if (zan[key][0] >= 0 && zan[key][1] >= 0 && zan[key][0] < sizem && zan[key][1] < sizem && matrix[zan[key][0]][zan[key][1]] != 6) {
                emptyZan.push(zan[key])
            }
        }

        if (emptyZan.length != 0) {
            let andSnk = random(emptyZan)
            if (andSnk == 2) {
                for (let key1 in GrassEatterArray) {
                    if (GrassEatterArray[key1].y == andSnk[0] && GrassEatterArray[key1].x == andSnk[1]) {
                        GrassEatterArray.splice(key1, 1)
                    }
                }
            }
            this.Snk.push(andSnk)
            let a1 = this.Snk[0][0]
            let b1 = this.Snk[0][1]
            matrix[a1][b1] = 0
            this.Snk.splice(0, 1)
            for (let key in this.Snk) {
                a1 = this.Snk[key][0]
                b1 = this.Snk[key][1]
                matrix[a1][b1] = 6
            }
            matrix[andSnk[0]][andSnk[1]] = -1
            
        } else {
            for (let key in SnakeArray) {
                let y = SnakeArray[key][0]
                let x = SnakeArray[key][1]
                if (y == this.y && x == this.x) {

                    for (let key1 in this.Snk) {
                        let y1 = this.Snk[key1][0]
                        let x1 = this.Snk[key1][1]
                        matrix[y1][x1] = 0
                    }
                    SnakeArray.splice(key, 1)
                    let i1 = Math.round(Math.random() * (matrix.length - 15))
                    let j1 = Math.round(Math.random() * (matrix.length - 15))
                    SnakeArray.push(new Snake(i1, j1))
                    break
                }
            }
        }
    }
}
