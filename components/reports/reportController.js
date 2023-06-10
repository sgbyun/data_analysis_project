import { Router } from "express";
import { Report, ReportCategory, ReportImg } from "./Report.js";
import { reportService } from "./reportService.js";
import multer from "multer";
import { login_required } from "../middlewares/login_required.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const reportController = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync("./components/reports/reported_img")) {
        fs.mkdirSync("./components/reports/reported_img");
      }
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
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json("error");
  }
});
// 관리자 - 들어온 report case에 대한 욕설 목록 반환
reportController.get(
  "/admin/report/:reportId",
  login_required,
  async (req, res) => {
    try {
      const reportId = req.params.reportId;
      const report = new Report(reportId);
      const responseReport = await reportService.getCategoryByreportId(report);
      res.status(200).json(responseReport);
    } catch (error) {
      res.status(500).json("error");
    }
  }
);
// 관리자 - 들어온 report case에 대한 사진 반환
reportController.get(
  "/admin/reportphoto/:reportId",
  login_required,
  async (req, res) => {
    try {
      const reportId = req.params.reportId;
      const report = new Report(reportId);
      const photoPath = await reportService.getPhotoByreportId(report);
      console.log(__dirname);
      console.log(__filename);
      const absolutePath = join(__dirname, "../..", photoPath);
      res.sendFile(absolutePath);
    } catch (error) {
      res.status(500).json("error");
    }
  }
);

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
// 관리자 - 욕설 문장 카테고리 변경 적용
reportController.patch(
  "/admin/report/detail",
  login_required,
  async (req, res) => {
    try {
      const { reportId, categoryName, content } = req.body;
      const reportCategory = new ReportCategory(
        reportId,
        categoryName,
        content
      );
      await reportService.updateCategory(reportCategory);
      res.status(200).json("신고 카테고리 재설정 완료");
    } catch (error) {
      res.status(500).json("error");
    }
  }
);

export { reportController };
