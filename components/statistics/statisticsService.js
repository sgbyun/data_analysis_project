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
  static async getAbuseCntByAttackerUser(lolId) {
    const abuseCntByAttackerUser = (
      await connection
        .promise()
        .query(statisticsModel.selectAbuseCntByAttackerUser, [lolId])
    )[0];

    console.log(abuseCntByAttackerUser);

    return abuseCntByAttackerUser;
  }
  // 가해자별 최근 한달 사용한 언어폭력
  static async getAbuseCntByMonth(lolId) {
    const abuseCntByMonth = (
      await connection
        .promise()
        .query(statisticsModel.selectAbuseCntByMonth, [lolId])
    )[0];

    console.log(abuseCntByMonth);

    return abuseCntByMonth;
  }

  // 유저의 카테고리별 신고 당한 건수
  static async getUserReportedCntByCategory(emailId) {
    const userReportecCntByCategory = (
      await connection
        .promise()
        .query(statisticsModel.selectUserReportCntByCategory, [emailId])
    )[0];

    console.log(userReportecCntByCategory);

    return userReportecCntByCategory;
  }

  // 유저의 승인된 신고 건수, 미승인된 건수
  static async getUserReportCntByStatus(emailId) {
    const UserReportCnt = (
      await connection
        .promise()
        .query(statisticsModel.selectUserReportCntByStatus, [emailId])
    )[0];

    return UserReportCnt;
  }

  // 유저의 신고 당한 건수
  static async getUserReportedCnt(emailId) {
    const userReportedCnt = (
      await connection
        .promise()
        .query(statisticsModel.selectUserReportedCnt, [emailId])
    )[0];
    return userReportedCnt;
  }

  // 유저의 신고 한 건수
  static async getUserReportingCnt(emailId) {
    const userReportingCnt = (
      await connection
        .promise()
        .query(statisticsModel.selectUserReportingCnt, [emailId])
    )[0];
    return userReportingCnt;
  }
}

export { statisticsService };
