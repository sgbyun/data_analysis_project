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
                const query = lolUserModel.insertLolUser;
                await connection.promise().query(query,[lolId,summonerData.data.id,summonerData.data.summonerLevel,leagueData.data[0].rank,leagueData.data[0].tier,leagueData.data[0].wins,leagueData.data[0].wins]);
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
                const summoner_info_request_url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${lolId}?api_key=${process.env.RIOT_API_KEY}`;
                const summoner_data = await axios.get(summoner_info_request_url);
                const LeagueInfoRequestUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_data.data.id}?api_key=${process.env.RIOT_API_KEY}`;
                const leagueData = await axios.get(LeagueInfoRequestUrl);
                const query = lolUserModel.updateLolUser;
                const result = await connection.promise().query(query,[summoner_data.data.summonerLevel,leagueData.data[0].rank,leagueData.data[0].tier,leagueData.data[0].wins,leagueData.data[0].losses,lolId]);
        } catch (error) {
            throw new Error(error.message);
        }
    }

/*     //보류, 신고 승인시 reportCount mannerGrade 갱신
    static async reportLolUser({lolId,reportCount,mannerGrade}){
        try {
                const query = `UPDATE lol_user SET level='${summoner_data.data.summonerLevel}',\`rank\`='${leagueData.data[0].rank}',tier='${leagueData.data[0].tier}',wins='${leagueData.data[0].wins}',losses='${leagueData.data[0].losses}',updated_at=now() WHERE lol_id='${lolId}'`;
                const result = await connection.promise().query(query);
        } catch (error) {
            throw new Error(error.message);
        }
    } */

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