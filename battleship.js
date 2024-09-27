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

        let spots = [
            [["A", 6]],
            [["A", 2], ["B", 2]],
            [["D", 5], ["E", 5], ["F", 5]],
            [["B", 10], ["C", 10], ["D", 10], ["E", 10]],
            [["B", 4]],
            [["G", 1], ["G", 2]],
            [["H", 6], ["I", 6], ["J", 6]],
            [["D", 3]],
            [["H", 8], ["I", 8]],
            [["H", 4]]
        ]

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
    }
}