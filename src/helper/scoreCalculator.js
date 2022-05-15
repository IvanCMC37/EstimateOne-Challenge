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

  //Check if anyone won a score
  scoreAdder(matchObj, score);

  //Check if anyone won the game
  gameChecker(matchObj, playerOne, playerTwo);

  //Check if anyone won the set
  setAdvancer(matchObj);

  //Check if anyone win the game
  winnerNominator(matchObj);

  return [matchObj, matchObj.matchFinished, statsMap];
}

function scoreAdder(match, score) {
  if (score === PLAYER_ONE_SCORED) {
    match.playerOneScore += 1;
  }
  if (score === PLAYER_TWO_SCORED) {
    match.playerTwoScore += 1;
  }
}

function gameChecker(match, playerOneStats, playerTwoStats) {
  if (
    match.playerOneScore >= DEUCE_POINT &&
    match.playerTwoScore >= DEUCE_POINT
  ) {
    if (
      Math.abs(match.playerOneScore - match.playerTwoScore) ===
      POINTS_ADVANTAGE_MARGIN
    ) {
      gameAdvancer(match, playerOneStats, playerTwoStats);
    }
  } else if (
    match.playerOneScore === POINTS_TO_WIN_GAME ||
    match.playerTwoScore === POINTS_TO_WIN_GAME
  ) {
    gameAdvancer(match, playerOneStats, playerTwoStats);
  }
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
  if (
    match.playerOneGames === GAMES_TO_WIN_SET ||
    match.playerTwoGames === GAMES_TO_WIN_SET
  ) {
    if (match.playerOneGames > match.playerTwoGames) {
      match.playerOneSets += 1;
    } else {
      match.playerTwoSets += 1;
    }

    match.playerOneGames = 0;
    match.playerTwoGames = 0;
    return match;
  }
}

function winnerNominator(match) {
  if (
    match.playerOneSets === SETS_TO_WIN_MATCH ||
    match.playerTwoSets === SETS_TO_WIN_MATCH
  ) {
    match.matchFinished = true;
    if (match.playerOneSets > match.playerTwoSets) {
      match.winner = match.playerOneName;
    } else {
      match.winner = match.playerTwoName;
    }

    return match;
  }
}
module.exports = { scoreCalculator };
