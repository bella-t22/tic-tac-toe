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

    function createPlayer(name, marker, score) {
        return { name, marker, score };
    }

    const submitNames = document.querySelector('form');
    submitNames.addEventListener('submit', (e) => {
        e.preventDefault();
        const namePage = document.querySelector('#name-page-overlay');
        const overlay = document.querySelector('#overlay');
        const playerOneInput = document.querySelector('#player-one-name');
        const playerTwoInput = document.querySelector('#player-two-name');
        const playerOneTitle = document.querySelector('#player-one');
        const playerTwoTitle = document.querySelector('#player-two');
        const callPlayerOne = document.querySelector('#player-one-choose');
        callPlayerOne.textContent = `${playerOneInput.value},`;
        playerOneTitle.textContent = playerOneInput.value;
        playerTwoTitle.textContent = playerTwoInput.value;
        namePage.classList.add('hidden');
        overlay.classList.remove('hidden');
    })

    let playerOne;
    let playerTwo;
    function chooseMarker(marker) {
        if (marker.value === 'x') {
            playerOne = createPlayer('', 'x', 0, 0);
            playerTwo = createPlayer('', 'o', 0, 0);
        } else if (marker.value === 'o') {
            playerOne = createPlayer('', 'o', 0, 0);
            playerTwo = createPlayer('', 'x', 0, 0);
        }
        const overlay = document.querySelector('#overlay');
        const gamePage = document.querySelector('.game-page');
        gamePage.classList.remove('hidden');
        overlay.classList.add('hidden');
        return playerOne, playerTwo;
    }

    function playRound() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                const playerOneName = document.getElementById('player-one');
                const playerTwoName = document.getElementById('player-two');
                if (playerOneName.classList == 'highlight' && !cell.hasChildNodes()) {
                    const para = document.createElement('p');
                    para.textContent = playerOne.marker;
                    cell.append(para);
                    gameBoard.board[cell.id] = playerOne.marker;
                    playerOneName.classList.remove('highlight');
                    playerTwoName.classList.add('highlight');
                    detectWinner();
                } else if (playerTwoName.classList == 'highlight' && !cell.hasChildNodes()) {
                    const para = document.createElement('p');
                    para.textContent = playerTwo.marker;
                    cell.append(para);
                    gameBoard.board[cell.id] = playerTwo.marker;
                    playerTwoName.classList.remove('highlight');
                    playerOneName.classList.add('highlight');
                    detectWinner();
                }
            })
        })
    } playRound()

    function detectWinner() {
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
                // don't allow players to place marker after one wins

                const playerOneScore = document.querySelector('.player-one-score');
                playerOne.score++;
                playerOneScore.textContent = `Score: ${playerOne.score}`;
                console.log('Player One Wins!');
                return
            } else if (allEqual(arr) && arr[0] == playerTwo.marker) {
                const playerTwoScore = document.querySelector('.player-two-score');
                playerTwo.score++;
                playerTwoScore.textContent = `Score: ${playerTwo.score}`;
                console.log('Player Two Wins!');
                return;
            }
        }
    }    
}())
