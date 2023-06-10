import { Router } from "express";
import { Report, ReportImg } from "./Report.js";
import { reportService } from "./reportService.js";
import multer from "multer";
import { login_required } from "../middlewares/login_required.js";

const reportController = Router();

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
  login_required,
  upload.single("reportImage"),
  async (req, res) => {
    try {
      const { attackerId, content, violenceAt } = req.body;

      const userId = req.currentEmailId;

      const report = new Report(
        null,
        userId,
        attackerId,
        null,
        content,
        violenceAt
      );

      const reportImage = req.file;
      const { mimetype, originalname, path } = reportImage;
      const reportImg = new ReportImg(null, null, path, originalname, mimetype);

      await reportService.addReport(report, reportImg);

      res.status(201).json("신고 완료");
    } catch (error) {
      res.status(500).json("error");
    }
  }
);

// 관리자 - 들어온 신고 조회
reportController.get("/admin/report", login_required, async (req, res) => {
  try {
    const reports = await reportService.getAllReports();
    return res.status(200).json(reports);
  } catch (error) {
    res.status(500).json("error");
  }
});

// 관리자 - 신고처리 (신고 상태변경)
reportController.patch("/admin/status", login_required, async (req, res) => {
  const { reportId, status, updatedAt } = req.body;
  const report = new Report(
    reportId,
    null,
    null,
    status,
    null,
    null,
    null,
    updatedAt
  );

  await reportService.updateReport(report);

  return res.status(200).json("상태 업데이트 완료");
});

export { reportController };
