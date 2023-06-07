import { connection } from "../../index.js";

connection.connect();

class reportSerivce {
  // 새로운 신고 생성
  static async addReport({
    // 신고 사진 report_photo
    id,
    userId,
    status,
    attackerId,
    abuseCategory,
    content,
    violenceAt,
    createdAt,
    updatedAt,
  }) {
    const abuseCategory = ""; //

    const values = [
      id,
      userId,
      status,
      attackerId,
      abuseCategory,
      content,
      violenceAt,
      createdAt,
      updatedAt,
    ];

    // 유저와 신고 내역을 연결
    const newReport = async () => {
      try {
        const addedReport = await connection
          .promise()
          .query(reportModel.insertReport(values));
        const linkedReport = await connection
          .promise()
          .query(reportModel.userReport);
        return linkedReport;
      } catch (error) {
        throw error;
      }
    };
    return newReport;
  }

  // 이메일 아이디로 신고목록 찾기 - 특정 유저의 누적된 report값 조회에 사용
  static async getReportByEmail() {
    const query = reportModel.selectByEmail;
    const values = [userId];
    const result = await connection.promise().query(query, values);
    return result;
  }

  // 전체 신고목록 조회
  static async getAllReports() {
    const query = reportModel.selectReports;
    const result = await connection.promise().query(query);
    return result;
  }

  // 신고 아이디로 조회? (관리자)
  static async getReportById() {
    const query = reportModel.selectById;
    const values = [id];
    const result = await connection.promise().query(query, values);
    return result;
  }

  // 신고 삭제하기? (관리자) - report id 기반
  static async deleteReport() {
    const query = reportModel.deleteReport;
    const values = [id];
    const deletedReport = await connection.promise().query(query, values);
    return deletedReport;
  }

  // 신고 상태 업데이트 (관리자, 신고 status 변경) - report id 기반
  static async updateReport() {
    const query = reportModel.updateReport;
    const values = [status, id];
    const updatedReport = await connection.promise().query(query, values);
    return updatedReport;
  }
}

export { reportSerivce };
