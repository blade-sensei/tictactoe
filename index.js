
/**
 * [
 *  [0,0,0],
 *  [0,0,0],
 *  [0,0,0],
 * ]
 * combination = [ [[0,0],[0,1], 0,2], [[0,0], [1,1], [2,2]], [ ]]
 */

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
        checkWinner();
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
    })
    const first = map[0][0];
}