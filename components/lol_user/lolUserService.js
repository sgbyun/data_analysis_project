import {connection} from "../../index.js";
import lolUserModel from "./lolUserModel.js";
import axios from 'axios';


class lolUserService {
    static async addLolUser({lolId}){
        try {
                const summonerInfoRequestUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${lolId}?api_key=${process.env.RIOT_API_KEY}`;
                const summonerData = await axios.get(summonerInfoRequestUrl);
                const LeagueInfoRequestUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.data.id}?api_key=${process.env.RIOT_API_KEY}`;
                const leagueData = await axios.get(LeagueInfoRequestUrl);
                let rank = null;
                let tier = null;
                let wins = null;
                let losses = null;
                if (leagueData.data[0] !== undefined) {
                    rank = leagueData.data[0].rank;
                    tier = leagueData.data[0].tier;
                    wins = leagueData.data[0].wins;
                    losses = leagueData.data[0].losses;
                }
                const query = lolUserModel.insertLolUser;
                await connection.promise().query(query,[lolId,summonerData.data.id,summonerData.data.summonerLevel,rank,tier,wins,losses]);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getLolUser({lolId}){
        try{
            const query = lolUserModel.selectLolUser;
            const result = await connection.promise().query(query,[lolId]);
            return result[0][0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async setLolUser({lolId}){
        try {
                const summonerInfoRequestUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${lolId}?api_key=${process.env.RIOT_API_KEY}`;
                const summonerData = await axios.get(summonerInfoRequestUrl);
                const LeagueInfoRequestUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.data.id}?api_key=${process.env.RIOT_API_KEY}`;
                const leagueData = await axios.get(LeagueInfoRequestUrl);
                let rank = null;
                let tier = null;
                let wins = null;
                let losses = null;
                if (leagueData.data[0] !== undefined) {
                    rank = leagueData.data[0].rank;
                    tier = leagueData.data[0].tier;
                    wins = leagueData.data[0].wins;
                    losses = leagueData.data[0].losses;
                }
                const query = lolUserModel.updateLolUser;
                await connection.promise().query(query,[summonerData.data.summonerLevel,rank,tier,wins,losses,lolId]);
            } catch (error) {
            throw new Error(error.message);
        }
    }

    //보류, 신고 승인시 reportCount mannerGrade 갱신
    static async reportLolUser({lolId,reportCount,mannerGrade}){
        try {
                const query = lolUserModel.reportLolUser;
                await connection.promise().query(query,[reportCount,mannerGrade,lolId]);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async removeLolUser({lolId}){
    try {
        const query = lolUserModel.deleteLolUser;
        await connection.promise().query(query,[lolId]);
    } catch (error) {
        throw new Error(error.message);
    }
    }
}

export {lolUserService};