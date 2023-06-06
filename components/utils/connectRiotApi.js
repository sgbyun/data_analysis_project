import axios from "axios";

const getSummonerInfo = async (lolId) => {
  try {
    const summonerInfoRequestUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${lolId}?api_key=${process.env.RIOT_API_KEY}`;
    const response = await axios.get(summonerInfoRequestUrl);

    return response.data;
  } catch (error) {
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
