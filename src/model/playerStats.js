module.exports = class playerStats {
  constructor(options) {
    const defaults = {
      name: '',
      gameWon: 0,
      gameLost: 0,
    };

    let opts = Object.assign({}, defaults, options);
    Object.keys(defaults).forEach((prop) => {
      this[prop] = opts[prop];
    });
  }
};
