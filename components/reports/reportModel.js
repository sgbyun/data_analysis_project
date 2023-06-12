const insertReport = `INSERT INTO report (user_id, attacker_id, content, violence_at, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`;
const selectByEmail = `SELECT * FROM report WHERE user_id =?`;
const selectReports = `SELECT * from report ORDER BY created_at DESC `;
const selectRecent = `SELECT * FROM report WHERE user_id = ? ORDER BY created_at DESC limit 1`;
const selectById = `SELECT * FROM report WHERE id =?`;
const deleteReport = `DELETE FROM report WHERE id =?`;
const updateReport = `UPDATE report SET status= ?, updated_at =? WHERE id = ?`;
const insertReportImg = `INSERT INTO report_photo (report_id, path, original_name, mimetype, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`;
const insertCategory = `INSERT INTO abuse_score (report_id, category_name, content) VALUES (?,?,?)`;

const selectReportsByOldandPending = `SELECT * FROM report WHERE status = 'pending' ORDER BY created_at ASC LIMIT ?,? `;
const selectReportsByOldandCompleted = `SELECT * FROM report WHERE status = 'completed' ORDER BY created_at ASC LIMIT ?,? `;
const selectReportsByOldandRejected = `SELECT * FROM report WHERE status = 'rejected' ORDER BY created_at ASC LIMIT ?,?`;
const selectReportsByNewandPending = `SELECT * FROM report WHERE status = 'pending' ORDER BY created_at DESC LIMIT ?,? `;
const selectReportsByNewandCompleted = `SELECT * FROM report WHERE status = 'completed' ORDER BY created_at DESC LIMIT ?,? `;
const selectReportsByNewandRejected = `SELECT * FROM report WHERE status = 'rejected' ORDER BY created_at DESC LIMIT ?,?`;

const selectTotalReportCnt = `SELECT count(*) FROM report `;
const selectReportsByAsc = `SELECT * from report ORDER BY created_at ASC`;
const selectTotalReportCompletedCnt = `SELECT count(*) FROM report WHERE status = 'completed' `;
const selectTotalReportPendingCnt = `SELECT count(*) FROM report WHERE status = 'pending' `;
const selectTotalReportRejectedCnt = `SELECT count(*) FROM report WHERE status = 'rejected' `;

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
  selectReportsByAsc,
  selectReportsByOldandPending,
  selectReportsByOldandCompleted,
  selectReportsByOldandRejected,
  selectReportsByNewandPending,
  selectReportsByNewandCompleted,
  selectReportsByNewandRejected,
  selectTotalReportCnt,
  selectTotalReportCompletedCnt,
  selectTotalReportPendingCnt,
  selectTotalReportRejectedCnt,
};
