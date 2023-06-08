import { connection } from "../../index.js";
import lolUserModel from "./lolUserModel.js";
import { getSummonerInfo, getLeagueData } from "../utils/connectRiotApi.js";

class lolUserService {
  static async addLolUser({ lolId }) {
    try {
      const summonerData = await getSummonerInfo(lolId);
      console.log("addUser ", summonerData);
      const leagueData = await getLeagueData(summonerData.id);
      let rank = null;
      let tier = "unranked";
      let wins = null;
      let losses = null;
      if (leagueData !== undefined) {
        rank = leagueData.rank;
        tier = leagueData.tier;
        wins = leagueData.wins;
        losses = leagueData.losses;
      }
      const query = lolUserModel.insertLolUser;
      await connection
        .promise()
        .query(query, [
          lolId,
          summonerData.summonerLevel,
          rank,
          tier,
          wins,
          losses,
        ]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getLolUser({ lolId }) {
    try {
      const query = lolUserModel.selectLolUser;
      const result = await connection.promise().query(query, [lolId]);
      return result[0][0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async setLolUser({ lolId }) {
    try {
      const summonerData = await getSummonerInfo.getSummonerInfo(lolId);
      const leagueData = await getLeagueData(summonerData.id);
      let rank = null;
      let tier = null;
      let wins = null;
      let losses = null;
      if (leagueData !== undefined) {
        rank = leagueData.rank;
        tier = leagueData.tier;
        wins = leagueData.wins;
        losses = leagueData.losses;
      }
      const query = lolUserModel.updateLolUser;
      await connection
        .promise()
        .query(query, [
          summonerData.summonerLevel,
          rank,
          tier,
          wins,
          losses,
          lolId,
        ]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //보류, 신고 승인시 reportCount mannerGrade 갱신
  static async reportLolUser({ lolId, reportCount, mannerGrade }) {
    try {
      const query = lolUserModel.reportLolUser;
      await connection
        .promise()
        .query(query, [reportCount, mannerGrade, lolId]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async removeLolUser({ lolId }) {
    try {
      const query = lolUserModel.deleteLolUser;
      await connection.promise().query(query, [lolId]);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { lolUserService };
