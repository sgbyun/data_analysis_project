const insertReport = `INSERT INTO report (id, userId, status, attackerId, abuseCategory, content, violenceAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;
const userReport = `SELECT * FROM user as u INNER JOIN report as r ON u.emailId = r.userId`;
const selectByEmail = `SELECT * FROM report WHERE email =?`;
const selectReports = `SELECT * FROM report`;
const selectById = `SELECT * FROM report WHERE id =?`;
const deleteReport = `DELETE FROM report WHERE id =?`;
const updateReport = `UPDATE report SET status =? WHERE id =?`;

export default {
  insertReport,
  userReport,
  selectByEmail,
  selectReports,
  selectById,
  deleteReport,
  updateReport,
};
