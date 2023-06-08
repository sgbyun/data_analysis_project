import { Router } from "express";
import { reportService } from "./reports/reportService.js";
import { Report, ReportImg } from "./reports/Report.js";
import { login_required } from "./middlewares/login_required.js";
import jwt from "jsonwebtoken";

const reportController = Router();
reportController.use(login_required);

// 신고 등록
reportController.post("/report/register", async (req, res, next) => {
  try {
    const { attackerId, content, violenceAt } = req.body;
    const reportImage = req.file;
    const { mimetype, originalname, path } = reportImage;

    const userId = req.currentUserId;
    const abuseCategory = "카테고리 정보 임시";

    const report = new Report(
      userId,
      attackerId,
      content,
      abuseCategory,
      violenceAt
    );

    const reportImg = new ReportImg(reportId, path, originalname, mimetype);

    const newReport = await reportService.addReport(report, reportImg);

    if (newReport.errMessage) {
      throw new Error(newReport.errMessage);
    }
    return res.status(201).json(newReport);
  } catch (error) {
    next(error);
  }
});

// 관리자 - 들어온 신고 조회
reportController.get("/admin/report", async (req, res, next) => {
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

// 관리자 - 신고처리 (신고 상태변경)
reportController.patch("/admin/status", async (req, res, next) => {
  try {
    const status = req.body;
    const updatedReport = await reportService.updateReport({ status });

    if (updatedReport.errMessage) {
      throw new Error(updatedReport.errMessage);
    }
    return res.status(200).json(updatedReport);
  } catch (error) {
    next(error);
  }
});

export { reportController };
