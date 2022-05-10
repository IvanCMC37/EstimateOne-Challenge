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
    return [true, matchID];
  }
  throw invalidParserError(index, line);
}

function playerParser(line, index) {
  if (line.match(PLAYER_LINE_REGEX)) {
    const players = line.match(PLAYER_LINE_REGEX);
    const playerOneName = players[1];
    const playerTwoName = players[2];
    return [true, playerOneName, playerTwoName];
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

  let matchFound = false;
  let playersFound = false;
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

    if (!matchFound) {
      [matchFound, matchID] = matchParser(line, index);

      //only create the new object when match is found
      if (matchFound) {
        match = new matchDetail();
      }
      match.matchID = matchID;
    } else if (!playersFound) {
      [playersFound, match.playerOneName, match.playerTwoName] = playerParser(
        line,
        index
      );
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
      matchFound = playersFound = matchFinished = false;
    }

    matchDetailMap.set(matchID, match);
  });

  console.log(matchDetailMap);
  console.log(playerStatsMap);
  console.log('Parsed every line from input txt file...');
  return [matchDetailMap, playerStatsMap];
}

module.exports = { fileReader, lineReader };
