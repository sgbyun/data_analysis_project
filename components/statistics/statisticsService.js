import { connection } from "../../index.js";
import statisticsModel from "./statisticsModel.js";

class statisticsService {
  static async getGenderRatio() {
    try {
      // 총 유저의 수
      const totalUserCnt = (
        await connection.promise().query(statisticsModel.selectTotalUserCnt)
      )[0][0].totalUser;

      // 남자 유저 수
      const maleCnt = (
        await connection.promise().query(statisticsModel.selectMaleCnt)
      )[0][0].male;

      const genderRatio = (parseInt(maleCnt) / parseInt(totalUserCnt)) * 100;

      return genderRatio;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { statisticsService };
