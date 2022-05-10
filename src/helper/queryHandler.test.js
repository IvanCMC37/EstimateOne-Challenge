/* eslint-disable no-undef */
const { tennisCommandHandler } = require('./queryHandler');

describe('Query testing', () => {
  let matchDetail;
  let playerStats;
  let matchMap = new Map();
  let playerMap = new Map();

  beforeEach(() => {
    matchDetail = {
      matchID: 1,
      playerOneName: 'Person A',
      playerTwoName: 'Person B',
      playerOneScore: 0,
      playerTwoScore: 0,
      playerOneGames: 0,
      playerTwoGames: 0,
      playerOneSets: 2,
      playerTwoSets: 0,
      matchFinished: true,
      winner: 'Person A',
    };

    playerStats = {
      name: 'PERSON A',
      gameWon: 30,
      gameLost: 0,
    };
    matchMap.set(matchDetail.matchID, matchDetail);
    playerMap.set(playerStats.name, playerStats);
  });

  it('will respond to wrong command', () => {
    let response = tennisCommandHandler('', matchMap, playerMap);
    expect(response).toStrictEqual('Command "" is not valid, please try again');
  });

  it('will respond to match command, match found', () => {
    let matchCommand = 'Score Match 01';
    let response = tennisCommandHandler(matchCommand, matchMap, playerMap);
    expect(response).toStrictEqual('Person A defeated Person B\n2 sets to 0');
  });

  it('will respond to match command with playerTwo defeated playerOne', () => {
    matchDetail.playerOneSets = 0;
    matchDetail.playerTwoSets = 2;
    matchDetail.winner = 'Person B';
    matchMap.set(matchDetail.matchID, matchDetail);
    let matchCommand = 'Score Match 01';
    let response = tennisCommandHandler(matchCommand, matchMap, playerMap);
    expect(response).toStrictEqual('Person B defeated Person A\n2 sets to 0');
  });

  it('will respond to match command, match not found', () => {
    let matchCommand = 'Score Match 02';
    let response = tennisCommandHandler(matchCommand, matchMap, playerMap);
    expect(response).toStrictEqual('Could not find the detail on match 2');
  });

  it('will respond to player command, player found', () => {
    let matchCommand = 'Games Player Person A';
    let response = tennisCommandHandler(matchCommand, matchMap, playerMap);
    expect(response).toStrictEqual('Won:30 Lost:0');
  });

  it('will respond to player command, player not found', () => {
    let matchCommand = 'Games Player Person C';
    let response = tennisCommandHandler(matchCommand, matchMap, playerMap);
    expect(response).toStrictEqual('Could not find the detail on PERSON C');
  });
});
