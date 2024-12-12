const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X'; 
let gameActive = true; 


const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
];

function checkWinner() {
    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (
            cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer
        ) {
            return true;
        }
    }
    return false;
}


function handleCellClick(event) {
    const cell = event.target;

    
    if (cell.textContent !== '' || !gameActive) return;

    
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'playerX' : 'playerO');

    
    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (Array.from(cells).every(cell => cell.textContent !== '')) {
        message.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('playerX', 'playerO');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
