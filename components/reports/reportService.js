import { connection } from "../../index.js";
import reportModel from "./reportModel.js";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import axios from "axios";
import { logger } from "../utils/winston.js";

const client = new ImageAnnotatorClient({
  keyFilename: "./google_api_key.json",
});

class reportService {
  // 새로운 신고 생성
  static async addReport(report, reportImg) {
    try {
      await connection
        .promise()
        .query(reportModel.insertReport, [
          report.userId,
          report.attackerId,
          report.content,
          report.violenceAt,
        ]);
      logger.info("리포트 등록중 1. 테이블에 등록 성공");
      const reportId = await connection
        .promise()
        .query(reportModel.selectRecent, [report.userId]);

      await connection
        .promise()
        .query(reportModel.insertReportImg, [
          reportId[0][0].id,
          reportImg.path,
          reportImg.originalName,
          reportImg.mimetype,
        ]);
      logger.info("리포트 등록중 2. 사진 테이블에 등록 성공");
      const [result] = await client.textDetection(reportImg.path);
      const annotations = result.textAnnotations;
      const textArray = annotations.map(
        (annotation) => annotation.description
      )[0];
      const messages = textArray.split("\n").map((line) => {
        const match = line.match(/(.*?) (\[(.*?)\] )?(.*?) \((.*?)\): (.*)/);
        if (match) {
          const timestamp = match[1];
          const isGlobal = match[3] !== undefined;
          const senderName = match[4];
          const senderAlias = match[5];
          const message = match[6];
          if (senderName === report.attackerId)
            return {
              timestamp,
              isGlobal,
              senderName,
              senderAlias,
              message,
            };
        }
      });
      logger.info("리포트 등록중 3. 구글 api 연결 성공");
      for (let i = 0; i < messages.length; i++) {
        if (messages[i]) {
          axios
            .post(process.env.FLASK_ADDRESS, messages[i])
            .then((response) => {
              const responseData = response.data;
              connection
                .promise()
                .query(reportModel.insertCategory, [
                  reportId[0][0].id,
                  responseData,
                  messages[i].message,
                ]);
              logger.info("리포트 등록중 4.플라스크 서버 연결 성공");
            })
            .catch((error) => {
              logger.error("리포트 등록 중 4.플라스크 서버 연결 실패");
              const responseData = "clean"; // 서버 요청 실패 시 "clean"을 사용
              connection
                .promise()
                .query(reportModel.insertCategory, [
                  reportId[0][0].id,
                  responseData,
                  messages[i].message,
                ]);
            });
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 이메일 아이디로 신고목록 찾기 - 특정 유저의 누적된 report값 조회에 사용
  static async getReportByEmail({ userId }) {
    try {
      const query = reportModel.selectByEmail;
      const result = await connection.promise().query(query, [userId]);
      return result[1][0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 전체 신고목록 최신순 조회
  static async getAllReports() {
    const result = await connection.promise().query(reportModel.selectReports);
    return result[0];
  }

  // status별 전체 신고 목록
  static async getTotalReportCntBy(status) {
    try {
      if (status === "all") {
        const totalReportCnt = await connection
          .promise()
          .query(reportModel.selectTotalReportCnt);
        return totalReportCnt[0][0]["count(*)"];
      } else {
        const totalReportCnt = await connection
          .promise()
          .query(reportModel.selectTotalReportCntBy, [status]);
        return totalReportCnt[0][0]["count(*)"];
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getEmailReportCntBy(status, emailId) {
    try {
      if (status === "all") {
        const emailReportCnt = await connection
          .promise()
          .query(reportModel.selectEmailReportCnt, [emailId]);
        return emailReportCnt[0][0]["count(*)"];
      } else {
        const emailReportCnt = await connection
          .promise()
          .query(reportModel.selectEmailReportCntBy, [status, emailId]);
        return emailReportCnt[0][0]["count(*)"];
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getReportsBy(startIndex, rowPerPage, sort, status) {
    if (sort == "old") {
      if (status == "all") {
        const result = await connection
          .promise()
          .query(reportModel.selectReportsByAsc, [startIndex, rowPerPage]);
        return result[0];
      } else {
        const result = await connection
          .promise()
          .query(reportModel.selectReportsByOld, [
            status,
            startIndex,
            rowPerPage,
          ]);
        return result[0];
      }
    } else if (sort == "new") {
      if (status == "all") {
        const result = await connection
          .promise()
          .query(reportModel.selectReports, [startIndex, rowPerPage]);
        return result[0];
      } else {
        const result = await connection
          .promise()
          .query(reportModel.selectReportsByNew, [
            status,
            startIndex,
            rowPerPage,
          ]);
        return result[0];
      }
    }
  }

  static async getReportsByEmail(
    emailId,
    startIndex,
    rowPerPage,
    sort,
    status
  ) {
    if (sort == "old") {
      if (status == "all") {
        const result = await connection
          .promise()
          .query(reportModel.selectReportsByEmailAsc, [
            emailId,
            startIndex,
            rowPerPage,
          ]);
        return result[0];
      } else {
        const result = await connection
          .promise()
          .query(reportModel.selectReportsByEmailOld, [
            emailId,
            status,
            startIndex,
            rowPerPage,
          ]);
        return result[0];
      }
    } else if (sort == "new") {
      if (status == "all") {
        const result = await connection
          .promise()
          .query(reportModel.selectReportsByEmailDesc, [
            emailId,
            startIndex,
            rowPerPage,
          ]);
        return result[0];
      } else {
        const result = await connection
          .promise()
          .query(reportModel.selectReportsByEmailNew, [
            emailId,
            status,
            startIndex,
            rowPerPage,
          ]);
        return result[0];
      }
    }
  }

  // 신고 상태 업데이트 (관리자, 신고 status 변경) - report id 기반
  static async updateReport(report) {
    try {
      await connection
        .promise()
        .query(reportModel.updateReport, [report.status, report.reportId]);

      await connection
        .promise()
        .query(reportModel.updateReportCount, [report.reportId]);
      console.log(report);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 신고 아이디로 조회 (관리자)
  static async getReportById(report) {
    try {
      const result = await connection
        .promise()
        .query(reportModel.selectById, [report.reportId]);
      return result[0][0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getReportsByEmailId(emailId) {
    try {
      console.log(emailId);
      const result = await connection
        .promise()
        .query(reportModel.selectByEmail, [emailId]);
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCategoryByreportId(report) {
    try {
      const result = await connection
        .promise()
        .query(reportModel.selectCategoriesById, [report.reportId]);
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getPhotoByreportId(report) {
    try {
      const result = await connection
        .promise()
        .query(reportModel.selectPhotoById, [report.reportId]);
      return result[0][0].path;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 신고 삭제하기 (관리자) - report id 기반
  static async deleteReport({ reportId }) {
    try {
      const deletedReport = await connection
        .promise()
        .query(reportModel.deleteReport, [reportId]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateCategory(reportCategory) {
    try {
      console.log(reportCategory);
      await connection
        .promise()
        .query(reportModel.updateCategory, [
          reportCategory.categoryName,
          reportCategory.reportId,
          reportCategory.content,
        ]);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { reportService };
