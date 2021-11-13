import React, { useState, useEffect } from "react";
const axios = require("axios");

const useLocation = () => {
  const [location, setLocation] = useState({
    city: "",
    coordinates: {
      lat: "",
      lon: "",
    },
    loaded: false,
  });

  const onSuccess = (location) => {
    axios
      .get(
        `https://eu1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_GEOCODING_ACCES_TOKEN}&lat=${location.coords.latitude}&lon=${location.coords.longitude}&normalizecity=1&format=json`
      )
      .then(function (response) {
        let city = response.data.address.city;
        setLocation({
          city: city,
          coordinates: {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          },
          loaded: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };
  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
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

  return location;
};

export default useLocation;
