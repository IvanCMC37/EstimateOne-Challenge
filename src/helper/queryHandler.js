const readline = require('readline');
const { invalidInputError } = require('./customError');
const process = require('process');

const SCORE_QUERY_REGEX = /^Score Match (\d+)$/i;
const PLAYER_QUERY_REGEX = /^Games Player (.+)$/i;

function splashPageHandler(matchDetailMap, playerStatsMap) {
  const rl = readline.createInterface({ input: process.stdin });
  console.log(
    'To find out match result, enter: Score Match <id>\nTo find out player stats throughout the tournament, enter: Games Player <Player Name>\nTo exit this program, please enter exit\n'
  );
  rl.on('line', (line) => {
    if (line.match(/^exit/i)) {
      rl.close();
    } else {
      //handle tennis commands
      console.log(tennisCommandHandler(line, matchDetailMap, playerStatsMap));
    }
  });
}

function tennisCommandHandler(line, matchDetailMap, playerStatsMap) {
  const matchResultCommand = line.match(SCORE_QUERY_REGEX);
  if (matchResultCommand) {
    return matchResultAnnouncer(matchResultCommand, matchDetailMap);
  }

  const playerStatsCommand = line.match(PLAYER_QUERY_REGEX);
  if (playerStatsCommand) {
    return playerStatsAnnouncer(playerStatsCommand, playerStatsMap);
  }

  if (!matchResultCommand || !playerStatsCommand)
    return invalidInputError(line);
}

function matchResultAnnouncer(command, matchMap) {
  if (command) {
    const matchID = Number(command[1]);
    const match = matchMap.get(matchID);

    if (match) {
      return matchResultGetter(match);
    }
    return `Could not find the detail on match ${matchID}`;
  }
}

function matchResultGetter(match) {
  if (match.playerOneName === match.winner) {
    return `${match.playerOneName} defeated ${match.playerTwoName}\n${match.playerOneSets} sets to ${match.playerTwoSets}`;
  } else {
    return `${match.playerTwoName} defeated ${match.playerOneName}\n${match.playerTwoSets} sets to ${match.playerOneSets}`;
  }
}

function playerStatsAnnouncer(command, playerMap) {
  if (command) {
    const personName = command[1].toUpperCase();
    const stats = playerMap.get(personName);

    if (stats) {
      return `Won:${stats.gameWon} Lost:${stats.gameLost}`;
    }
    return `Could not find the detail on ${personName}`;
  }
}

module.exports = { splashPageHandler, tennisCommandHandler };
