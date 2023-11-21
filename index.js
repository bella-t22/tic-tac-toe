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

    function createPlayer(name, marker) {
        return { name, marker };
    }

    // if no name is put in, default it to player one or player two
    let playerOne;
    let playerTwo;
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
        playerOne = createPlayer(playerOneInput.value, '');
        playerTwo = createPlayer(playerTwoInput.value, '');
        callPlayerOne.textContent = `${playerOneInput.value},`;
        playerOneTitle.textContent = playerOneInput.value;
        playerTwoTitle.textContent = playerTwoInput.value;
        namePage.classList.add('hidden');
        overlay.classList.remove('hidden');
    })

    const markerBtn = document.querySelectorAll('.marker-btn');
    markerBtn.forEach((marker) => {
        marker.addEventListener('click', () => {
            chooseMarker(marker);
        });
    })

    function chooseMarker(marker) {
        if (marker.value === 'x') {
            playerOne.marker = 'x';
            playerTwo.marker = 'o';
        } else if (marker.value === 'o') {
            playerOne.marker = 'o';
            playerTwo.marker = 'x'
        }
        const overlay = document.querySelector('#overlay');
        const gamePage = document.querySelector('.game-page');
        gamePage.classList.remove('hidden');
        overlay.classList.add('hidden');
        return playerOne, playerTwo;
    }

    function placeMarker(cell) {
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
    }

    function playRound() {
        const cells = document.querySelectorAll('.cell');
            cells.forEach((cell) => {
                cell.addEventListener('click', () => {
                    placeMarker(cell);
                })
            })
    } playRound()

    const detectWinner = () => {
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
        const winnerPopupOverlay = document.querySelector('.winner-popup-overlay');
        for (arr of winPatterns) {
            if (allEqual(arr) && arr[0] == playerOne.marker) {
                winnerPopupOverlay.classList.remove('hidden');
                const winner = document.querySelector('#winner-name');
                winner.textContent = `${playerOne.name}!`;
                return;
            } else if (allEqual(arr) && arr[0] == playerTwo.marker) {
                winnerPopupOverlay.classList.remove('hidden');
                const winner = document.querySelector('#winner-name');
                winner.textContent = `${playerTwo.name}!`;
                return;
            }
        }
    } 

    function eraseBoard() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i] = i;
        }
        console.log(gameBoard.board);
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
                cell.textContent = '';
        }) 
    }

    const nextRoundBtn = document.querySelector('#next-round');
        nextRoundBtn.addEventListener('click', () => {
            const winnerPopupOverlay = document.querySelector('.winner-popup-overlay');
            winnerPopupOverlay.classList.add('hidden');
            eraseBoard();
        }) 

    const newGameBtn = document.querySelector('#new-game');
    newGameBtn.addEventListener('click', eraseBoard);

}())
