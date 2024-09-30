import { Ship, Gameboard, Player } from "./battleship.js";

//player1
let player1 = new Player("player");
player1.Gameboard.placeShips();
renderBoard(player1.Gameboard, player1.type);

//comp
let comp = new Player("comp");
comp.Gameboard.placeShips();
renderBoard(comp.Gameboard, comp.type);


function renderBoard(playerBoard, type) {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    if (type === "player") {
        document.querySelectorAll(".boardWrap")[0].innerHTML = "";
        document.querySelectorAll(".boardWrap")[0].append(boardDiv);
    }
    else if (type === "comp") {
        document.querySelectorAll(".boardWrap")[1].innerHTML = "";
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
    Object.keys(playerBoard.board).forEach((column) => {
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
                let columnRevEvent = columnRev;
                let numIndexEvent = numIndex;
                if (playerBoard.board[columnRev][numIndex] === "missed") {
                    spotDiv.classList.add("missedSpot");
                    columnDiv.append(spotDiv);
                    columnRev = shiftString(columnRev);
                }
                else if (includesArray(playerBoard.hitSpots,[columnRev, numIndex])) {
                    spotDiv.classList.add("hitSpot");
                    columnDiv.append(spotDiv);
                    columnRev = shiftString(columnRev);
                }
                else if (playerBoard.board[columnRev][numIndex] && type === "player") {
                    spotDiv.classList.add("shipSpot");
                    columnDiv.append(spotDiv);
                    columnRev = shiftString(columnRev);
                }
                else {
                    spotDiv.classList.add("spot");
                    columnDiv.append(spotDiv);
                    columnRev = shiftString(columnRev);
                }
                //event listener
                spotDiv.addEventListener("click", () => {
                    playerBoard.recieveAttack([columnRevEvent, numIndexEvent]);
                    renderBoard(playerBoard, type);
                })
            }
        }
        numIndex++;
    })
}

function shiftString(char) {
   return String.fromCharCode((((char.charCodeAt(0)) - 65 + 1) % 26) + 65);
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