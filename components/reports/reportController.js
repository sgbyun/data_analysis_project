import { Router } from "express";
import { Report, ReportImg } from "./Report.js";
import { reportService } from "./reportService.js";
import { login_required } from "../middlewares/login_required.js";
import jwt from "jsonwebtoken";

const reportController = Router();
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./components/reports/reported_img");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

// 신고 등록
reportController.post(
  "/report/register",
  upload.single("reportImage"),
  login_required,
  async (req, res, next) => {
    try {
      const { attackerId, content, violenceAt } = req.body;
      const reportImage = req.file;
      const { mimetype, originalname, path } = reportImage;
      const userId = req.currentEmailId;
      const abuseCategory = "카테고리 정보 임시";

      const report = new Report(
        null,
        userId,
        attackerId,
        null,
        abuseCategory,
        content,
        violenceAt
      );

      const reportImg = new ReportImg(null, null, path, originalname, mimetype);

      const newReport = await reportService.addReport(report, reportImg);

      res.status(201).json("success");
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

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
