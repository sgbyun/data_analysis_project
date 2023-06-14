import axios from "axios";
import { logger } from "./winston.js";

const getSummonerInfo = async (lolId) => {
  try {
    const summonerInfoRequestUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${lolId}?api_key=${process.env.RIOT_API_KEY}`;
    const response = await axios.get(summonerInfoRequestUrl);
    logger.info("라이엇 API 접근 성공");
    return response.data;
  } catch (error) {
    logger.error("라이엇 API 접근 실패 or 존재하지 않는 닉네임");
    throw new Error(error.message);
  }
};

const getLeagueData = async (id) => {
  try {
    const LeagueInfoRequestUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`;
    const response = await axios.get(LeagueInfoRequestUrl);

    return response.data[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getSummonerInfo, getLeagueData };
