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
            // for each cell of the html board, we want to have a corresponding spot in the gameboard array.
            // we want the cell id to match the array index and add the player marker to the corresponding array index
            cell.addEventListener('click', () => {
                const playerOneName = document.getElementById('player-one');
                const playerTwoName = document.getElementById('player-two');

                if (playerOneName.classList == 'highlight') {
                    const para = document.createElement('p');
                    para.textContent = playerOne.marker;
                    cell.append(para);
                    gameBoard.board[cell.id] = playerOne.marker;
                    console.log(gameBoard.board);
                    playerOneName.classList.remove('highlight');
                    playerTwoName.classList.add('highlight');
                } else if (playerTwoName.classList == 'highlight') {
                    const para = document.createElement('p');
                    para.textContent = playerTwo.marker;
                    cell.append(para);
                    gameBoard.board[cell.id] = playerTwo.marker;
                    console.log(gameBoard.board);
                    playerTwoName.classList.remove('highlight');
                    playerOneName.classList.add('highlight');
                }
            })
        })
    }
    playRound()
}())