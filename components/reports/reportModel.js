const insertReport = `INSERT INTO report (userId, attackerId, abuseCategory, content, violenceAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())`;
const selectByEmail = `SELECT * FROM report WHERE userId =?`;
const selectReports = `SELECT * FROM report`;
const selectById = `SELECT * FROM report WHERE reportId =?`;
const deleteReport = `DELETE FROM report WHERE reportId =?`;
const updateReport = `UPDATE report SET status =? WHERE reportId =?`;
const insertReportImg = `INSERT INTO report_photo (reportId, path, originalName, mimetype, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())`;

export default {
  insertReport,
  selectByEmail,
  selectReports,
  selectById,
  deleteReport,
  updateReport,
  insertReportImg,
};
