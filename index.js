import Game from './gameLogic.js';
import OPTIONS from './OPTIONS.js';

const game = new Game();

const userCircleContainer = document.getElementById('user-choices');
const computerCircleContainer = document.getElementById('computer-choices');
const attackButton = document.getElementById('attack');
const corperateButton = document.getElementById('corperate');
const userScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('computer-score');

for (let i = 1; i <= 10; i++) {
  userCircleContainer.appendChild(createCircle());
  computerCircleContainer.appendChild(createCircle());
}

function createCircle() {
  const circle = document.createElement('div');
  circle.className = 'w-4 h-4 bg-slate-300 rounded-full m-2';
  return circle;
}

function updateScore(computerMove, userMove) {
  const userCircles = userCircleContainer.children;
  const computerCircles = computerCircleContainer.children;
  userScoreEl.innerText = game.userPoints;
  computerScoreEl.innerText = game.computerPoints;

  if (game.round <= userCircles.length) {
    userCircles[game.round - 1].classList.add(
      userMove === OPTIONS.attack ? 'bg-red-500' : 'bg-green-500'
    );
    computerCircles[game.round - 1].classList.add(
      computerMove === OPTIONS.attack ? 'bg-red-500' : 'bg-green-500'
    );
  }
}

function reset() {
  game.resetGame();

  userScoreEl.innerText = 0;
  computerScoreEl.innerText = 0;

  userCircleContainer.childNodes.forEach((circle) =>
    circle.classList.remove('bg-red-500', 'bg-green-500')
  );

  computerCircleContainer.childNodes.forEach((circle) =>
    circle.classList.remove('bg-red-500', 'bg-green-500')
  );
}

function playRound(move) {
  const { computerMove } = game.playRound(move);

  updateScore(computerMove, move);

  if (game.round === 10) {
    setTimeout(() => {
      if (game.userPoints > game.computerPoints) {
        alert(`Game over! You win with ${game.userPoints} points!`);
      } else if (game.userPoints < game.computerPoints) {
        alert(`Game over! Computer wins with ${game.computerPoints} points!`);
      } else {
        alert(`Game over! It's a tie with ${game.userPoints} points each!`);
      }
      reset();
    }, 200);
  }
}

attackButton.addEventListener('click', function () {
  playRound(OPTIONS.attack);
});

corperateButton.addEventListener('click', function () {
  playRound(OPTIONS.corperate);
});
