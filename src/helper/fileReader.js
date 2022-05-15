const fs = require('fs');
const matchDetail = require('../model/matchDetail');
const { scoreCalculator } = require('./scoreCalculator');
const { invalidParserError } = require('./customError');

const MATCH_LINE_REGEX = /^Match: (\d+)$/;
const PLAYER_LINE_REGEX = /^(.+) vs (.+)$/;
const SCORE_LINE_REGEX = /^0|1$/;

function fileReader(filePath) {
  try {
    const contents = fs.readFileSync(filePath, { encoding: 'utf-8' });

    const [matchDetailMap, playerStatsMap] = lineReader(contents);
    console.log('Data imported successfully...\n');

    return [true, matchDetailMap, playerStatsMap];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function matchParser(line, index) {
  if (line.match(MATCH_LINE_REGEX)) {
    const matchID = Number(line.match(MATCH_LINE_REGEX)[1]);
    return [matchID];
  }
  throw invalidParserError(index, line);
}

function playerParser(line, index) {
  if (line.match(PLAYER_LINE_REGEX)) {
    const players = line.match(PLAYER_LINE_REGEX);
    const playerOneName = players[1];
    const playerTwoName = players[2];
    return [playerOneName, playerTwoName];
  }
  throw invalidParserError(index, line);
}

function scoreParser(line, index) {
  if (line.match(SCORE_LINE_REGEX)) {
    const score = Number(line);
    return score;
  }
  throw invalidParserError(index, line);
}

function lineReader(txtFileInput) {
  if (txtFileInput === '') throw SyntaxError();
  if (txtFileInput === '\n') throw SyntaxError();

  let matchFinished = false;
  let matchID = null;
  let match = null;
  let matchDetailMap = new Map();
  let playerStatsMap = new Map();

  const lines = txtFileInput.split('\n');
  lines.forEach((line, index) => {
    if (line === '' || line.trim().length === 0) {
      return;
    }

    //Find match
    if (!matchID) {
      [matchID] = matchParser(line, index);

      if (matchID) {
        match = new matchDetail();
      }
      match.matchID = matchID;
      //Find players
    } else if (!match.playerOneName) {
      [match.playerOneName, match.playerTwoName] = playerParser(line, index);
      //Find score
    } else if (!matchFinished) {
      const score = scoreParser(line, index);
      [match, matchFinished, playerStatsMap] = scoreCalculator(
        score,
        match,
        playerStatsMap
      );
    }

    //since match finished, reset variables for next match
    if (matchFinished) {
      matchFinished = false;
    }

    matchDetailMap.set(matchID, match);
  });

  console.log(matchDetailMap);
  console.log(playerStatsMap);
  console.log('Parsed every line from input txt file...');
  return [matchDetailMap, playerStatsMap];
}

module.exports = { fileReader, lineReader };
