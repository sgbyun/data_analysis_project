import { Report } from "./Report.js";
import { connection } from "../../index.js";

connection.connect();

class reportModel {
  // 새로운 신고 생성
  static async addReport({
    // 신고 사진
    id,
    userId,
    status,
    attackerId,
    abuseCategory,
    content,
    violence,
    createdAt,
    updatedAt,
  }) {
    try {
      const query = `INSERT INTO report (id, userId, status, attackerId, abuseCategory, content, violence, createdAt) VALUES (?, ?, ?, ?, ?, ?, NOW())`;
      const values = [
        id,
        userId,
        status,
        attackerId,
        abuseCategory,
        content,
        violence,
        createdAt,
      ];
      await connection.promise().query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 이메일 아이디로 신고목록 찾기
  static async getReportByEmail() {
    try {
      const query = `SELECT * FROM report WHERE email =?`;
      const values = [userId];
      const result = await connection.promise().query(query, values);
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 전체 신고목록 조회
  static async getAllReports() {
    try {
      const query = `SELECT * FROM report`;
      const result = await connection.promise().query(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 신고 아이디로 조회? (관리자)
  static async getReportById() {
    try {
      const query = `SELECT * FROM report WHERE id =?`;
      const values = [id];
      const result = await connection.promise().query(query, values);
      return result[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 신고 삭제하기? (관리자) - report id 기반
  static async deleteReport() {
    try {
      const query = `DELETE FROM report WHERE id =?`;
      const values = [id];
      await connection.promise().query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 신고 상태 업데이트 (관리자, 신고 status 변경) - report id 기반
  static async updateReport() {
    try {
      const query = `UPDATE report SET status =? WHERE id =?`;
      const values = [status, id];
      await connection.promise().query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { reportModel };
