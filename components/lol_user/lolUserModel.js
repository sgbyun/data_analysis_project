const insertLolUser = `INSERT INTO lol_user VALUES (?,0,'bronze',?,?,?,?,?,?,null,now(),now())`;
const selectLolUser = `SELECT * FROM lol_user WHERE lol_id =?`;
const updateLolUser = `UPDATE lol_user SET level=?,\`rank\`=?,tier=?,wins=?,losses=?,updated_at=now() WHERE lol_id=?`
const deleteLolUser = `UPDATE lol_user SET deleted_at = now(), updated_at = now() WHERE lol_id = ?`;

export default {
  insertLolUser,
  selectLolUser,
  updateLolUser,
  deleteLolUser,
};
