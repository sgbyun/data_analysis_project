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

// 신고목록 조회
reportController.get("/admin/report", async (req, res) => {
  // try {
  const { sort, status, currentPage } = req.query;
  const rowPerpage = 10;
  const currentPageNumber = parseInt(currentPage, 10);

  console.log(req.query);

  if (sort == "old") {
    if (status == "pending") {
      // old AND pending
      const totalReportsCntByPeding =
        await reportService.getTotalReportCntByPending();
      let startIndex = (currentPage - 1) * rowPerpage;
      if (startIndex < 0) {
        startIndex = 0;
      }

      const reports = await reportService.getReportsByOldandPending(
        startIndex,
        rowPerpage
      );

      return res.status(200).json({
        totalReportsCntByPeding,
        currentPageNumber,
        totalPages: Math.ceil(totalReportsCntByPeding / rowPerpage),
        data: reports,
      });
    } else if (status == "completed") {
      // old AND pending
      const totalReportsCntByCompleted =
        await reportService.getTotalReportCntByCompleted();
      let startIndex = (currentPageNumber - 1) * rowPerpage;
      if (startIndex < 1) {
        startIndex = 0;
      }

      const reports = await reportService.getReportsByOldandCompleted(
        startIndex,
        rowPerpage
      );
      return res.status(200).json({
        totalReportsCntByCompleted,
        currentPageNumber,
        totalPages: Math.ceil(totalReportsCntByCompleted / rowPerpage),
        data: reports,
      });
    } else if (status == "rejected") {
      // old AND rejected
      const totalReportsCntByRejected =
        await reportService.getTotalReportCntByRejected();
      let startIndex = (currentPageNumber - 1) * rowPerpage;
      if (startIndex < 1) {
        startIndex = 0;
      }

      const reports = await reportService.getReportsByOldandRejected(
        startIndex,
        rowPerpage
      );
      return res.status(200).json({
        totalReportsCntByRejected,
        currentPageNumber,
        totalPages: Math.ceil(totalReportsCntByRejected / rowPerpage),
        data: reports,
      });
    } else if (status == "all") {
      // old AND all
      const totalReportsCnt = await reportService.getTotalReportCnt();
      let startIndex = (currentPageNumber - 1) * rowPerpage;
      if (startIndex < 1) {
        startIndex = 0;
      }

      const reports = await reportService.getAllReportsByAsc(
        startIndex,
        rowPerpage
      );
      return res.status(200).json({
        totalReportsCnt,
        currentPageNumber,
        totalPages: Math.ceil(totalReportsCnt / rowPerpage),
        data: reports,
      });
    }
  } else {
    // new
    if (status == "pending") {
      // new AND pending
      const totalReportsCntByPeding =
        await reportService.getTotalReportCntByPending();
      let startIndex = (currentPageNumber - 1) * rowPerpage;
      if (startIndex < 1) {
        startIndex = 0;
      }

      const reports = await reportService.getReportsByNewandPending(
        startIndex,
        rowPerpage
      );
      return res.status(200).json({
        totalReportsCntByPeding,
        currentPageNumber,
        totalPages: Math.ceil(totalReportsCntByPeding / rowPerpage),
        data: reports,
      });
    } else if (status == "completed") {
      // new AND pending
      const totalReportsCntByCompleted =
        await reportService.getTotalReportCntByCompleted();
      let startIndex = (currentPageNumber - 1) * rowPerpage;
      if (startIndex < 1) {
        startIndex = 0;
      }

      const reports = await reportService.getReportsByNewandCompleted(
        startIndex,
        rowPerpage
      );
      return res.status(200).json({
        totalReportsCntByCompleted,
        currentPageNumber,
        totalPages: Math.ceil(totalReportsCntByCompleted / rowPerpage),
        data: reports,
      });
    } else if (status == "rejected") {
      // old AND rejected
      const totalReportsCntByRejected =
        await reportService.getTotalReportCntByRejected();
      let startIndex = (currentPageNumber - 1) * rowPerpage;
      if (startIndex < 1) {
        startIndex = 0;
      }

      const reports = await reportService.getReportsByNewandRejected(
        startIndex,
        rowPerpage
      );
      return res.status(200).json({
        totalReportsCntByRejected,
        currentPageNumber,
        totalPages: Math.ceil(totalReportsCntByRejected / rowPerpage),
        data: reports,
      });
    } else if (status == "all") {
      // new AND all
      const totalReportsCnt = await reportService.getTotalReportCnt();
      let startIndex = (currentPageNumber - 1) * rowPerpage;
      if (startIndex < 1) {
        startIndex = 0;
      }

      const reports = await reportService.getAllReports(startIndex, rowPerpage);
      return res.status(200).json({
        totalReportsCnt,
        currentPageNumber,
        totalPages: Math.ceil(totalReportsCnt / rowPerpage),
        data: reports,
      });
    }
  }
  // } catch (error) {
  //   res.status(500).json("error");
  // }
});

export { reportController };
