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

function createPlayer(marker, score, roundsWon) {
    return { marker, score, roundsWon };
}

const gameFlow = (function () {
    function chooseMarker() {
        // create dom elements for playerOne choosing x or o.
        // use createPlayer factory function to create players one and two with chosen markers
    }

    function playRound() {
        // once markers are chosen, round can be played
        // before coding this part, code html and css for the game board
    }
}())