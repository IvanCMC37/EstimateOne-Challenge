/* eslint-disable no-undef */
const { scoreCalculator } = require('../helper/scoreCalculator');

describe('Score calculator unit test(s)', () => {
  let matchDetail;

  beforeEach(() => {
    matchDetail = {
      matchID: 1,
      playerOneName: 'Person A',
      playerTwoName: 'Person B',
      playerOneScore: 0,
      playerTwoScore: 0,
      playerOneGames: 0,
      playerTwoGames: 0,
      playerOneSets: 0,
      playerTwoSets: 0,
      matchFinished: false,
      winner: '',
    };
  });

  it('Score can be increased on player 1', () => {
    const result = scoreCalculator(0, matchDetail);
    expect(result[0].playerOneScore).toStrictEqual(1);
  });

  it('Score can be increased on player 2', () => {
    const result = scoreCalculator(1, matchDetail);
    expect(result[0].playerTwoScore).toStrictEqual(1);
  });

  it('Scoring during deuce', () => {
    matchDetail.playerOneScore = 3;
    matchDetail.playerTwoScore = 3;
    const result = scoreCalculator(1, matchDetail);
    expect(result[0].playerTwoScore).toStrictEqual(4);
  });

  it('Game set for player one after deuce', () => {
    matchDetail.playerOneScore = 4;
    matchDetail.playerTwoScore = 3;
    const result = scoreCalculator(0, matchDetail);
    expect(result[0].playerOneGames).toStrictEqual(1);
  });

  it('Game set for player two after deuce', () => {
    matchDetail.playerOneScore = 3;
    matchDetail.playerTwoScore = 4;
    const result = scoreCalculator(1, matchDetail);
    expect(result[0].playerTwoGames).toStrictEqual(1);
  });

  it('Game set without deuce', () => {
    matchDetail.playerOneScore = 3;
    matchDetail.playerTwoScore = 1;
    const result = scoreCalculator(0, matchDetail);
    expect(result[0].playerOneGames).toStrictEqual(1);
  });

  it('Player can win a set', () => {
    matchDetail.playerOneScore = 3;
    matchDetail.playerOneGames = 5;
    const result = scoreCalculator(0, matchDetail);
    expect(result[0].playerOneSets).toStrictEqual(1);
  });

  it('Player one can win a game', () => {
    matchDetail.playerOneScore = 3;
    matchDetail.playerOneGames = 5;
    matchDetail.playerOneSets = 1;
    const result = scoreCalculator(0, matchDetail);
    expect(result[0].winner).toStrictEqual('Person A');
  });

  it('Player two can win a game', () => {
    matchDetail.playerTwoScore = 3;
    matchDetail.playerTwoGames = 5;
    matchDetail.playerTwoSets = 1;
    const result = scoreCalculator(1, matchDetail);
    expect(result[0].winner).toStrictEqual('Person B');
  });
});
