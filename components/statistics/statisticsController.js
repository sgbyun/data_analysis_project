import "dotenv/config";
import { Router } from "express";
import { statisticsService } from "./statisticsService.js";
import { loginRequired } from "../middlewares/loginRequired.js";
import { logger } from "../utils/winston.js";

const statsController = Router();

// 총 이용자 수
statsController.get("/stats/userTotalCnt", async (req, res) => {
  try {
    const userTotalCnt = await statisticsService.getUserTotalCount();
    logger.info("총 이용자수 불러오기 성공", userTotalCnt);
    res.status(200).json(userTotalCnt);
  } catch (error) {
    logger.error("총 이용자수 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 전체 신고 건수
statsController.get("/stats/reportTotalCnt", async (req, res) => {
  try {
    const userTotalCnt = await statisticsService.getReportTotalCount();
    logger.info("전체 신고 건수 불러오기 성공", userTotalCnt);
    res.status(200).json(userTotalCnt);
  } catch (error) {
    logger.error("전체 신고 건수 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 성별
statsController.get("/stats/genderRatio", async (req, res) => {
  try {
    const genderRatio = await statisticsService.getGenderRatio();
    logger.info("성별 비율 불러오기 성공", genderRatio);
    res.status(200).json(genderRatio);
  } catch (error) {
    logger.error("성별 비율 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 티어별 신고 횟수
statsController.get("/stats/reportTierRatio", async (req, res) => {
  try {
    const reportTierRatio = await statisticsService.getReportTierRatio();
    logger.info("티어별 신고 횟수 불러오기 성공", reportTierRatio);
    res.status(200).json(reportTierRatio);
  } catch (error) {
    logger.error("티어별 신고 횟수 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 신고 누적 상위 10명
statsController.get("/stats/reportLoluserTopTen", async (req, res) => {
  try {
    const reportUserTopTen = await statisticsService.getReportLoluserTopTen();
    logger.info("신고 누적 상위 10명 불러오기 성공", reportUserTopTen);
    res.status(200).json(reportUserTopTen);
  } catch (error) {
    logger.error("신고 누적 상위 10명 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 월별 신고 누적 횟수
statsController.get("/stats/reportCntByMonth", async (req, res) => {
  try {
    const reportCntByMonth = await statisticsService.getReportCntByMonth();
    logger.info("월별 신고 누적 횟수 불러오기 성공", reportCntByMonth);
    res.status(200).json(reportCntByMonth);
  } catch (error) {
    logger.error("월별 신고 누적 횟수 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 신고된 카테고리 누적 횟수
statsController.get("/stats/abuseCntByCategory", async (req, res) => {
  try {
    const abuseCntByCategory = await statisticsService.getAbuseCntByCategory();
    logger.info("신고된 카테고리 누적 횟수 불러오기 성공", abuseCntByCategory);
    res.status(200).json(abuseCntByCategory);
  } catch (error) {
    logger.error("신고된 카테고리 누적 횟수 불러오기 실패");
    res.status(500).json({ error });
  }
});

// manner_grade별 cnt
statsController.get("/stats/loluserCntByMannerGrade", async (req, res) => {
  try {
    const loluserCntByMannerGrade =
      await statisticsService.getLoluserCntByMannerGrade();
    logger.info("manner_grade별 cnt 불러오기 성공", loluserCntByMannerGrade);
    res.status(200).json(loluserCntByMannerGrade);
  } catch (error) {
    logger.error("manner_grade별 cnt 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 신고된 케테고리 누적횟수 순위
statsController.get("/stats/abuseCategoryRankByCnt", async (req, res) => {
  try {
    const abuseCategoryRankByCnt =
      await statisticsService.getAbuseCategoryRankByCnt();
    logger.info(
      "신고 카테고리 누적횟수 순위 불러오기 성공",
      abuseCategoryRankByCnt
    );
    res.status(200).json(abuseCategoryRankByCnt);
  } catch (error) {
    logger.error("신고 카테고리 누적횟수 순위 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 가해자별로 가장 많이 신고된 언어폭력 종류
statsController.get(
  "/stats/abuseCntByAttackerUser/:lolId",
  async (req, res) => {
    try {
      const lolId = req.params.lolId;
      const abuseCntByAttackerUser =
        await statisticsService.getAbuseCntByAttackerUser(lolId);
      console.log(
        "statsController abuseCntByAttackerUser : ",
        abuseCntByAttackerUser
      );
      logger.info(
        "가해자 별로 가장 많이 신고된 언어폭력 종류 불러오기 성공",
        abuseCntByAttackerUser
      );
      res.status(200).json(abuseCntByAttackerUser);
    } catch (error) {
      logger.error("가해자 별로 가장 많이 신고된 언어폭력 종류 불러오기 실패");
      res.status(500).json({ error });
    }
  }
);

// 최근 한달간 욕설한 횟수
statsController.get("/stats/basic/:lolId", async (req, res) => {
  try {
    const lolId = req.params.lolId;
    const abuseCntByAttackerUser =
      await statisticsService.getAbuseCntByAttackerUser(lolId);
    const abuseCntByMonth = await statisticsService.getAbuseCntByMonth(lolId);
    const toReturn = {
      category_name: abuseCntByAttackerUser[0]?.category_name,
      score_count: abuseCntByMonth[0]?.score_count,
    };
    logger.info("lol유저의 최근 한달간 욕설한 횟수 불러오기 성공", toReturn);
    res.status(200).json(toReturn);
  } catch (error) {
    logger.error("lol유저의 최근 한달간 욕설한 횟수 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 유저의 카테고리별 신고 당한 건수
statsController.get(
  "/stats/userReportedByCategory/:emailId",
  loginRequired,
  async (req, res) => {
    try {
      const emailId = req.currentEmailId;
      const userReportByCategory =
        await statisticsService.getUserReportedCntByCategory(emailId);
      logger.info(
        "유저별 카테고리별 신고 당한 건수 불러오기 성공",
        userReportByCategory
      );
      res.status(200).json(userReportByCategory);
    } catch (error) {
      logger.error("유저별 카테고리별 신고 당한 건수 불러오기 실패");
      res.status(500).json({ error });
    }
  }
);

// 유저의 승인된 신고 건수 미승인된 건수
statsController.get(
  "/stats/userReportCntByStatus/:emailId",
  loginRequired,
  async (req, res) => {
    try {
      const emailId = req.currentEmailId;
      const userReportByStatusCnt =
        await statisticsService.getUserReportCntByStatus(emailId);
      logger.info(
        "유저의 승인된 신고 건수 미승인된 건수 불러오기 성공",
        userReportByStatusCnt
      );
      res.status(200).json(userReportByStatusCnt);
    } catch (error) {
      logger.error("유저의 승인된 신고 건수 미승인된 건수 불러오기 실패");
      res.status(500).json({ error });
    }
  }
);

// 유저의 신고 당한 건수, 신고한 건수
statsController.get(
  "/stats/userReportCnt/:emailId",
  loginRequired,
  async (req, res) => {
    try {
      const emailId = req.currentEmailId;
      const userReportedCnt = await statisticsService.getUserReportedCnt(
        emailId
      );
      const userReportingCnt = await statisticsService.getUserReportingCnt(
        emailId
      );
      logger.info("유저의 신고당한 건수, 신고한 건수 불러오기 성공", {
        userReportedCnt,
        userReportingCnt,
      });
      res.status(200).json({ userReportedCnt, userReportingCnt });
    } catch (error) {
      logger.error("유저의 신고당한 건수, 신고한 건수 불러오기 실패");
      res.status(500).json({ error });
    }
  }
);

// 시간대별 욕설 당한 횟수
statsController.get("/stats/reportCntByTime", async (req, res) => {
  try {
    const reportCntByTime = await statisticsService.getReportCntByTime();
    logger.info("시간대별 욕설당한 횟수 불러오기 성공", reportCntByTime);
    res.status(200).json(reportCntByTime);
  } catch (error) {
    logger.error("시간대별 욕설당한 횟수 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 롤 티어별 욕설 분류 1위
statsController.get("/stats/reportCategoryByTier", async (req, res) => {
  try {
    const reportCategoryByTier =
      await statisticsService.getReportCategoryByTier();
    const reportTierTotalCnt = await statisticsService.getReportTierRatio();
    logger.info("롤 티어별 욕설 분류 1위 불러오기 성공", {
      reportCategoryByTier,
      reportTierTotalCnt,
    });
    res.status(200).json({ reportCategoryByTier, reportTierTotalCnt });
  } catch (error) {
    logger.error("롤 티어별 욕설 분류 1위 불러오기 실패");
    res.status(500).json({ error });
  }
});

// 검색한 유저의 총 신고당한 건수
statsController.get(
  "/stats/searchLolUserReportCntByCategory/:lolId",
  async (req, res) => {
    try {
      const lolId = req.params.lolId;
      const searchLolUserReportCntByCategory =
        await statisticsService.getSearchLolUserReportCntByCategory(lolId);
      logger.info(
        "검색한 유저의 총 신고당한 건수 불러오기 성공",
        searchLolUserReportCntByCategory
      );
      res.status(200).json({ searchLolUserReportCntByCategory });
    } catch (error) {
      logger.error("검색한 유저의 총 신고당한 건수 불러오기 실패");
      res.status(500).json({ error });
    }
  }
);

// 시간대 별 욕설 당한 횟수
statsController.get("/stats/reportCntByTime", async (req, res) => {
  try {
    const reportCntByTime = await statisticsService.getReportCntByTime(lolId);
    logger.info("시간대 별 욕설 당한 횟수 불러오기 성공", reportCntByTime);
    res.status(200).json({ reportCntByTime });
  } catch (error) {
    logger.error("시간대 별 욕설 당한 횟수 불러오기 실패");
    res.status(500).json({ error });
  }
});

export { statsController };
