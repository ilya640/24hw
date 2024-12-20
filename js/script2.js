const createTableBtn = document.getElementById('createTable');
const hideTableBtn = document.getElementById('hideTable');
const showTableBtn = document.getElementById('showTable');
let table;

createTableBtn.addEventListener('click', () => {
    let cellCount;

    while (true) {
        cellCount = prompt("Введите количество ячеек (1-10):");

        if (cellCount === null) return; // Если нажали отмену

        cellCount = parseInt(cellCount.trim(), 10);

        if (isNaN(cellCount) || cellCount <= 0) {
            alert("Пожалуйста, введите положительное число.");
        } else if (cellCount > 10) {
            alert("Пожалуйста, введите число не больше 10.");
        } else {
            break;
        }
    }


    createTableBtn.disabled = true;

    table = document.createElement('table');
    document.body.appendChild(table);

    for (let i = 0; i < cellCount; i++) {
        const row = table.insertRow();
        for (let j = 0; j < cellCount; j++) {
            const cell = row.insertCell();
            cell.textContent = `${j + 1}:${i + 1}`;
            if (i === j) {
                cell.style.backgroundColor = 'red';
                cell.style.color = 'white';
            }
        }
    }

    hideTableBtn.style.display = 'inline-block';
    showTableBtn.style.display = 'inline-block';
});

hideTableBtn.addEventListener('click', () => {
    if (table) table.style.display = 'none';
    hideTableBtn.disabled = true;
    showTableBtn.disabled = false;
});

showTableBtn.addEventListener('click', () => {
    if (table) table.style.display = 'table';
    showTableBtn.disabled = true;
    hideTableBtn.disabled = false;
});