// 성별 비율
const selectMaleCnt = `SELECT count(*) male FROM users WHERE is_male = 1 `;
// 총 이용자 수
const selectTotalUserCnt = `SELECT count(*) totalUser FROM users`;
// 리포트 전체 신고 건수
const selectReportCnt = `SELECT count(*) count FROM report WHERE status= 'completed' `;
// 티어별 누적 신고
const selectTierReportCnt = `SELECT lu.tier, COUNT(*) count
FROM lol_user lu
INNER JOIN report r ON lu.lol_id = r.attacker_id 
WHERE lu.tier IN ('challenger', 'grandmaster', 'master', 'diamond', 'platinum', 'gold', 'silver', 'bronze', 'iron')
	AND r.status = 'completed' 
GROUP BY lu.tier `;
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

// 유저의 카테고리별 신고 당한 횟수
const selectUserReportCntByCategory = `
SELECT r.attacker_id, a.category_name, COUNT(*) count
FROM report r
JOIN abuse_score a ON r.id = a.report_id
JOIN lol_user l ON r.attacker_id = l.lol_id
JOIN users u ON l.lol_id = u.lol_id
WHERE u.email_id = ? AND r.status = 'completed'
GROUP BY r.attacker_id, a.category_name
`;

// 유저가 승인된 신고, 미승인된 신고 한 횟수
const selectUserReportCntByStatus = `
SELECT count(*) count, status
FROM report
WHERE user_id = ?
GROUP BY status
`;

// 유저가 승인된 신고를 한 횟수
const selectUserReportingCnt = `
SELECT COUNT(*) count
FROM report r
INNER JOIN users u on r.user_id = u.email_id
WHERE r.status = 'completed'
AND u.email_id = ?
`;

// 유저가 신고당한 횟수
const selectUserReportedCnt = `
SELECT COUNT(*) count
FROM report r 
INNER JOIN users u ON r.attacker_id = u.lol_id
WHERE u.email_id = ?
AND r.status = 'completed'
`;

// 시간대별 욕설 당한 횟수
const selectReportCntByTime = `
SELECT
    COUNT(*) count,
    CASE
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 0 AND 1 THEN '0-2'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 2 AND 3 THEN '2-4'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 4 AND 5 THEN '4-6'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 6 AND 7 THEN '6-8'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 8 AND 9 THEN '8-10'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 10 AND 11 THEN '10-12'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 12 AND 13 THEN '12-14'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 14 AND 15 THEN '14-16'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 16 AND 17 THEN '16-18'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 18 AND 19 THEN '18-20'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 20 AND 21 THEN '20-22'
        WHEN EXTRACT(HOUR FROM violence_at) BETWEEN 22 AND 23 THEN '22-24'
    END hour_range
FROM report
WHERE
    status = 'completed'
    AND EXTRACT(HOUR FROM violence_at) BETWEEN 0 AND 23
GROUP BY hour_range
ORDER BY MIN(EXTRACT(HOUR FROM violence_at))
`;

// 롤 티어별 욕설 분류 1위 값
const selectReportCategoryByTier = `
SELECT t.tier, t.category_name, t.max_count
FROM (
    SELECT lu.tier, a.category_name, COUNT(*) count, MAX(COUNT(*)) OVER (PARTITION BY lu.tier) max_count
    FROM lol_user lu
    INNER JOIN report r ON lu.lol_id = r.attacker_id 
    INNER JOIN abuse_score a ON r.id = a.report_id
    WHERE lu.tier IN ('challenger', 'grandmaster', 'master', 'diamond', 'platinum', 'gold', 'silver', 'bronze', 'iron')
        AND r.status = 'completed' 
    GROUP BY lu.tier, a.category_name
) t
WHERE t.count = t.max_count
`;

export default {
  selectMaleCnt,
  selectTotalUserCnt,
  selectReportCnt,
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
  selectUserReportCntByCategory,
  selectUserReportCntByStatus,
  selectUserReportingCnt,
  selectUserReportedCnt,
  selectReportCntByTime,
  selectReportCategoryByTier,
};
