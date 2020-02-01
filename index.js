
/**
 * [
 *  [0,0,0],
 *  [0,0,0],
 *  [0,0,0],
 * ]
 * combination = [
 * [[0,0],[0,1], 0,2], [[0,0], [1,1], [2,2]], [ ]]
 */

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
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

 const game = {
    currentPlayerTurn: 'player1',
     _board: board,
     _scores: {
         'player1': 0,
         'player2': 0,
         'draw': 0,
     },
     set board(value) {
        console.log('ok');
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

function createSquareInRow(row, rowNumber) {
    for (let i = 0; i < 3; i++) {
        row.appendChild(createSquare(rowNumber, i));
        document.body.appendChild(row);
    }
}

const squares = Array.from(document.querySelectorAll('.square'));

setSquareEventListener(squares);

function setSquareEventListener(squares) {
    squares.forEach(square => {
        square.addEventListener('click', (event) => {
            game.currentPlayerTurn = getNextPlayerTurn(game.currentPlayerTurn);
            renderMarkPlayer(square)
            if (checkWinner()) {
                alert(`winner ${previous} player`);
            }
        });
    })
}

function renderMarkPlayer(element) {
    element.textContent = game.currentPlayerTurn;
}

function getNextPlayerTurn(currentPlayerTurn) {
    
    return currentPlayerTurn === PLAYERS.first ? PLAYERS.second  : PLAYERS.first;
    
}

function createSquare(rowNumber, columnNumber) {
    const column = document.createElement('div');
    column.className = 'square';
    column.id = `${rowNumber}-${columnNumber}`;
    column.textContent = ' - ';
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