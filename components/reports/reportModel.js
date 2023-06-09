const insertReport = `INSERT INTO report (user_id, attacker_id, content, violence_at, created_at, updated_at) VALUES (?, ?, ?,?, NOW(), NOW())`;
const selectByEmail = `SELECT * FROM report WHERE userId =?`;
const selectReports = `SELECT * FROM report`;
const selectRecent = `SELECT * FROM report WHERE user_id = ? ORDER BY created_at DESC limit 1`;
const selectById = `SELECT * FROM report WHERE reportId =?`;
const deleteReport = `DELETE FROM report WHERE reportId =?`;
const updateReport = `UPDATE report SET status =? WHERE reportId =?`;
const insertReportImg = `INSERT INTO report_photo (report_id, path, original_name, mimetype, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`;
const insertCategory = `INSERT INTO abuse_score (report_id, category_name, content) VALUES (?,?,?)`;

export default {
  insertReport,
  selectByEmail,
  selectReports,
  selectRecent,
  selectById,
  deleteReport,
  updateReport,
  insertReportImg,
  insertCategory,
};
