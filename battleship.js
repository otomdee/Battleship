class Ship {
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

class Gameboard {
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

class Player {
    constructor(type) {
        this.type = type;
        this.Gameboard = new Gameboard;
    }
}