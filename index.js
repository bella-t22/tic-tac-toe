const gameBoard = (function () {
    const board = [];
    let cell;
    for (let i = 0; i < 9; i++) {
        cell = board[i];
        // const div = document.createElement('div');
        // cell.value ?
        board.push(cell);
    }
    return board;
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

    function chooseMarker(marker) {
        let playerOne;
        let playerTwo;
        if (marker.value === 'x') {
            playerOne = createPlayer('x', 0, 0);
            playerTwo = createPlayer('o', 0, 0);
        } else if (marker.value === 'o') {
            playerOne = createPlayer('o', 0, 0);
            playerTwo = createPlayer('x', 0, 0);
        }
        return playerOne, playerTwo;
    }

    function playRound() {
        // once markers are chosen, round can be played
        // before coding this part, code html and css for the game board
    }
}())