import axios from "axios";

const api_key = "13f3397a2dcc4697a5d231547240508";

const getWeather = async (address) => {
  const { data } = await axios.get(
    `https://api.weatherapi.com/v1//current.json?key=${api_key}&q=${address}`
  );
  // .catch((err) => {
  //   if (err) {
  //     // console.error("errorMe", err);
  //     return { errorMessage: "unable to find location ya tooota" };
  //   }
  // });

  return {
    locationName: data.location.name,
    locationCountry: data.location.country,
    temperature: data.current.temp_c,
    rainChance: data.current.precip_mm,
    humidity: data.current.humidity,
  };
};

export default getWeather;
