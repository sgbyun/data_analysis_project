import { connection } from "../../index.js";
import reportModel from "./reportModel.js";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import axios from "axios";

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

      const [result] = await client.textDetection(reportImg.path);
      const annotations = result.textAnnotations;
      const textArray = annotations.map(
        (annotation) => annotation.description
      )[0];
      const messages = textArray.split("\n").map((line) => {
        const match = line.match(
          /\[(.*?)\] (\[(.*?)\] )?(.*?) \((.*?)\): (.*)/
        );
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
      for (let i = 0; i < messages.length; i++) {
        if (messages[i]) {
          axios
            .post(process.env.FLASK_ADDRESS, messages[i])
            .then((response) => {
              connection
                .promise()
                .query(reportModel.insertCategory, [
                  reportId[0][0].id,
                  response.data,
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

  // 전체 신고목록 오래된 조회
  static async getAllReportsByAsc() {
    const result = await connection
      .promise()
      .query(reportModel.selectReportsByAsc);
    return result[0];
  }

  // 신고 전체 수
  static async getTotalReportCnt() {
    try {
      const totalReportCnt = await connection
        .promise()
        .query(reportModel.selectTotalReportCnt);
      return totalReportCnt[0][0]["count(*)"];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 전체 신고목록 old, pending
  static async getReportsByOldandPending(startIndex, rowPerPage) {
    const result = await connection
      .promise()
      .query(reportModel.selectReportsByOldandPending, [
        startIndex,
        rowPerPage,
      ]);
    return result[0];
  }

  // 전체 신고목록 new, pending
  static async getReportsByNewandPending(startIndex, rowPerPage) {
    const result = await connection
      .promise()
      .query(reportModel.selectReportsByNewandPending, [
        startIndex,
        rowPerPage,
      ]);
    return result[0];
  }

  // pending인 신고 수
  static async getTotalReportCntByPending() {
    try {
      const totalReportCnt = await connection
        .promise()
        .query(reportModel.selectTotalReportPendingCnt);
      return totalReportCnt[0][0]["count(*)"];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 전체 신고목록 old, completed
  static async getReportsByOldandCompleted(startIndex, rowPerPage) {
    const result = await connection
      .promise()
      .query(reportModel.selectReportsByOldandCompleted, [
        startIndex,
        rowPerPage,
      ]);
    return result[0];
  }

  // 전체 신고목록 new, completed
  static async getReportsByNewandCompleted(startIndex, rowPerPage) {
    const result = await connection
      .promise()
      .query(reportModel.selectReportsByNewandCompleted, [
        startIndex,
        rowPerPage,
      ]);
    return result[0];
  }

  // completed된 신고 수
  static async getTotalReportCntByCompleted() {
    try {
      const totalReportCnt = await connection
        .promise()
        .query(reportModel.selectTotalReportCompletedCnt);
      return totalReportCnt[0][0]["count(*)"];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 전체 신고목록 old, rejected
  static async getReportsByOldandRejected(startIndex, rowPerPage) {
    const result = await connection
      .promise()
      .query(reportModel.selectReportsByOldandRejected, [
        startIndex,
        rowPerPage,
      ]);
    return result[0];
  }

  // 전체 신고목록 new, rejected
  static async getReportsByNewandRejected(startIndex, rowPerPage) {
    const result = await connection
      .promise()
      .query(reportModel.selectReportsByOldandRejected, [
        startIndex,
        rowPerPage,
      ]);
    return result[0];
  }

  // rejected 인 신고 수
  static async getTotalReportCntByRejected() {
    try {
      const totalReportCnt = await connection
        .promise()
        .query(reportModel.selectTotalReportRejectedCnt);
      return totalReportCnt[0][0]["count(*)"];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 신고 상태 업데이트 (관리자, 신고 status 변경) - report id 기반
  static async updateReport(report) {
    await connection
      .promise()
      .query(reportModel.updateReport, [
        report.status,
        report.updatedAt,
        report.reportId,
      ]);
    console.log(report);
  }

  // 신고 아이디로 조회 (관리자)
  static async getReportById({ reportId }) {
    try {
      const result = await connection
        .promise()
        .query(reportModel.selectById, [reportId]);
      return result[0][0];
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
}

export { reportService };
