import axios from 'axios';
import { API_BASE_URL, NEXON_TMI_KEY } from 'constants/env';

const fetchData = async (url: string, params?: object) => {
  try {
    const response = await axios({
      method: 'get',
      url: API_BASE_URL + url,
      data: params,
      headers: {
        Authorization: NEXON_TMI_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export default fetchData;
