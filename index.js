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
        // what if we were to create an object of arrays of win patterns, then called allEqual on each array in the object?
        const winPatterns = [
            [gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]],
            [gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]],
            [gameBoard.board[0], gameBoard.board[1], gameBoard.board[2]],
            [gameBoard.board[3], gameBoard.board[4], gameBoard.board[5]],
            [gameBoard.board[6], gameBoard.board[7], gameBoard.board[8]],
            [gameBoard.board[0], gameBoard.board[3], gameBoard.board[6]],
            [gameBoard.board[1], gameBoard.board[4], gameBoard.board[7]],
            [gameBoard.board[2], gameBoard.board[5], gameBoard.board[8]],
        ]

        const allEqual = arr => arr.every(val => val === arr[0]);

        for (arr of winPatterns) {
            if (allEqual(arr) && arr[0] == playerOne.marker) {
                 return console.log('Player One Wins!')
            } else if (allEqual(arr) && arr[0] == playerTwo.marker) {
                return console.log('Player Two Wins!')
            }
        }

    }    
}())
