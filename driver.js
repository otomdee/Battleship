import { Ship, Gameboard, Player } from "./battleship.js";

//player1
let player1 = new Player("player");
player1.Gameboard.placeShips();

//render UI board
const board = player1.Gameboard.board;
renderBoard(board);

function renderBoard(playerBoard) {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");
    document.querySelectorAll(".boardWrap")[0].append(boardDiv);

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
    Object.keys(playerBoard).forEach((column) => {
        let columnDiv = document.createElement("div");
        boardDiv.append(columnDiv);
        columnDiv.classList.add("boardColumn");
        for (let i = 0; i < 11; i++) {
            let spotDiv = document.createElement("div");
            if (i === 0) {
                spotDiv.innerHTML = index + 1;
                spotDiv.classList.add("indexSpot");
                columnDiv.append(spotDiv);
                index++;
            }
            else {
                spotDiv.classList.add("spot");
                columnDiv.append(spotDiv);
            }
        }
    })
}