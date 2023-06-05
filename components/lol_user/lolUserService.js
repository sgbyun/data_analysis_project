import {connection} from "../../index.js";
import axios from 'axios';

class lolUserService {
    static async addLolUser({lolId}){
        try {
                const summoner_info_request_url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${lolId}?api_key=${process.env.RIOT_API_KEY}`;
                const summoner_data = await axios.get(summoner_info_request_url);
                const summoner_league_request_url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_data.data.id}?api_key=${process.env.RIOT_API_KEY}`;
                const league_data = await axios.get(summoner_league_request_url);
                console.log(league_data.data);
                const query = `INSERT INTO lol_user VALUES ('${lolId}',0,'bronze','${summoner_data.data.id}','${summoner_data.data.summonerLevel}','${league_data.data[0].rank}','${league_data.data[0].tier}','${league_data.data[0].wins}','${league_data.data[0].losses}',now(),now())`;
                const result = await connection.promise().query(query);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export {lolUserService};