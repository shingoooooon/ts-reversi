console.log("Hello, JS!");

const EMPTY = 0;
const DARK = 1;
const LIGHT = 2;

const INITIAL_BOARD = [
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, DARK, LIGHT, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, LIGHT, DARK, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
]

const boardElement = document.querySelector(".board");

async function showBoard() {
    boardElement.innerHTML = "";
    
    INITIAL_BOARD.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("square");
            cellElement.dataset.row = rowIndex;
            cellElement.dataset.col = colIndex;
            boardElement.appendChild(cellElement);

            if (cell !== EMPTY) {
                const stoneElement = document.createElement("div");
                const color = cell === DARK ? "dark" : "light";
                stoneElement.classList.add("stone", color);
                cellElement.appendChild(stoneElement);
            }
        });
    });

}

async function registerGame() {
    await fetch("/api/games", {
        method: "POST",
    });
}

function main() {
    registerGame();
    showBoard();
}

main();