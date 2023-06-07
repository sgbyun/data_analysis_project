class Report {
  constructor(
    id,
    userId,
    attackerId, // api에서 user 검색해서 일치하는지
    status,
    abuseCategory,
    content,
    violenceAt,
    createdAt,
    updatedAt
  ) {
    this._id = id;
    this._userId = userId;
    this._attackerId = attackerId;
    this._status = status;
    this._content = content;
    this._abuseCategory = abuseCategory;
    this._violenceAt = violenceAt;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get attackerId() {
    return this._attackerId;
  }

  get status() {
    return this._status;
  }

  get abuseCategory() {
    return this._abuseCategory;
  }

  get content() {
    return this._content;
  }

  get violenceAt() {
    return this._violenceAt;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set id(id) {
    this._id = id;
  }

  set userId(userId) {
    this._userId = userId;
  }

  set attackerId(attackerId) {
    this._attackerId = attackerId;
  }

  set status(status) {
    this._status = status;
  }

  set abuseCategory(abuseCategory) {
    this._abuseCategory = abuseCategory;
  }

  set violenceAt(violenceAt) {
    this._violenceAt = violenceAt;
  }

  set createdAt(createdAt) {
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt) {
    this._updatedAt = updatedAt;
  }
}

export { Report };
