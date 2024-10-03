export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;
        this.isSunk();
    }
    isSunk() {
        if (this.hits === this.length) this.sunk = true;
        else this.sunk = false;
    }
}

export class Gameboard {
    constructor() {
        this.board = this.generateBoard();
        this.ships = this.generateShips();
        this.sunkState = false;
        this.hitSpots = [];
    }
    //board is object with keys A to J
    generateBoard() {
        let board = {A : [], 
            B : [], 
            C : [], 
            D : [], 
            E : [], 
            F : [], 
            G : [], 
            H : [], 
            I : [], 
            J : []
        };
            return board;
    }

    generateShips() {
        let shipsArray = [];
        for(let i = 0; i < 4; i++) {
            shipsArray.push(new Ship(1));
            if (i < 3) shipsArray.push(new Ship(2));
            if (i < 2) shipsArray.push(new Ship(3));
            if (i == 0) shipsArray.push(new Ship(4));
        }
        return shipsArray;
    }

    placeShip(ship, coordinate) {
        this.board[coordinate[0]][coordinate[1]] = ship;
    }

    placeShips() {
        let spots = ships();

        for (let i = 0; i < 10; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < ship.length; j++) {
                this.placeShip(ship, spots[i][j]);
            }
        }
    }

    recieveAttack(coordinate) {
        //determines wether attack hit ship
        let spot = this.board[coordinate[0]][coordinate[1]];
        if (spot && (spot !== "missed")) {
            spot.hit();
            this.shipsState();
        }
        else {
            this.board[coordinate[0]][coordinate[1]] = "missed";
        }

        //if spot hasn't been hit, hit it
        if (!(includesArray(this.hitSpots, coordinate))) {
            this.hitSpots.push(coordinate);
        }
    }

    shipsState() {
        let allSunk = true;
        this.ships.forEach((ship) => {
            if (ship.sunk === false) allSunk = false;
        })

        if (allSunk === true) this.sunkState = true;
    }
}

export class Player {
    constructor(type) {
        this.type = type;
        this.Gameboard = new Gameboard;
        this.name = "comp";
    }
}

function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function includesArray(largeArray, arr) {
let includes = false;
largeArray.forEach((item) => {
    if (compareArrays(arr, item)) includes = true;
})
return includes;
}

function ships() {
    let shipSizes = [1,2,3,4,1,2,3,1,2,1];
        let spots = []
        let allSpots = [];
        //pick a random spot
        let columnArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        let column = columnArr[(Math.floor(Math.random() * 10))];
        let index = Math.floor(Math.random() * (11 - 1) + 1);
        let size = 0;
        //for each ship
        for(let i = 1; i < 11; i++) {
            let ship = [];
            //pick random spot
                while(includesArray(allSpots, [column, index])) {
                    column = columnArr[(Math.floor(Math.random() * 10))];
                    index = Math.floor(Math.random() * (11 - 1) + 1);
                }
            //if ship length is 1, place ship immediately
            if ([1,5,8,10].includes(i)) {
                ship.push([column, index]);
                spots.push(ship);
                size++;
            }
            //else check for free adjacent spots to place longer ships
            else {
                //down
                let placed = false;
                let allFree = true;

                do {
                    for(let j = 1; j < shipSizes[size]; j++) {
                        //check that spots downward are on the board and free
                        if ((index + j) > 10) {
                            allFree = false;
                        }
                        if(includesArray(allSpots, [column, index + j])) {
                            allFree = false;
                        }
                    }
                    if (allFree === true) {
                        for(let k = 0; k < shipSizes[size]; k++) {
                            ship.push([column, index + k]);
                        }
                        spots.push(ship);
                        size++;
                        placed = true;
                        console.log(ship);
                    }
                    else {
                        //pick another random spot
                        column = columnArr[(Math.floor(Math.random() * 10))];
                        index = Math.floor(Math.random() * (11 - 1) + 1);
                        //check that it isn't filled
                        while(includesArray(allSpots, [column, index])) {
                            column = columnArr[(Math.floor(Math.random() * 10))];
                            index = Math.floor(Math.random() * (11 - 1) + 1);
                        }
                    }
                }
                while (placed === false)
            }
        load(spots, allSpots);
        }
        console.log(spots);
        return spots;
}

function load(bigArray, newArray) {
    bigArray.forEach((array) => {
        array.forEach((item) => {
            if (!(newArray.includes(item))) {
                newArray.push(item);
            }
        })
    })
}