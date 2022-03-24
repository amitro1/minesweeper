'use strict'
const MINE = '💣'

var gBoard;
var gClickCount;
var gLevel;

var gGame = {
    isOn: false,
    markedCount: 0,
    secsPassed: 0
}

function initGame(size, mines) {
    var gLevel = gameLevel(size, mines)
    gClickCount = 0;
    gBoard = createMat(gLevel.size)
    renderBoard(gBoard)
    addMine(gLevel.mines)
    console.log(gBoard)

}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {

            strHTML += `\t<td title="cell:${i},${j}" onclick="cellClicked(this,${i},${j})" class="cell cell-${i}-${j}" ></td>\n`
        }
        strHTML += '</tr>';

    }
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j == colIdx) continue
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine) {
                count++
            }
        }
    }
    if (count === 0) count = ''
    gBoard[rowIdx][colIdx].minesAroundCount = count
}

function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isShown) return
    gBoard[i][j].isShown = true;
    setMinesNegsCount(gBoard, i, j)
    checkMine(elCell, i, j)
    gClickCount++
    console.log(gClickCount)
}

function checkGameOver() {
    if (gClickCount === (gLevel.size * gLevel.size) - gLevel.mines) {
        alert('you wine')
    }
}

function addMine(mines) {
    for (var i = 0; i < mines; i++) {
        var pos = emptyCellPos()
        gBoard[pos.i][pos.j] = {
            minesAroundCount: MINE,
            isShown: false,
            isMine: true
        }
        renderCell(pos.i, pos.j, MINE)
    }
    return gBoard;
}

function checkMine(elCell, i, j) {
    var cell = gBoard[i][j]
    var value;
    if (cell.isMine) {
        value = MINE
    } else {
        value = gBoard[i][j].minesAroundCount
    }
    elCell.classList.add('clicked')
    renderCell(i, j, value)
}