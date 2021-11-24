import React, { useState, useEffect } from "react";
const axios = require("axios");

const useForecast = () => {
  const [forecast, setForecast] = useState({
    city: "",
    forecastData: {},
    loaded: false,
  });
  let city = "";
  const onSuccess = (location) => {
    axios
      .get(
        `https://eu1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_GEOCODING_ACCES_TOKEN}&lat=${location.coords.latitude}&lon=${location.coords.longitude}&normalizecity=1&format=json`
      )
      .then((response) => {
        city = response.data.address.city;
        return axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.lat}&lon=${response.data.lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
      })
      .then((response) => {
        setForecast({
          city: city,
          forecastData: response.data,
          loaded: true,
        });
      });
  };
  const onError = (error) => {
    setForecast({
      error,
      loaded: true,
    });
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  if (forecast.loaded === true) {
    return forecast;
  } else {
    return false;
  }
};

export default useForecast;
