
let symbol = document.getElementById('symbol');
let currplayer = document.getElementById('player');
let winDeclare = document.getElementById('win');
let resetbtn = document.getElementById('reset');
let box = document.querySelectorAll('.box');

let sign = 'X';
let play = true;

// Function to toggle between X and O
const changeTurn = () => {
    return sign === 'X' ? 'O' : 'X';
};

// Function to update the UI for current player
const curr_player = () => {
    if (sign === 'X') {
        symbol.innerText = 'X';
        currplayer.innerText = 'Player 1';
    } else {
        symbol.innerText = 'O';
        currplayer.innerText = 'Player 2';
    }
};

// Event listener for each box
Array.from(box).forEach((value) => {
    value.addEventListener('click', (e) => {
        if (!play) return;

        if (e.target.innerText === '') {
            const currentSign = sign; // Save current sign before changing
            e.target.innerText = currentSign;
            e.target.classList.add('grey');

            // Check win or draw before changing turn
            WinChoice(currentSign);
            draw();

            // Change turn and update player
            sign = changeTurn();
            curr_player();
        }
    });
});

// Function to check for winning combinations
let WinChoice = (currentSign) => {
    let block = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];

    block.forEach((e) => {
        if (
            box[e[0]].innerText === box[e[1]].innerText &&
            box[e[1]].innerText === box[e[2]].innerText &&
            box[e[0]].innerText !== ''
        ) {
            winDeclare.style.display = 'block';

            let player = currentSign === 'X' ? 'Player 1' : 'Player 2';
            winDeclare.innerText = player + ' (' + currentSign + ') wins!';

            resetbtn.style.display = 'inline-block';
            play = false; // stop the game
        }
    });
};

// Function to check for draw
let draw = () => {
    if (
        Array.from(box).every(cell => cell.innerText !== '') &&
        play // only check draw if no one has won yet
    ) {
        winDeclare.style.display = 'block';
        winDeclare.innerText = 'Draw';
        resetbtn.style.display = 'inline-block';
        play = false; // stop the game
    }
};

// Reset button functionality
resetbtn.addEventListener('click', () => {
    winDeclare.style.display = 'none';
    resetbtn.style.display = 'none';

    Array.from(box).forEach((value) => {
        value.innerText = '';
        value.classList.remove('grey');
    });

    play = true;
    sign = 'X';
    curr_player(); // reset UI to Player 1
});
