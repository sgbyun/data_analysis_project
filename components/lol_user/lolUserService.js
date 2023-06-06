import { connection } from "../../index.js";
import lolUserModel from "./lolUserModel.js";
import { getSummonerInfo, getLeagueData } from "../utils/connectRiotApi.js";

class lolUserService {
  static async checkLolUser(Loluser) {
    try {
      const summonerData = await getSummonerInfo(Loluser.lolId);
      const leagueData = await getLeagueData(summonerData.id);
      return {
        summonerLevel: summonerData.summonerLevel,
        tier: leagueData?.tier || "unranked",
        rank: leagueData?.rank || null,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addLolUser(Loluser) {
    try {
      const summonerData = await getSummonerInfo(Loluser.lolId);
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
          Loluser.lolId,
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

  static async getLolUser(Loluser) {
    try {
      const query = lolUserModel.selectLolUser;
      const result = await connection.promise().query(query, [Loluser.lolId]);
      return result[0][0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async setLolUser(Loluser) {
    try {
      const summonerData = await getSummonerInfo(Loluser.lolId);
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
          Loluser.lolId,
        ]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //보류, 신고 승인시 reportCount mannerGrade 갱신
  static async reportLolUser(lolUser) {
    try {
      const query = lolUserModel.reportLolUser;
      await connection
        .promise()
        .query(query, [
          lolUser.reportCount,
          lolUser.mannerGrade,
          lolUser.lolId,
        ]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async removeLolUser(Loluser) {
    try {
      const query = lolUserModel.deleteLolUser;
      await connection.promise().query(query, [Loluser.lolId]);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { lolUserService };
