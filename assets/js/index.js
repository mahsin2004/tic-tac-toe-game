window.addEventListener('DOMContentLoaded', () => {
    const player1 = document.getElementById('player-1');
    const player2 = document.getElementById('player-2');
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const resetBtn = document.getElementById('btn-reset');
    const announcer = document.getElementById('announcer');
    const newBoard = document.getElementById('btn-new');
    const score1 = document.getElementById('p1-score');
    const defeat1 = document.getElementById('p1-defeat');
    const score2 = document.getElementById('p2-score');
    const defeat2 = document.getElementById('p2-defeat');

    let p1Score = parseInt(score1.innerText);
    let p1Defeat = parseInt(defeat1.innerText);
    let p2Score = parseInt(score2.innerText);
    let p2Defeat = parseInt(defeat2.innerText)

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'x';
    let isGameActive = true;

    const player1_Won = 'player1_Won';
    const player2_Won = 'player2_Won';
    const tie = 'tie';

    const winingProbability = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6] // corrected this line to [2, 4, 6] for diagonal win
    ];

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < 8; i++) { // changed from i <= 7 to i < 8
            const wonCondition = winingProbability[i];
            const a = board[wonCondition[0]];
            const b = board[wonCondition[1]];
            const c = board[wonCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) { // changed from a === b || b === c || a === c to a === b && b === c
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'x' ? player2_Won : player1_Won); // corrected the condition
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            announce(tie);
            isGameActive = false; // added to prevent further moves after a tie
        }
    }

    const announce = (type) => {
        switch (type) {
            case player1_Won:
                announcer.innerText = 'Congratulations, Player 1 you won!! ';
                p1Score += 1;
                score1.innerText = p1Score;
                p2Defeat += 1;
                defeat2.innerText = p2Defeat
                break;
            case player2_Won:
                announcer.innerText = 'Congratulations, Player 2 you won!! ';
                p2Score += 1;
                score2.innerText = p2Score;
                p1Defeat += 1;
                defeat1.innerText = p1Defeat;
                break;
            case tie:
                announcer.innerText = 'Game Tie!! ';
        }
    };

    const isValidAction = (tile) => {
        return tile.innerText === ''; // simplified the condition
    }

    const boardUpdate = (value) => {
        board[value] = currentPlayer;
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; // corrected the player change logic
        player1.classList.toggle('active');
        player2.classList.toggle('active');
    }

    const userAction = (tile, value) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            boardUpdate(value);
            handleResultValidation();
            changePlayer();
        }
    }

    const newBtn = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.innerText = 'Play!!'; // clear the announcer text
        player1.classList.add('active');
        player2.classList.remove('active');

        tiles.forEach(tile => {
            tile.innerText = '';
        });
    }

    newBoard.addEventListener('click', newBtn);

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.innerText = 'Play!!'; // clear the announcer text
        player1.classList.add('active');
        player2.classList.remove('active');
        score1.innerText = '00';
        defeat1.innerText = '00';
        score2.innerText = '00';
        defeat2.innerText = '00';

        tiles.forEach(tile => {
            tile.innerText = '';
        });
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetBtn.addEventListener('click', resetBoard);
});