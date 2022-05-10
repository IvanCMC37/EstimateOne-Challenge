const playerStats = require('../model/playerStats');

function statsInitializer(match) {
  let playerOne = new playerStats();
  let playerTwo = new playerStats();
  playerOne.name = match.playerOneName.toUpperCase();
  playerTwo.name = match.playerTwoName.toUpperCase();

  return [playerOne, playerTwo];
}

module.exports = { statsInitializer };
