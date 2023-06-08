import { connection } from "../../index.js";
import statisticsModel from "./statisticsModel.js";

class statisticsService {
  static async getGenderRatio() {
    try {
      // 총 유저의 수
      const totalUserCnt = (
        await connection.promise().query(statisticsModel.selectTotalUserCnt)
      )[0][0].totalUser;

      // 남자 유저 수
      const maleCnt = (
        await connection.promise().query(statisticsModel.selectMaleCnt)
      )[0][0].male;

      const genderRatio = (parseInt(maleCnt) / parseInt(totalUserCnt)) * 100;

      return genderRatio;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 티어 별 신고 횟수
  static async getReportTierRatio() {
    const reportTierCnt = (
      await connection.promise().query(statisticsModel.selectTierReportCnt)
    )[0];

    console.log(reportTierCnt);

    return reportTierCnt;
  }

  // 신고 누적 횟수 상위 10명
  static async getReportLoluserTopTen() {
    const reportLoluserTopTen = (
      await connection.promise().query(statisticsModel.selecteportLoluserTopTen)
    )[0];

    console.log(reportLoluserTopTen);

    return reportLoluserTopTen;
  }

  // 신고된 카테고리 누적 횟수
  static async getAbuseCntByCategory() {
    const abuseCntByCategory = (
      await connection.promise().query(statisticsModel.selectAbuseCntByCategory)
    )[0];

    console.log(abuseCntByCategory);

    return abuseCntByCategory;
  }

  // 신고된 카테고리별 평균 점수
  static async getAbuseScoreByCategory() {
    const abuseScoreByCategory = (
      await connection
        .promise()
        .query(statisticsModel.selectAbuseScoreByCategory)
    )[0];

    console.log(abuseScoreByCategory);

    return abuseScoreByCategory;
  }

  // 월별 신고 누적 횟수
  static async getReportCntByMonth() {
    const reportCntByMonth = (
      await connection.promise().query(statisticsModel.selectReportCntByMonth)
    )[0];

    console.log(reportCntByMonth);

    return reportCntByMonth;
  }

  // manner_grade별 cnt
  static async getLoluserCntByMannerGrade() {
    const loluserCntByMannerGrade = (
      await connection
        .promise()
        .query(statisticsModel.selectLoluserCntByMannerGrade)
    )[0];

    console.log(loluserCntByMannerGrade);

    return loluserCntByMannerGrade;
  }

  // 신고된 카테고리 누적횟수 순위
  static async getAbuseCategoryRankByCnt() {
    const abuseCategoryRankByCnt = (
      await connection
        .promise()
        .query(statisticsModel.selectAbuseCategoryRankByCnt)
    )[0];

    console.log(abuseCategoryRankByCnt);

    return abuseCategoryRankByCnt;
  }

  // 가해자별로 가장 많이 신고된 언어폭력 종류
  static async getAbuseCntByAttackerUser() {
    const abuseCntByAttackerUser = (
      await connection
        .promise()
        .query(statisticsModel.selectAbuseCntByAttackerUser)
    )[0];

    console.log(abuseCntByAttackerUser);

    return abuseCntByAttackerUser;
  }
}

export { statisticsService };
