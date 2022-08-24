class Player {
  #username;
  #color;
  #role;
  #profile;
  #profession;
  #isRolledDice;
  #currentPosition;
  #lastPosition;
  #dualDiceCount;
  #skippedTurns;
  #canReRoll;
  #isInFastTrack;

  constructor(username, role, color, profession, profile) {
    this.#username = username;
    this.#role = role;
    this.#color = color;
    this.#profession = profession;
    this.#profile = profile;
    this.#isRolledDice = false;
    this.#currentPosition = 0;
    this.#lastPosition = 0;
    this.#dualDiceCount = 0;
    this.#skippedTurns = 0;
    this.#canReRoll = false;
    this.#isInFastTrack = false;
  }

  changeDiceStatus(status) {
    this.#isRolledDice = status;
  }

  initializeDualDiceCount() {
    this.#dualDiceCount = 3;
  }

  decrementDualDiceCount() {
    this.#dualDiceCount--;
  }

  allowReroll() {
    this.changeDiceStatus(false);
    this.#canReRoll = true;
  }

  deactivateReroll() {
    this.changeDiceStatus(true);
    this.#canReRoll = false;
  }

  get dualDiceCount() {
    return this.#dualDiceCount;
  }

  get isRolledDice() {
    return this.#isRolledDice;
  }

  get username() {
    return this.#username;
  }

  get currentPosition() {
    return this.#currentPosition;
  }

  initializeSkippedTurns() {
    this.#skippedTurns = 2;
  }

  decrementSkippedTurns() {
    this.#skippedTurns--;
  }

  get skippedTurns() {
    return this.#skippedTurns;
  }

  get color() {
    return this.#color;
  }

  payday() {
    return this.#profile.addPay();
  }

  canContinue() {
    return this.#profile.hasEnoughCash();
  }

  doodad(cost) {
    return this.#profile.deductDoodad(cost);
  }

  #setFastTrack() {
    if (this.#profile.isIncomeStable()) {
      this.#isInFastTrack = true;
      return;
    }
    this.#isInFastTrack = false;
  }

  buyRealEstate(card) {
    const status = this.#profile.addAsset(card);
    this.#setFastTrack();
    return status;
  }

  buyLottery(cost) {
    const status = this.#profile.buyLottery(cost);
    if (status) {
      this.allowReroll();
    }
    return status;
  }

  buyStocks(card, count) {
    return this.#profile.addStocks(card, count);
  }

  charity() {
    return this.#profile.donateCash();
  }

  downsized() {
    return this.#profile.payExpenses();
  }

  baby() {
    return this.#profile.addBaby();
  }

  move(steps) {
    this.#lastPosition = this.#currentPosition;
    this.#currentPosition = (this.#currentPosition + steps) % 24;
    if (this.#currentPosition === 0) {
      this.#currentPosition = 24;
    }
  }

  takeLoan(amount) {
    return this.#profile.addLoan(amount);
  }

  payLoan(amount) {
    const status = this.#profile.deductLoan(amount);
    this.#setFastTrack();
    return status;
  }

  sellStocks(stock, count) {
    return this.#profile.deductStocks(stock, count);
  }

  updateLotteryAmount(amount) {
    this.deactivateReroll();
    return this.#profile.updateCash(amount, 'Lottery');
  }

  hasStock(card) {
    return this.#profile.hasStock(card);
  }

  splitStocks(card) {
    this.#profile.splitStocks(card);
    this.deactivateReroll();
  }

  reverseSplitStocks(card) {
    this.#profile.reverseSplitStocks(card);
    this.deactivateReroll();
  }

  get details() {
    return {
      username: this.#username,
      role: this.#role,
      color: this.#color,
      profile: this.#profile.details,
      profession: this.#profession,
      isRolledDice: this.#isRolledDice,
      lastPosition: this.#lastPosition,
      currentPosition: this.#currentPosition,
      dualDiceCount: this.#dualDiceCount,
      skippedTurns: this.#skippedTurns,
      canReRoll: this.#canReRoll,
      isInFastTrack: this.#isInFastTrack
    };
  }
}

module.exports = { Player };
