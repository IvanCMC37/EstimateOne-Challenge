/* eslint-disable no-undef */
const { statsInitializer } = require('./statsHelper');

describe('statsInitializer unit test(s)', () => {
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

  it('Can get both names for playerOne and playerTwo', () => {
    const result = statsInitializer(matchDetail);
    expect(result[0].name).toStrictEqual('PERSON A');
    expect(result[1].name).toStrictEqual('PERSON B');
  });
});
