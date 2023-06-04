class User {
    constructor(emailId, password, nickname, name, personalInfoAgree, grant, isMale, lolId, deletedAt, createdAt, updatedAt) {
      this._emailId = emailId;
      this._password = password;
      this._nickname = nickname;
      this._name = name;
      this._personalInfoAgree = personalInfoAgree;
      this._grant = grant;
      this._isMale = isMale;
      this._lolId = lolId;
      this._deletedAt = deletedAt;
      this._createdAt = createdAt;
      this._updatedAt = updatedAt;
    }
  
    // Getter
    get emailId() {
      return this._emailId;
    }
  
    get password() {
      return this._password;
    }
  
    get nickname() {
      return this._nickname;
    }
  
    get name() {
      return this._name;
    }
  
    get personalInfoAgree() {
      return this._personalInfoAgree;
    }
  
    get grant() {
      return this._grant;
    }
  
    get isMale() {
      return this._isMale;
    }
  
    get lolId() {
      return this._lolId;
    }
  
    get deletedAt() {
      return this._deletedAt;
    }
  
    get createdAt() {
      return this._createdAt;
    }
  
    get updatedAt() {
      return this._updatedAt;
    }
  
    // Setter
    set emailId(emailId) {
      this._emailId = emailId;
    }
  
    set password(password) {
      this._password = password;
    }
  
    set nickname(nickname) {
      this._nickname = nickname;
    }
  
    set name(name) {
      this._name = name;
    }
  
    set personalInfoAgree(personalInfoAgree) {
      this._personalInfoAgree = personalInfoAgree;
    }
  
    set grant(grant) {
      this._grant = grant;
    }
  
    set isMale(isMale) {
      this._isMale = isMale;
    }
  
    set lolId(lolId) {
      this._lolId = lolId;
    }
  
    set deletedAt(deletedAt) {
      this._deletedAt = deletedAt;
    }
  
    set createdAt(createdAt) {
      this._createdAt = createdAt;
    }
  
    set updatedAt(updatedAt) {
      this._updatedAt = updatedAt;
    }
  }
  
  module.exports = User;