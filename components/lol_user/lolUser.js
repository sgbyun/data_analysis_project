class LolUser {
  constructor(
    lolId,
    reportCount,
    mannerGrade,
    level,
    rank,
    tier,
    wins,
    losses,
    createdAt,
    updatedAt
  ) {
    this._lolId = lolId;
    this._reportCount = reportCount;
    this._mannerGrade = mannerGrade;
    this._level = level;
    this._rank = rank;
    this._tier = tier;
    this._wins = wins;
    this._losses = losses;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  // Getter
  get lolId() {
    return this._lolId;
  }

  get reportCount() {
    return this._reportCount;
  }

  get mannerGrade() {
    return this._mannerGrade;
  }

  get level() {
    return this._level;
  }

  get rank() {
    return this._rank;
  }

  get tier() {
    return this._tier;
  }

  get wins() {
    return this._wins;
  }

  get losses() {
    return this._losses;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  // Setter
  set lolId(lolId) {
    this._lolId = lolId;
  }

  set reportCount(reportCount) {
    this._reportCount = reportCount;
  }

  set mannerGrade(mannerGrade) {
    this._mannerGrade = mannerGrade;
  }

  set level(level) {
    this._level = level;
  }

  set rank(rank) {
    this._rank = rank;
  }

  set tier(tier) {
    this._tier = tier;
  }

  set wins(wins) {
    this._wins = wins;
  }

  set losses(losses) {
    this._losses = losses;
  }

  set createdAt(createdAt) {
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt) {
    this._updatedAt = updatedAt;
  }
}

export { LolUser };
