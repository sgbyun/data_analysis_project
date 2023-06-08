// 성별 비율
const selectMaleCnt = `select count(*) male from users where is_male = 1 `;
// 총 이용자 수
const selectTotalUserCnt = `select count(*) totalUser from users`;

export default {
  selectMaleCnt,
  selectTotalUserCnt,
};
