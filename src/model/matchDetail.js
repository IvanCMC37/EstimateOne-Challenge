module.exports = class matchDetail {
  constructor(options) {
    const defaults = {
      matchID: '',
      playerOneName: '',
      playerTwoName: '',
      playerOneScore: 0,
      playerTwoScore: 0,
      playerOneGames: 0,
      playerTwoGames: 0,
      playerOneSets: 0,
      playerTwoSets: 0,
      matchFinished: false,
      winner: '',
    };

    let opts = Object.assign({}, defaults, options);
    Object.keys(defaults).forEach((prop) => {
      this[prop] = opts[prop];
    });
  }
};
