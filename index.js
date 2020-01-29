
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


 const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

 const game = {
     board,
     scores: {
         'player1': 0,
         'player2': 0,
         'draw': 0,
     }
 }

const test = JSON.parse(JSON.stringify(game));

game.board[0][0] = 'X';

const equal = JSON.stringify(test) === JSON.stringify(game);


const rows = Array.from(document.querySelectorAll('.table-row'));
rows.forEach(row => {
    for (let i = 0; i < 3; i++) {
        row.appendChild(createColumn());
        document.body.appendChild(row);
    }
});
const columns = Array.from(document.querySelectorAll('.table-column'));
let previous = 'X';

columns.forEach(column => {
    column.addEventListener('click', () => {
        renderMarkPlayer(column)
        if (checkWinner()) {
            alert(`winner ${previous} player`);
        }
    });
})

function renderMarkPlayer(element) {
    previous = getMark();
    element.textContent = previous;
}

function getMark() {
    const mark = previous === 'X' ? 'O': 'X';
    return mark;
}

function createColumn() {
    const column = document.createElement('div');
    column.className = 'table-column';
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