const insertUser = `INSERT INTO users VALUES (?,?,?,?,?,?,?,?,null,now(),now())`;
const selectUser = `SELECT * FROM users`;
const updateUser = `UPDATE users SET password = ?, nickname = ?, name = ?, is_male= ?, lol_id = ?, updated_at = now() WHERE email_id = ?`;
const updatePassword = `UPDATE users SET password = ?, updated_at = now() WHERE email_id =?`;
const deleteUser = `UPDATE users SET deleted_at = now(), updated_at = now() WHERE email_id = ?`;
const selectUserOne = `select * from users where email_id = ?`;
const insertKey = `INSERT INTO temp_auth SET email_id = ?, auth_key = ?, created_at = now()`;
const selectKey = `SELECT * FROM temp_auth WHERE email_id = ? ORDER BY created_at DESC LIMIT 1`;
const deleteKey = `DELETE FROM temp_auth WHERE email_id =?`;

export default {
  insertUser,
  selectUser,
  updateUser,
  updatePassword,
  deleteUser,
  selectUserOne,
  insertKey,
  selectKey,
  deleteKey,
};
