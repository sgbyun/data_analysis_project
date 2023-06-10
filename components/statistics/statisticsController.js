import "dotenv/config";
import { Router } from "express";
import { statisticsService } from "./statisticsService.js";

const statsController = Router();

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

// 신고된 카테고리별 평균 점수
statsController.get("/stats/abuseScoreByCategory", async (req, res) => {
  const abuseScoreByCategory =
    await statisticsService.getAbuseScoreByCategory();
  console.log("statsController abuseScoreByCategory : ", abuseScoreByCategory);
  res.status(200).json(abuseScoreByCategory);
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

export { statsController };
