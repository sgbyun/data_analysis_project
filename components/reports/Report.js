class Report {
  constructor(
    reportId,
    userId, // = emailId
    attackerId, // api에서 user 검색해서 일치하는지
    status,
    content,
    violenceAt,
    createdAt,
    updatedAt
  ) {
    this._reportId = reportId;
    this._userId = userId;
    this._attackerId = attackerId;
    this._status = status;
    this._content = content;
    this._violenceAt = violenceAt;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get reportId() {
    return this._reportId;
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

  set reportId(reportId) {
    this._id = reportId;
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

class ReportImg {
  constructor(
    imgId,
    reportId,
    path,
    originalName,
    mimetype,
    createdAt,
    updatedAt
  ) {
    this._imgId = imgId;
    this._reportId = reportId;
    this._path = path;
    this._originalName = originalName;
    this._mimetype = mimetype;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }
  get imgId() {
    return this._imgId;
  }
  get reportId() {
    return this._reportId;
  }
  get path() {
    return this._path;
  }
  get originalName() {
    return this._originalName;
  }
  get mimetype() {
    return this._mimetype;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  set imgId(imgId) {
    this._imgId = imgId;
  }
  set reportId(reportId) {
    this._reportId = reportId;
  }
  set path(path) {
    this._path = path;
  }
  set originalName(originalName) {
    this._originalName = originalName;
  }
  set mimetype(mimetype) {
    this._mimetype = mimetype;
  }
  set createdAt(createdAt) {
    this._createdAt = createdAt;
  }
  set updatedAt(updatedAt) {
    this._updatedAt = updatedAt;
  }
}

class ReportCategory {
  constructor(reportId, categoryName, content) {
    this._reportId = reportId;
    this._categoryName = categoryName;
    this._content = content;
  }
  get reportId() {
    return this._reportId;
  }
  get categoryName() {
    return this._categoryName;
  }
  get content() {
    return this._content;
  }

  set reportId(reportId) {
    this._reportId = reportId;
  }
  set categoryName(categoryName) {
    this._categoryName = categoryName;
  }
  set content(content) {
    this._content = content;
  }
}

export { Report, ReportImg, ReportCategory };
