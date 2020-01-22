const columns = Array.from(document.querySelectorAll('.table-column'));
let previous = 'X';

columns.forEach(column => {
    column.addEventListener('click', () => {
        return renderMarkPlayer(column)
    });
})

function renderMarkPlayer(element) {
    previous = getMark();
    element.textContent = previous;
}

function getMark() {
    console.log(previous);
    const mark = previous === 'X' ? 'O': 'X';
    return mark;
}
