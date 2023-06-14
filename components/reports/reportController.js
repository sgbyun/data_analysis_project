import { Router } from "express";
import { Report, ReportCategory, ReportImg } from "./Report.js";
import { reportService } from "./reportService.js";
import multer from "multer";
import fs from "fs";
import { loginRequired } from "../middlewares/loginRequired.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { adminValidation } from "../middlewares/adminValidation.js";
import { logger } from "../utils/winston.js";

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
  loginRequired,
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
      console.log(violenceAt);
      const reportImage = req.file;
      const { mimetype, originalname, path } = reportImage;
      const reportImg = new ReportImg(null, null, path, originalname, mimetype);

      await reportService.addReport(report, reportImg);
      logger.info("리포트 등록 성공");
      res.status(201).json("신고 완료");
    } catch (error) {
      logger.error("리포트 등록 실패");
      res.status(500).json("error");
    }
  }
);

reportController.get("/report/my", loginRequired, async (req, res) => {
  try {
    const emailId = req.currentEmailId;
    const { sort, status, currentPage } = req.query;
    const rowPerpage = 10;
    const currentPageNumber = parseInt(currentPage, 10);
    const emailReportsCnt = await reportService.getEmailReportCntBy(
      status,
      emailId
    );
    let startIndex = (currentPage - 1) * rowPerpage;
    if (startIndex < 0) {
      startIndex = 0;
    }
    const reports = await reportService.getReportsByEmail(
      emailId,
      startIndex,
      rowPerpage,
      sort,
      status
    );

    logger.info("유저 신고 목록 불러오기 성공", reports);
    res.status(200).json({
      emailReportsCnt,
      currentPageNumber,
      totalPages: Math.ceil(emailReportsCnt / rowPerpage),
      data: reports,
    });
  } catch (error) {
    logger.error("유저 신고 목록 불러오기 실패");
    res.status(500).json("error");
  }
});

// 관리자 - 들어온 report case에 대한 욕설 목록 반환
reportController.get(
  "/admin/report/:reportId",
  loginRequired,
  adminValidation,
  async (req, res) => {
    try {
      const reportId = req.params.reportId;
      const report = new Report(reportId);
      const responseReport = await reportService.getCategoryByreportId(report);
      logger.info("report case에 대한 욕설 목록 반환 성공", responseReport);
      res.status(200).json(responseReport);
    } catch (error) {
      logger.error("report case에 대한 욕설 목록 반환 실패");
      res.status(500).json("error");
    }
  }
);
// 관리자 - 욕설 문장 카테고리 변경 적용
reportController.patch(
  "/admin/report/detail",
  loginRequired,
  adminValidation,
  async (req, res) => {
    try {
      const { reportId, categoryName, content } = req.body;
      const reportCategory = new ReportCategory(
        reportId,
        categoryName,
        content
      );
      await reportService.updateCategory(reportCategory);
      logger.info("욕설 카테고리 변경 성공");
      res.status(200).json("신고 카테고리 재설정 완료");
    } catch (error) {
      logger.error("욕설 카테고리 변경 실패");
      res.status(500).json("error");
    }
  }
);
// 관리자 - 들어온 report case에 대한 사진 반환
reportController.get(
  "/admin/reportphoto/:reportId",
  loginRequired,
  adminValidation,
  async (req, res) => {
    try {
      const reportId = req.params.reportId;
      const report = new Report(reportId);
      const photoPath = await reportService.getPhotoByreportId(report);
      const absolutePath = join(__dirname, "../..", photoPath);
      logger.info("report case에 대한 사진 반환 성공");
      res.sendFile(absolutePath);
    } catch (error) {
      logger.error("report case 에 대한 사진 반환 실패");
      res.status(500).json("error");
    }
  }
);

// 관리자 - 신고처리 (신고 상태변경), lol_user 테이블 report_count 갱신
reportController.patch(
  "/admin/status",
  loginRequired,
  adminValidation,
  async (req, res) => {
    try {
      const { reportId, status } = req.body;
      const report = new Report(reportId, null, null, status);

      await reportService.updateReport(report);
      logger.info("신고 상태 변경 성공");
      res.status(200).json("상태 업데이트 완료");
    } catch (error) {
      logger.error("신고 상태 변경 실패");
      res.status(500).json("error");
    }
  }
);

// 신고목록 조회
reportController.get(
  "/admin/report",
  loginRequired,
  adminValidation,
  async (req, res) => {
    try {
      const { sort, status, currentPage } = req.query;
      const rowPerpage = 10;
      const currentPageNumber = parseInt(currentPage, 10);

      const totalReportsCnt = await reportService.getTotalReportCntBy(status);
      let startIndex = (currentPage - 1) * rowPerpage;
      if (startIndex < 0) {
        startIndex = 0;
      }
      const reports = await reportService.getReportsBy(
        startIndex,
        rowPerpage,
        sort,
        status
      );

      logger.info("신고 목록 조회 성공");
      return res.status(200).json({
        totalReportsCnt,
        currentPageNumber,
        totalPages: Math.ceil(totalReportsCnt / rowPerpage),
        data: reports,
      });
    } catch (error) {
      logger.error("신고 목록 조회 실패");
      res.status(500).json("error");
    }
  }
);

export { reportController };
