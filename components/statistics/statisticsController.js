import "dotenv/config";
import { Router } from "express";
import { statisticsService } from "./statisticsService.js";
import { login_required } from "../middlewares/login_required.js";

const statsController = Router();

// 총 이용자 수
statsController.get("/stats/userTotalCnt", async (req, res) => {
  try {
    const userTotalCnt = await statisticsService.getUserTotalCount();
    res.status(200).json(userTotalCnt);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// 전체 신고 건수
statsController.get("/stats/reportTotalCnt", async (req, res) => {
  try {
    const userTotalCnt = await statisticsService.getReportTotalCount();
    res.status(200).json(userTotalCnt);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// 성별
statsController.get("/stats/genderRatio", async (req, res) => {
  try {
    const genderRatio = await statisticsService.getGenderRatio();
    res.status(200).json(genderRatio);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// 티어별 신고 횟수
statsController.get("/stats/reportTierRatio", async (req, res) => {
  try {
    const reportTierRatio = await statisticsService.getReportTierRatio();
    res.status(200).json(reportTierRatio);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// 신고 누적 상위 10명
statsController.get("/stats/reportLoluserTopTen", async (req, res) => {
  const reportUserTopTen = await statisticsService.getReportLoluserTopTen();
  console.log("statsController reportUserTopTen : ", reportUserTopTen);
  res.status(200).json(reportUserTopTen);
});

// 월별 신고 누적 횟수
statsController.get("/stats/reportCntByMonth", async (req, res) => {
  const reportCntByMonth = await statisticsService.getReportCntByMonth();
  console.log("statsController reportCntByMonth : ", reportCntByMonth);
  res.status(200).json(reportCntByMonth);
});

// 신고된 카테고리 누적 횟수
statsController.get("/stats/abuseCntByCategory", async (req, res) => {
  const abuseCntByCategory = await statisticsService.getAbuseCntByCategory();
  console.log("statsController abuseCntByCategory : ", abuseCntByCategory);
  res.status(200).json(abuseCntByCategory);
});

// manner_grade별 cnt
statsController.get("/stats/loluserCntByMannerGrade", async (req, res) => {
  const loluserCntByMannerGrade =
    await statisticsService.getLoluserCntByMannerGrade();
  console.log(
    "statsController loluserCntByMannerGrade : ",
    loluserCntByMannerGrade
  );
  res.status(200).json(loluserCntByMannerGrade);
});

// 신고된 케테고리 누적횟수 순위
statsController.get("/stats/abuseCategoryRankByCnt", async (req, res) => {
  const abuseCategoryRankByCnt =
    await statisticsService.getAbuseCategoryRankByCnt();
  console.log(
    "statsController getAbuseCategoryRankByCnt : ",
    abuseCategoryRankByCnt
  );
  res.status(200).json(abuseCategoryRankByCnt);
});

// 가해자별로 가장 많이 신고된 언어폭력 종류
statsController.get(
  "/stats/abuseCntByAttackerUser/:lolId",
  async (req, res) => {
    const lolId = req.params.lolId;
    const abuseCntByAttackerUser =
      await statisticsService.getAbuseCntByAttackerUser(lolId);
    console.log(
      "statsController abuseCntByAttackerUser : ",
      abuseCntByAttackerUser
    );
    res.status(200).json(abuseCntByAttackerUser);
  }
);

// 최근 한달간 욕설한 횟수
statsController.get("/stats/basic/:lolId", async (req, res) => {
  const lolId = req.params.lolId;
  const abuseCntByAttackerUser =
    await statisticsService.getAbuseCntByAttackerUser(lolId);
  const abuseCntByMonth = await statisticsService.getAbuseCntByMonth(lolId);
  const toReturn = {
    category_name: abuseCntByAttackerUser[0]?.category_name,
    score_count: abuseCntByMonth[0]?.score_count,
  };
  console.log(toReturn);
  res.status(200).json(toReturn);
});

// 유저의 카테고리별 신고 당한 건수
statsController.get(
  "/stats/userReportedByCategory/:emailId",
  login_required,
  async (req, res) => {
    const emailId = req.currentEmailId;
    const userReportByCategory =
      await statisticsService.getUserReportedCntByCategory(emailId);
    res.status(200).json(userReportByCategory);
  }
);

// 유저의 승인된 신고 건수 미승인된 건수
statsController.get(
  "/stats/userReportCntByStatus/:emailId",
  login_required,
  async (req, res) => {
    const emailId = req.currentEmailId;
    const userReportByStatusCnt =
      await statisticsService.getUserReportCntByStatus(emailId);
    res.status(200).json(userReportByStatusCnt);
  }
);

// 유저의 신고 당한 건수, 신고한 건수
statsController.get(
  "/stats/userReportCnt/:emailId",
  login_required,
  async (req, res) => {
    const emailId = req.currentEmailId;
    const userReportedCnt = await statisticsService.getUserReportedCnt(emailId);
    const userReportingCnt = await statisticsService.getUserReportingCnt(
      emailId
    );
    res.status(200).json({ userReportedCnt, userReportingCnt });
  }
);

// 시간대별 욕설 당한 횟수
statsController.get("/stats/reportCntByTime", async (req, res) => {
  try {
    const reportCntByTime = await statisticsService.getReportCntByTime();
    res.status(200).json(reportCntByTime);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// 롤 티어별 욕설 분류 1위
statsController.get("/stats/reportCategoryByTier", async (req, res) => {
  try {
    const reportCategoryByTier =
      await statisticsService.getReportCategoryByTier();
    const reportTierTotalCnt = await statisticsService.getReportTierRatio();

    res.status(200).json({ reportCategoryByTier, reportTierTotalCnt });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export { statsController };
