import { connection } from "../../index.js";
import { Report, ReportImg } from "./reports/Report.js";
import { reportModel } from "./reports/reportModel.js";

connection.connect();

class reportSerivce {
  // 새로운 신고 생성
  static async addReport(report, reportImg) {
    const reportValue = [
      report.userId,
      report.attackerId,
      report.content,
      report.abuseCategory,
      report.violenceAt,
    ];

    const addedReport = await connection
      .promise()
      .query(reportModel.insertReport(reportValue));

    reportId4img = addedReport[0][0].id;

    const reportImgValue = [
      reportId4img,
      reportImg.path,
      reportImg.originalName,
      reportImg.mimetype,
    ];
    await connection
      .promise()
      .query(reportModel.insertReportImg(reportImgValue));
  }

  // 이메일 아이디로 신고목록 찾기 - 특정 유저의 누적된 report값 조회에 사용
  static async getReportByEmail({ userId }) {
    try {
      const query = reportModel.selectByEmail;
      const result = await connection.promise().query(query, [userId]);
      return result[1][0];
    } catch (err) {
      throw new Error(error.message);
    }
  }

  // 전체 신고목록 조회
  static async getAllReports() {
    const result = await connection.promise().query(reportModel.selectReports);
    return result[0];
  }

  // 신고 상태 업데이트 (관리자, 신고 status 변경) - report id 기반
  static async updateReport({ report }) {
    try {
      const values = [report.status];
      const updatedReport = await connection
        .promise()
        .query(reportModel.updateReport, values);
    } catch (err) {
      throw new Error(error.message);
    }
  }

  // 신고 아이디로 조회 (관리자)
  static async getReportById({ reportId }) {
    try {
      const result = await connection
        .promise()
        .query(reportModel.selectById, [reportId]);
      return result[0][0];
    } catch (err) {
      throw new Error(error.message);
    }
  }

  // 신고 삭제하기 (관리자) - report id 기반
  static async deleteReport({ reportId }) {
    try {
      const deletedReport = await connection
        .promise()
        .query(reportModel.deleteReport, [reportId]);
    } catch (err) {
      throw new Error(error.message);
    }
  }
}

export { reportSerivce };
