const insertLolUser = `INSERT INTO lol_user VALUES (?,0,'bronze',?,?,?,?,?,null,now(),now())`;
const selectLolUser = `SELECT * FROM lol_user WHERE lol_id =? AND deleted_at IS NULL`;
const updateLolUser = `UPDATE lol_user SET level=?, \`rank\`=?, tier=?, wins=?, losses=?, updated_at=now() WHERE lol_id=? AND deleted_at IS NULL`;
const reportLolUser = `UPDATE lol_user SET report_count =?,manner_grade=?, updated_at=now() WHERE lol_id=? AND deleted_at IS NULL`;
const deleteLolUser = `UPDATE lol_user SET deleted_at = now(), updated_at = now() WHERE lol_id = ?`;

export default {
  insertLolUser,
  selectLolUser,
  updateLolUser,
  reportLolUser,
  deleteLolUser,
};
