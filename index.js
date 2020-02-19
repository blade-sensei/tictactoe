
/**
 * [
 *  [0,0,0],
 *  [0,0,0],
 *  [0,0,0],
 * ]
 * combination = [
 * [[0,0],[0,1], 0,2], [[0,0], [1,1], [2,2]], [ ]]
 */


 function createBoard(squares, container) {
     for (let i = 0; i < squares.length; i++) {
         const row = squares[i];
         const squareRowElement = document.createElement('div');
         squareRowElement.className = 'square-row';
         for (let squareIndex = 0; squareIndex < row.length; squareIndex++) {
             const square = row[squareIndex];
             const squareElement = document.createElement('div');
             squareElement.className = 'square';
             squareElement.id = `${i}-${squareIndex}`;
             squareElement.textContent = square;
             squareRowElement.appendChild(squareElement);
         }
         container.appendChild(squareRowElement);
     }
     document.body.appendChild(container);
 }





 const winnerCombinations = [
     [ [0,0], [0,1], [0,2] ],
     [ [1,0], [1,1], [1,2] ],
     [ [2,0], [2,1], [2,2] ],
     [ [0,0], [1,0], [2,0]],
     [ [0,1], [1,1], [2,1]],
     [ [0,2], [1,2], [2,2]],
     [ [0,0], [1,1], [2,2]],
     [ [2,0], [1,1], [0,2]],
 ]

 const PLAYERS = {
     first : 'player1',
     second: 'player2'
 }


 const board = [
    ['X', '', ''],
    ['', 'X', ''],
    ['', '', 'O'],
]

createBoard(board, document.querySelector('.square-container'));

 const game = {
    currentPlayerTurn: 'player1',
     _board: board,
     _scores: {
         'player1': 0,
         'player2': 0,
         'draw': 0,
     },
     set board(value) {
        this._board = value;
    },
    get board() {
        return this._board;
    },

    set scores(value) {
        console.log(this);
        console.log('scores');
        this._scores = value;
    },

    get scores() {
        return this._scores;
    },
 }

 game.scores = {};

//const equal = JSON.stringify(game) === JSON.stringify(test);


const rows = Array.from(document.querySelectorAll('.table-row'));

createSquaresInEachRow(rows);

function createSquaresInEachRow(rows) {
    for (let squareRowId = 0;  squareRowId < rows.length; squareRowId++) {
        let row = rows[squareRowId];
        createSquareInRow(row, squareRowId);
    }
}

function updateBoard ([row, column], game) {
    const updatedBoard = game.board;
    const playerMark = getPlayerMark(game.currentPlayerTurn);
    updatedBoard[row][column] = playerMark;

    return updatedBoard;

}

function createSquareInRow(row, rowNumber) {
    for (let i = 0; i < 3; i++) {
        row.appendChild(createSquare(rowNumber, i, game));
        document.body.appendChild(row);
    }
}

function getPlayerMark(playerName) {
    return playerName === 'player1' ? 'X': 'O';
}

const squares = Array.from(document.querySelectorAll('.square'));

setSquareEventListener(squares);

function setSquareEventListener(squares) {
    squares.forEach(square => {
        square.addEventListener('click', (event) => {
            const square = event.target;
            const squareCoordinates = getSquareCoordinates(square);
            game.board = updateBoard(squareCoordinates, game);
            game.currentPlayerTurn = getNextPlayerTurn(game.currentPlayerTurn);
            if (checkWinner()) {
                alert(`winner ${previous} player`);
            }
        });
    })
}


function getSquareCoordinates(square) {
    const coordinates = square.id.split('-');
    return coordinates.map(cordinate => Number(cordinate));
}

function getNextPlayerTurn(currentPlayerTurn) {
    
    return currentPlayerTurn === PLAYERS.first ? PLAYERS.second  : PLAYERS.first;
    
}

function addMarkToTable(game, square) {
    const board = JSON.parse(JSON.stringify(game.board));
}

function createSquare(rowNumber, columnNumber, game) {
    const column = document.createElement('div');
    column.className = 'square';
    column.id = `${rowNumber}-${columnNumber}`;
    const data = game.board[rowNumber][columnNumber];
    column.textContent = data;
    return column;

}

function checkWinner() {
    const map = rows.map((row) => {
        return Array.from(row.childNodes);
    });

    for (combination of winnerCombinations) {
        const extractedCardinates = [];
        console.log(combination);
        for (cardinates of combination) {
            const [row, column] = cardinates;
            extractedCardinates.push(map[row][column]);
        }
        const combinationCompleted = extractedCardinates.every(cardinate => {
            return cardinate.textContent === previous;
        });

        if (combinationCompleted) {
            return true;
        }
    }
    return false;
}