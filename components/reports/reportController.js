import { Router } from "express";
import { reportModel } from "../report/reportModel";

const reportRouter = Router();

// 신고 등록
reportRouter.post("/report/register", async (req, res, next) => {
  try {
    const { id, userId, attackerId, content } = req.body;

    const newReport = await reportModel.addReport({
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

// 관리자 - 들어온 신고 조회
reportRouter.get("/admin/report", async (req, res, next) => {
  try {
    const reports = await reportModel.getAllReports();

    if (reports.errMessage) {
      throw new Error(reports.errMessage);
    }
    return res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
});

// 관리자 - 신고처리 (신고 상태변경)
reportRouter.patch("/admin/status", async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const updatedReport = await reportModel.updateReport(id, status);
    if (updatedReport.errMessage) {
      throw new Error(updatedReport.errMessage);
    }
    return res.status(200).json(updatedReport);
    next(error);
  }
});

export { reportRouter };
