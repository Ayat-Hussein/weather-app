const api_key = '13f3397a2dcc4697a5d231547240508';

const weatherFunc = async (address) => {
  try {
    const weatherRes = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${encodeURIComponent(
        address
      )}`
    );

    const weatherResults = await weatherRes.json();
    if (weatherResults.location) {
      return `The location is:${weatherResults?.location.name}, ${weatherResults?.location.country}.\n
    The weather is ${weatherResults?.current.temp_c}`;
    }
    if (weatherResults.error) {
      return weatherResults.error.message;
    }
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const weatherForm = document.querySelector('.weForm');
const weatherInput = document.querySelector('.weInput');
const weatherResult = document.querySelector('.weResult');
weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  weatherResult.innerHTML = 'Loading...';
  const weSearch = weatherInput.value;
  const weResult = await weatherFunc(weSearch);
  console.log(weResult, 'weResultiii');
  weatherResult.innerHTML = weResult;
});
