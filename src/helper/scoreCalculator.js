// const matchDetail = require('../model/matchDetail');
const { statsInitializer } = require('./statsHelper');

const POINTS_TO_WIN_GAME = 4;
const DEUCE_POINT = 3;
const POINTS_ADVANTAGE_MARGIN = 2;
const GAMES_TO_WIN_SET = 6;
const SETS_TO_WIN_MATCH = 2;
const PLAYER_ONE_SCORED = 0;
const PLAYER_TWO_SCORED = 1;

function scoreCalculator(score, matchObj, statsMap) {
  let playerOne = null;
  let playerTwo = null;

  //only assign new map elements when not existed
  statsInitializer(matchObj).forEach((player) => {
    if (statsMap?.get(player.name)) {
      player = statsMap.get(player.name);
    } else {
      statsMap?.set(player.name, player);
    }

    if (player.name === matchObj.playerOneName.toUpperCase()) {
      playerOne = player;
    } else {
      playerTwo = player;
    }
  });

  if (score === PLAYER_ONE_SCORED) {
    matchObj.playerOneScore += 1;
  }
  if (score === PLAYER_TWO_SCORED) {
    matchObj.playerTwoScore += 1;
  }

  //DEUCE & NOT DEUCE scenario
  if (
    matchObj.playerOneScore >= DEUCE_POINT &&
    matchObj.playerTwoScore >= DEUCE_POINT
  ) {
    if (
      Math.abs(matchObj.playerOneScore - matchObj.playerTwoScore) ===
      POINTS_ADVANTAGE_MARGIN
    ) {
      gameAdvancer(matchObj, playerOne, playerTwo);
    }
  } else if (
    matchObj.playerOneScore === POINTS_TO_WIN_GAME ||
    matchObj.playerTwoScore === POINTS_TO_WIN_GAME
  ) {
    gameAdvancer(matchObj, playerOne, playerTwo);
  }

  //Check if anyone win the set
  if (
    matchObj.playerOneGames === GAMES_TO_WIN_SET ||
    matchObj.playerTwoGames === GAMES_TO_WIN_SET
  ) {
    setAdvancer(matchObj);
  }

  //Check if anyone win the game
  if (
    matchObj.playerOneSets === SETS_TO_WIN_MATCH ||
    matchObj.playerTwoSets === SETS_TO_WIN_MATCH
  ) {
    winnerNominator(matchObj);
  }

  return [matchObj, matchObj.matchFinished, statsMap];
}

function gameAdvancer(match, playerOneStats, playerTwoStats) {
  if (match.playerOneScore > match.playerTwoScore) {
    match.playerOneGames += 1;
    playerOneStats.gameWon += 1;
    playerTwoStats.gameLost += 1;
  } else {
    match.playerTwoGames += 1;
    playerOneStats.gameLost += 1;
    playerTwoStats.gameWon += 1;
  }

  match.playerOneScore = 0;
  match.playerTwoScore = 0;

  return [match, playerOneStats, playerTwoStats];
}

function setAdvancer(match) {
  if (match.playerOneGames > match.playerTwoGames) {
    match.playerOneSets += 1;
  } else {
    match.playerTwoSets += 1;
  }

  match.playerOneGames = 0;
  match.playerTwoGames = 0;
  return match;
}

function winnerNominator(match) {
  match.matchFinished = true;
  if (match.playerOneSets > match.playerTwoSets) {
    match.winner = match.playerOneName;
  } else {
    match.winner = match.playerTwoName;
  }

  return match;
}
module.exports = { scoreCalculator };
