// 성별 비율
const selectMaleCnt = `SELECT count(*) male FROM users WHERE is_male = 1 `;
// 총 이용자 수
const selectTotalUserCnt = `SELECT count(*) totalUser FROM users`;
// 티어별 누적 신고
const selectTierReportCnt = `SELECT lu.tier, COUNT(*) count
FROM lol_user lu
INNER JOIN report r ON lu.lol_id = r.attacker_id 
WHERE lu.tier IN ('challenger', 'grandmaster', 'master', 'diamond', 'platinum', 'gold', 'silver', 'bronze', 'iron')
	AND r.status = 'completed' 
GROUP BY lu.tier; ; `;
// 챌린저 티어 누적 신고
const selectReportChallengerCnt = `SELECT count(*) challenger FROM lol_user lu inner JOIN report r on lu.lol_id = r.attacker_id WHERE lu.tier = challenger`;
// 그랜드마스터 티어 누적 신고
const selectReportGrandmasterCnt = `SELECT count(*) grandmaster FROM lol_user lu inner JOIN report r on lu.lol_id = r.attacker_id WHERE lu.tier = grandmaster`;
// 마스터 티어 누적 신고
const selectReportMasterCnt = `SELECT count(*) master FROM lol_user lu inner JOIN report r on lu.lol_id = r.attacker_id WHERE lu.tier = master`;
// 다이아 티어 누적 신고
const selectReportDiamondCnt = `SELECT count(*) diamond FROM lol_user lu inner JOIN report r on lu.lol_id = r.attacker_id WHERE lu.tier = diamond`;
// 플래티넘 티어 누적 신고
const selectReportPlatinumCnt = `SELECT count(*) platinum FROM lol_user lu inner JOIN report r on lu.lol_id = r.attacker_id WHERE lu.tier = platinum`;
// 골드 티어 누적 신고
const selectReportGoldCnt = `SELECT count(*) FROM gold lol_user lu inner JOIN report r on lu.lol_id = r.attacker_id WHERE lu.tier = gold`;
// 실버 티어 누적 신고
const selectReportSliverCnt = `SELECT count(*) FROM silver lol_user lu inner JOIN report r on lu.lol_id = r.attacker_id WHERE lu.tier = silver`;
// 브론즈 티어 누적 신고
const selectReportBronzeCnt = `SELECT count(*) bronze FROM lol_user lu inner JOIN report r on lu.lol_id = r.attacker_id WHERE lu.tier = bronze`;
// 아이언 티어 누적 신고
const selectReportIronCnt = `SELECT count(*) iron FROM lol_user lu inner JOIN report r on lu.lol_id = r.attacker_id WHERE lu.tier = iron`;
// 신고 누적 상위 10명
const selecteportLoluserTopTen = ` SELECT attacker_id, COUNT(*) count
FROM report
WHERE status = 'completed'
GROUP BY attacker_id
ORDER BY count DESC
LIMIT 10 `;
// 신고된 카테고리 누적횟수
const selectAbuseCntByCategory = `SELECT category_name, COUNT(*) AS category_count
FROM abuse_score AS a
JOIN report r ON a.report_id = r.id
WHERE r.status = 'completed'
GROUP BY category_name;
;`;
// 월별 신고 누적 횟수
const selectReportCntByMonth = `SELECT DATE_FORMAT(violence_at, '%m') month, COUNT(*) report_count
FROM report
WHERE status = 'completed'
GROUP BY month;
`;
// manner_grade별 cnt
const selectLoluserCntByMannerGrade = `SELECT manner_grade, COUNT(*) grade_count
FROM lol_user
GROUP BY manner_grade;
`;
// 신고된 카테고리 누적횟수 순위
const selectAbuseCategoryRankByCnt = `SELECT category_name, COUNT(*) totalReports
FROM abuse_score a
JOIN report r ON a.report_id = r.id
WHERE r.status = 'completed'
GROUP BY category_name
ORDER BY totalReports DESC;
`;

const selectAbuseCntByAttackerUser = `SELECT category_name
FROM abuse_score
WHERE report_id IN (
  SELECT id report_id
  FROM report
  WHERE attacker_id = ?
)
GROUP BY category_name
ORDER BY COUNT(*) DESC
LIMIT 1;
`;

const selectAbuseCntByMonth = `
SELECT COUNT(*) score_count
FROM abuse_score
WHERE report_id IN (
  SELECT id report_id
  FROM report
  WHERE attacker_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
);
`;

export default {
  selectMaleCnt,
  selectTotalUserCnt,
  selectTierReportCnt,
  selectReportChallengerCnt,
  selectReportGrandmasterCnt,
  selectReportMasterCnt,
  selectReportDiamondCnt,
  selectReportPlatinumCnt,
  selectReportGoldCnt,
  selectReportSliverCnt,
  selectReportBronzeCnt,
  selectReportIronCnt,
  selecteportLoluserTopTen,
  selectAbuseCntByCategory,
  selectReportCntByMonth,
  selectLoluserCntByMannerGrade,
  selectAbuseCategoryRankByCnt,
  selectAbuseCntByAttackerUser,
  selectAbuseCntByMonth,
};
