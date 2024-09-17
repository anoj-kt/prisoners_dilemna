import OPTIONS from './OPTIONS.js';

class gameLogic {
  constructor() {
    this.round = 0;
    this.userMoves = [];
    this.computerMoves = [];
    this.userPoints = 0;
    this.computerPoints = 0;
    this.strategy = this.selectStrategy();
  }

  selectStrategy() {
    const strategies = ['Tit for Tat', 'Only Coperate', 'Only Attack'];
    return strategies[Math.floor(Math.random() * strategies.length)];
  }

  getComputerMove() {
    switch (this.strategy) {
      case 'Tit for Tat':
        return this.titForTat();
      case 'Only Coperate':
        return OPTIONS.corperate;
      case 'Only Attack':
        return OPTIONS.attack;
    }
  }

  titForTat() {
    if (this.userMoves.length === 0) {
      return 'coperate';
    } else {
      return this.userMoves[this.userMoves.length - 1];
    }
  }

  playRound(userMove) {
    const computerMove = this.getComputerMove();

    this.userMoves.push(userMove);
    this.computerMoves.push(computerMove);

    this.determineWinner(userMove, computerMove);

    return {
      round: this.round,
      computerMove,
      userPoints: this.userPoints,
      computerPoints: this.computerPoints,
    };
  }

  determineWinner(userMove, computerMove) {
    if (userMove === OPTIONS.corperate && computerMove === OPTIONS.corperate) {
      this.userPoints += 3;
      this.computerPoints += 3;
    } else if (
      userMove === OPTIONS.corperate &&
      computerMove === OPTIONS.attack
    ) {
      this.computerPoints += 5;
    } else if (
      userMove === OPTIONS.attack &&
      computerMove === OPTIONS.corperate
    ) {
      this.userPoints += 5;
    } else if (userMove === OPTIONS.attack && computerMove === OPTIONS.attack) {
      this.userPoints += 1;
      this.computerPoints += 1;
    }

    this.round++;
  }

  resetGame() {
    this.round = 0;
    this.userMoves = [];
    this.computerMoves = [];
    this.userPoints = 0;
    this.computerPoints = 0;
    this.strategy = this.selectStrategy();
  }
}

export default gameLogic;
