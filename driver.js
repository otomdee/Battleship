import { Ship, Gameboard, Player } from "./battleship.js";

//player1
let player1 = new Player("player");
player1.Gameboard.placeShips();
const board = player1.Gameboard.board;
renderBoard(board, "player");

//comp
let comp = new Player("comp");
comp.Gameboard.placeShips();
renderBoard(comp.Gameboard.board, "comp");



function renderBoard(playerBoard, type) {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    if (type === "player") {
        document.querySelectorAll(".boardWrap")[0].append(boardDiv);
    }
    else if ( type === "comp") {
        document.querySelectorAll(".boardWrap")[1].append(boardDiv);
    } 
    let letterIndices = ["","A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let index = 0;
    //letterIndices
    let columnDiv = document.createElement("div");
    boardDiv.append(columnDiv);
    columnDiv.classList.add("boardColumn");
    for (let i = 0; i < 11; i++) {
        let spotDiv = document.createElement("div");
        spotDiv.innerHTML = letterIndices[i];
        spotDiv.classList.add("indexSpot");
        columnDiv.append(spotDiv);
    }
    let numIndex = 1;
    Object.keys(playerBoard).forEach((column) => {
        let columnDiv = document.createElement("div");
        boardDiv.append(columnDiv);
        columnDiv.classList.add("boardColumn");
        //change column tracker
        let columnRev = "A";
        for (let i = 0; i < 11; i++) {
            let spotDiv = document.createElement("div");
            if (i === 0) {
                spotDiv.innerHTML = index + 1;
                spotDiv.classList.add("indexSpot");
                columnDiv.append(spotDiv);
                index++;
            }
            else {
                if (playerBoard[columnRev][numIndex]) {
                    spotDiv.classList.add("shipSpot");
                    columnDiv.append(spotDiv);
                    columnRev = shiftString(columnRev);
                }
                else {
                    spotDiv.classList.add("spot");
                    columnDiv.append(spotDiv);
                    columnRev = shiftString(columnRev);
                }
            }
        }
        numIndex++;
    })
}

function shiftString(char) {
   return String.fromCharCode((((char.charCodeAt(0)) - 65 + 1) % 26) + 65);
}