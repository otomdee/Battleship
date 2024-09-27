import { Ship, Gameboard, Player } from "./battleship.js";

//player1
let player1 = new Player("player");
//populate ships
player1.Gameboard.placeShips();

//playerboard
const boardDiv = document.createElement("div");
boardDiv.classList.add("board");

//render UI board
const board = player1.Gameboard.board;

let letterIndices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

let p1IndexDiv = document.createElement("div");
p1IndexDiv.classList.add("topIndex");

document.querySelectorAll(".boardWrap")[0].append(p1IndexDiv);

for (let i = 0; i < 10; i++) {
    let spotDiv = document.createElement("div");
    spotDiv.innerHTML = letterIndices[i];
    spotDiv.classList.add("letterIndex");
    p1IndexDiv.append(spotDiv);
}

document.querySelectorAll(".boardWrap")[0].append(boardDiv);

Object.keys(board).forEach((column) => {
    let columnDiv = document.createElement("div");
    boardDiv.append(columnDiv);
    columnDiv.classList.add("boardColumn");
    for (let i = 0; i < 10; i++) {
        let spotDiv = document.createElement("div");
        spotDiv.classList.add("spot");
        columnDiv.append(spotDiv);
    }
})

//player2(comp)
let comp = new Player("comp");

//compBoard
const compDiv = document.createElement("div");
document.querySelectorAll(".boardWrap")[1].append(compDiv);

compDiv.classList.add("board");

//render UI board
const compBoard = comp.Gameboard.board;
Object.keys(compBoard).forEach((column) => {
    let columnDiv = document.createElement("div");
    compDiv.append(columnDiv);
    columnDiv.classList.add("boardColumn");
    for (let i = 0; i < 10; i++) {
        let spotDiv = document.createElement("div");
        spotDiv.classList.add("spot");
        columnDiv.append(spotDiv);
    }
})