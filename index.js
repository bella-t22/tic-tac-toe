const gameBoard = (function () {
    const board = [];
    let index;
    for (let i = 0; i < 9; i++) {
        index = i;
        board.push(index);
    }
    return { board }
}())

const gameFlow = (function () {
    const markerBtn = document.querySelectorAll('.marker-btn');
    markerBtn.forEach((marker) => {
        marker.addEventListener('click', () => {
            chooseMarker(marker);
        });
    })

    function createPlayer(marker, score, roundsWon) {
        return { marker, score, roundsWon };
    }

    let playerOne;
    let playerTwo;

    function chooseMarker(marker) {
        if (marker.value === 'x') {
            playerOne = createPlayer('x', 0, 0);
            playerTwo = createPlayer('o', 0, 0);
        } else if (marker.value === 'o') {
            playerOne = createPlayer('o', 0, 0);
            playerTwo = createPlayer('x', 0, 0);
        }
        const overlay = document.querySelector('#overlay');
        overlay.classList.add('hidden');
        return playerOne, playerTwo;
    }

    function playRound() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                const playerOneName = document.getElementById('player-one');
                const playerTwoName = document.getElementById('player-two');
                // add logic for checking if cell is already inhabited.
                if (playerOneName.classList == 'highlight') {
                    const para = document.createElement('p');
                    para.textContent = playerOne.marker;
                    cell.append(para);
                    gameBoard.board[cell.id] = playerOne.marker;
                    console.log(gameBoard.board);
                    playerOneName.classList.remove('highlight');
                    playerTwoName.classList.add('highlight');
                    detectWinner();
                } else if (playerTwoName.classList == 'highlight') {
                    const para = document.createElement('p');
                    para.textContent = playerTwo.marker;
                    cell.append(para);
                    gameBoard.board[cell.id] = playerTwo.marker;
                    console.log(gameBoard.board);
                    playerTwoName.classList.remove('highlight');
                    playerOneName.classList.add('highlight');
                    detectWinner();
                }
            })
        })
    } playRound()

    function detectWinner() {
        const diagonalOne = [gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]];
        const diagonalTwo = [gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]];
        const allEqual = arr => arr.every(val => val === arr[0]);

        if (allEqual(diagonalOne) || allEqual(diagonalTwo)) {
            if (diagonalOne[0] == playerOne.marker || diagonalTwo[0] == playerOne.marker) {
                console.log('Player One is the winner!');
            } else if (diagonalOne[0] == playerTwo.marker || diagonalTwo[0] == playerTwo.marker) {
                console.log('Player Two is the winner!');
            }
        }
    }    
}())
