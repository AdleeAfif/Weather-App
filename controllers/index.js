const axios = require("axios");
const { API_KEY } = require("../config/secret");

const weatherIcons = require("../icons/index");

const renderSearchPage = (req, res) => {
  res.render("search");
};

const renderForecastPage = async (req, res) => {
  try {
    const searchedLocation = req.query.searchedLocation;

    if (!searchedLocation) {
      return res.render("error", {
        error: "No location entered!",
        message: "Please enter a location.",
      });
    }

    const getLocationLatLng = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${searchedLocation}&key=${API_KEY}`
    );

    if (getLocationLatLng.data.total_results < 1) {
      return res.render("error", {
        error: "Invalid Location",
        message: "Location entered is not found!",
      });
    }

    const formattedName = getLocationLatLng.data.results[0].formatted;
    const { lat, lng } = getLocationLatLng.data.results[0].geometry;

    const getWeatherInfo = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,windspeed_10m,winddirection_10m,weathercode&current_weather=true&forecast_days=1`
    );

    const { temperature, windspeed, winddirection } =
      getWeatherInfo.data.current_weather;

    const { time, temperature_2m, weathercode } = getWeatherInfo.data.hourly;

    const formattedTime = time.map((t) => {
      const date = new Date(t);
      return date.toLocaleTimeString().toUpperCase();
    });

    res.render("forecast", {
      formattedName,
      lat,
      lng,
      temperature,
      windspeed,
      winddirection,
      formattedTime,
      temperature_2m,
      weathercode,
      weatherIcons,
    });
  } catch (err) {
    res.render("error", {
      error: err,
      message: "",
    });
  }
};

module.exports = { renderSearchPage, renderForecastPage };
