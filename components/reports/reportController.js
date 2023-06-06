import { Router } from "express";
import { reportService } from "../report/reportService";

const reportRouter = Router();

// 신고 등록
reportRouter.post("/report/register", async (req, res, next) => {
  try {
    const { id, userId, attackerId, content } = req.body;

    const newReport = await reportService.addReport({
      id,
      userId,
      attackerId,
      content,
    });

    if (newReport.errMessage) {
      throw new Error(newReport.errMessage);
    }
    return res.status(201).json(newReport);
  } catch (error) {
    next(error);
  }
});

// 신고 게시판으로 이동
reportRouter.get("/report", async (req, res, next) => {
  try {
    const reports = await reportService.getAllReports();

    if (reports.errMessage) {
      throw new Error(reports.errMessage);
    }

    return res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
});

// 신고 페이지로 이동
reportRouter.get("/report/userReport", async (req, res, next) => {});

// 관리자 - 들어온 신고 조회
reportRouter.get("/admin/report", async (req, res, next) => {});

// 관리자 - 신고처리 (신고 상태변경)
reportRouter.patch("/admin/status", async (req, res, next) => {});

export { reportRouter };
