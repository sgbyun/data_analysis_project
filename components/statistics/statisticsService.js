import { connection } from "../../index.js";
import statisticsModel from "./statisticsModel.js";
import { logger } from "../utils/winston.js";

class statisticsService {
  // 총 유저의 수
  static async getUserTotalCount() {
    try {
      const totalUserCnt = (
        await connection.promise().query(statisticsModel.selectTotalUserCnt)
      )[0][0].totalUser;
      return totalUserCnt;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // 성별
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

  // report 전체 신고 수
  static async getReportTotalCount() {
    try {
      const totalReportCnt = (
        await connection.promise().query(statisticsModel.selectReportCnt)
      )[0][0].count;
      return totalReportCnt;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 티어 별 신고 횟수
  static async getReportTierRatio() {
    const reportTierCnt = (
      await connection.promise().query(statisticsModel.selectTierReportCnt)
    )[0];

    logger.info(reportTierCnt);

    return reportTierCnt;
  }

  // 신고 누적 횟수 상위 10명
  static async getReportLoluserTopTen() {
    const reportLoluserTopTen = (
      await connection.promise().query(statisticsModel.selecteportLoluserTopTen)
    )[0];

    logger.info(reportLoluserTopTen);

    return reportLoluserTopTen;
  }

  // 신고된 카테고리 누적 횟수
  static async getAbuseCntByCategory() {
    const abuseCntByCategory = (
      await connection.promise().query(statisticsModel.selectAbuseCntByCategory)
    )[0];

    logger.info(abuseCntByCategory);

    return abuseCntByCategory;
  }

  // 월별 신고 누적 횟수
  static async getReportCntByMonth() {
    const reportCntByMonth = (
      await connection.promise().query(statisticsModel.selectReportCntByMonth)
    )[0];

    logger.info(reportCntByMonth);

    return reportCntByMonth;
  }

  // manner_grade별 cnt
  static async getLoluserCntByMannerGrade() {
    const loluserCntByMannerGrade = (
      await connection
        .promise()
        .query(statisticsModel.selectLoluserCntByMannerGrade)
    )[0];

    logger.info(loluserCntByMannerGrade);

    return loluserCntByMannerGrade;
  }

  // 신고된 카테고리 누적횟수 순위
  static async getAbuseCategoryRankByCnt() {
    const abuseCategoryRankByCnt = (
      await connection
        .promise()
        .query(statisticsModel.selectAbuseCategoryRankByCnt)
    )[0];

    logger.info(abuseCategoryRankByCnt);

    return abuseCategoryRankByCnt;
  }

  // 가해자별로 가장 많이 신고된 언어폭력 종류
  static async getAbuseCntByAttackerUser(lolId) {
    const abuseCntByAttackerUser = (
      await connection
        .promise()
        .query(statisticsModel.selectAbuseCntByAttackerUser, [lolId])
    )[0];

    logger.info(abuseCntByAttackerUser);

    return abuseCntByAttackerUser;
  }
  // 가해자별 최근 한달 사용한 언어폭력
  static async getAbuseCntByMonth(lolId) {
    const abuseCntByMonth = (
      await connection
        .promise()
        .query(statisticsModel.selectAbuseCntByMonth, [lolId])
    )[0];

    logger.info(abuseCntByMonth);

    return abuseCntByMonth;
  }

  // 유저의 카테고리별 신고 당한 건수
  static async getUserReportedCntByCategory(emailId) {
    const userReportecCntByCategory = (
      await connection
        .promise()
        .query(statisticsModel.selectUserReportCntByCategory, [emailId])
    )[0];

    logger.info(userReportecCntByCategory);

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

  // 시간대별 욕설 당한 횟수
  static async getReportCntByTime() {
    const reportCntByTime = (
      await connection.promise().query(statisticsModel.selectReportCntByTime)
    )[0];
    return reportCntByTime;
  }

  // 시간대별 욕설 한 횟수 (lolId)
  static async getReportCntByTimeByLolId(lolId) {
    const reportCntByTimeByLolId = (
      await connection
        .promise()
        .query(statisticsModel.selectReportCntByTimeByLolId, [lolId])
    )[0];
    return reportCntByTimeByLolId;
  }

  // 롤 티어별 욕설 분류 1위
  static async getReportCategoryByTier() {
    const reportCategoryByTier = (
      await connection
        .promise()
        .query(statisticsModel.selectReportCategoryByTier)
    )[0];
    return reportCategoryByTier;
  }

  // 검색한 유저의 총 신고당한 건수
  static async getSearchLolUserReportCntByCategory(lolId) {
    const searchLolUserReportCntByCategory = (
      await connection
        .promise()
        .query(statisticsModel.selectSearchLolUserReportCntByCategory, [lolId])
    )[0];
    return searchLolUserReportCntByCategory;
  }

  // 시간대 별 욕설 당한 횟수
  static async getReportCntByTime() {
    const reportCntByTime = (
      await connection.promise().query(statisticsModel.selectReportCntByTime)
    )[0];
    return reportCntByTime;
  }
}

export { statisticsService };
