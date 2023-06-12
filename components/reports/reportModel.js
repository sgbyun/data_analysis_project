const insertReport = `INSERT INTO report (user_id, attacker_id, content, violence_at, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`;
const selectByEmail = `SELECT * FROM report WHERE user_id =?`;
const selectReports = `SELECT * FROM report`;
const selectRecent = `SELECT * FROM report WHERE user_id = ? ORDER BY created_at DESC limit 1`;
const selectById = `SELECT * FROM report WHERE id =?`;
const deleteReport = `DELETE FROM report WHERE id =?`;
const updateReport = `UPDATE report SET status= ?, updated_at = NOW() WHERE id = ?`;
const insertReportImg = `INSERT INTO report_photo (report_id, path, original_name, mimetype, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`;
const insertCategory = `INSERT INTO abuse_score (report_id, category_name, content) VALUES (?,?,?)`;
const selectCategoriesById = `SELECT * FROM abuse_score WHERE report_id = ?`;
const selectPhotoById = `SELECT * FROM report_photo WHERE report_id =?`;
const updateCategory = `UPDATE abuse_score SET category_name =? WHERE report_id=? AND content = ?`;
const updateReportCount = `UPDATE lol_user
SET report_count = (
  SELECT COUNT(*)
  FROM abuse_score AS ab
  JOIN report AS r ON r.id = ab.report_id
  WHERE r.attacker_id = lol_user.lol_id
    AND r.status = 'completed'
    AND ab.category_name <> 'clean'
)
WHERE lol_id = (SELECT lol_id FROM report WHERE id = ?)`;
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
  selectPhotoById,
  selectCategoriesById,
  updateCategory,
  updateReportCount,
};
