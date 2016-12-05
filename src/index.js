if (process.env.NODE_ENV !== 'production') require('./index.html')
import './styles/screen.scss'
let player = 'X'

const main = () => {
  document.querySelector('button').addEventListener('click', reset)
  const cells = document.querySelectorAll('td')
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', () => {
      if (cells[i].textContent === '') {
        cells[i].textContent = player

        if (checkForWinner()) {
          document.querySelector('.win h2').textContent = `Player ${player} Won!`
          document.body.className = 'games-been-won'
        } else if (checkForDraw()) {
          document.querySelector('.win h2').textContent = `DRAW!`
          document.body.className = 'games-been-won'
        } else {
          if (player === 'X') {
            player = 'O'
          } else {
            player = 'X'
          }
        }
      }
    })
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const checkForWinner = () => {
  const cells = document.querySelectorAll('td')
  for (let i = 0; i < winningCombos.length; i++) {
    const winningCombo = winningCombos[i]
    let moves = winningCombo.map((position) => {
      return cells[position].textContent
    })
    if (moves.every((move) => {
      return move === player
    })) {
      return true
    }
  }
  return false
}

const checkForDraw = () => {
  const checkCells = document.querySelectorAll('td')
  const allMoves = []
  for (var i = 0; i < checkCells.length; i++) {
    allMoves.push(checkCells[i].textContent)
  }
  return allMoves.every((move) => {
    return move !== ''
  })
}

// const checkForDraw = () => {
//   const cells = document.querySelectorAll('td')
//   for (let i = 0; i <= 9; i++) {
//     if (cells(i) === '') {
//       return false
//     }
//   }
//   return true
// }

// const gameOver = () => {
//   if (checkForWinner === 'X') {
//     document.querySelectorAll('.dialog h3').textContent = 'X Wins!'
//   }
//   if (checkForWinner === 'O') {
//     document.querySelectorAll('.dialog h3').textContent = 'O Wins!'
//   }
//   document.querySelectorAll('td').className = 'modal'
// }

const reset = () => {
  document.body.className = ''
  const cells = document.querySelectorAll('td')
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = ''
  }
}

document.addEventListener('DOMContentLoaded', main)

if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
