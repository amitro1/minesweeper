function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
//function createMat(indx) {
/// var board = [];
// for (var i = 0; i < indx; i++) {
//   board[i] = [];
//    for (var j = 0; j < indx; j++) {
//       board[i][j] = '';
//    }
// }
//  return board;
//}

function renderCell(i, j, value) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.innerHTML = value;
}

function createMat(size) {
    var mat = []
    for (var i = 0; i < size; i++) {
        var row = []
        for (var j = 0; j < size; j++) {
            row.push({ isShown: false })
        }
        mat.push(row)
    }
    return mat
}

function gameLevel(size, mines) {
    return {
        size: size,
        mines: mines
    }
}

function emptyCellPos() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) emptyCells.push({ i: i, j: j })
        }
    }
    var emptyCell = emptyCells[getRandomInt(0, emptyCells.length - 1)];
    return emptyCell;
}

function addMine(mines) {
    for (var i = 0; i < mines; i++) {
        var pos = emptyCellPos()
        gBoard[pos.i][pos.j] = {
            minesAroundCount: MINE,
            isShown: true,
            isMine: true,
            isMarked: false
        }
    }
    return gBoard;
}