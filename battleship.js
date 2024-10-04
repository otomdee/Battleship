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

function load(bigArray, newArray) {
    bigArray.forEach((array) => {
        array.forEach((item) => {
            if (!(newArray.includes(item))) {
                newArray.push(item);
            }
        })
    })
}

function ships() {
    let shipSizes = [1,2,3,4,1,2,3,1,2,1];
    let spots = [];
    let allSpots = [];
    //create a ship, check if it is fully free
    shipSizes.forEach((size) => {

        let allFree;
        let ship;
        do {
                allFree = true;
                ship = createShip(size, "right");
                ship.forEach((spot) => {
                    if (includesArray(allSpots, spot)) {
                        allFree = false;
                    }
                })
        }
        while (allFree === false);
        spots.push(ship);
        load(spots, allSpots);
        //one box gap around each spot
        createGapsDown(ship, allSpots);
    })
    return spots;
}

function createShip(size, direction) {
    let columnArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let columnIndex = (Math.floor(Math.random() * 10));
    let column = columnArr[columnIndex];
    let index = Math.floor(Math.random() * (11 - 1) + 1);
    let ship = [];
    if (size === 1) {
        ship.push([column, index]);
    }
    else {
        if (direction === "down") {
            for (let i = 0; i < size; i++) {
                if ((index + i) < 11) {
                    ship.push([column, index + i]);
                }
            }
        }
        else if (direction === "right") {
            for (let i = 0; i < size; i++) {
                if ((columnArr[columnIndex + i])) {
                    ship.push([columnArr[columnIndex + i], index]);
                }
            }
        }
    }

    if (ship.length === size) {
        return ship;
    }

    else {
        return createShip(size, direction);
    }
}

function createGapsDown(ship, allSpots) {

    ship.forEach((spot) => {
        let gapDown = [spot[0], spot[1] + 1];
        if(!(includesArray(allSpots, gapDown))) {
            allSpots.push(gapDown);
        }
        let gapUp = [spot[0], spot[1] - 1];
        if(!(includesArray(allSpots, gapUp))) {
            allSpots.push(gapUp);
        }
    })

    let firstSpot = ship[0];
    let gapLeft = [shiftChar(firstSpot[0], -1), firstSpot[1]];
    if(!(includesArray(allSpots, gapLeft))) {
        allSpots.push(gapLeft);
        allSpots.push([gapLeft[0], gapLeft[1] - 1]);
        allSpots.push([gapLeft[0], gapLeft[1] + 1]);
    }

    let lastSpot = ship[ship.length - 1];
    let gapRight = [shiftChar(lastSpot[0], 1), lastSpot[1]];
    if(!(includesArray(allSpots, gapRight))) {
        allSpots.push(gapRight);
        allSpots.push([gapRight[0], gapLeft[1] - 1]);
        allSpots.push([gapRight[0], gapLeft[1] + 1]);
    }
}

function shiftChar(char, key) {
    let charCode = char.charCodeAt(0);

    return String.fromCharCode((charCode + key));
}