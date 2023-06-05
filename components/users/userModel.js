const insertUser = `INSERT INTO users VALUES (?,?,?,?,?,?,?,?,null,now(),now())`;
const selectUser = `SELECT * FROM users`;
const updateUser = `UPDATE users SET password = ?, nickname = ?, name = ?, is_male= ?, lol_id = ?, updated_at = now() WHERE email_id = ?`;
const deleteUser = `UPDATE users SET deleted_at = now(), updated_at = now() WHERE email_id = ?`;

export default {
  insertUser,
  selectUser,
  updateUser,
  deleteUser,
};
