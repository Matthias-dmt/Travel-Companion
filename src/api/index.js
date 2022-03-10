import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    console.log(sw, ne);
    const {
      data: { data },
    } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": "2001dadb6dmsh017a26f3a71408dp1bf2a4jsn9b5ff9641929",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
