let autocomplete;
function initAutocomplate() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("placeSearchField"),
    {
      types: ["(cities)"],
      fields: ["name", "geometry.location"],
    }
  );
  autocomplete.addListener("place_changed", onPlaceChanged);
}
const onPlaceChanged = async () => {
  let place = autocomplete.getPlace();

  let city = place.name;
  let lat = place.geometry.location.lat();
  let lon = place.geometry.location.lng();
  console.log(place);
  if (!place.geometry) {
    document.getElementById("placeSearchField").placeholder = "Enter a place";
  } else {
    const weatherData = await getWeather(lat, lon);
    const aqData = await getAirQuality(lat, lon);
    printData(weatherData);
    printAQdata(aqData);
    printPlaceName(city);
    localStorage.setItem("tzOffset", weatherData.weather.timezone_offset);
    document.getElementById("placeSearchField").value = "";
    closeFilter();
  }
};

const searchButton = document.querySelector("#searchButton");
const searchField = document.querySelector("#placeSearchField");
const closeFilter = () => {
  document.body.style.overflow = "auto";
  filter.style.width = "0";
  searchField.style.top = "-100%";
};
searchButton.addEventListener("click", function () {
  searchField.style.top = "0";
  filter.style.width = "100%";
  document.body.style.overflow = "hidden";
});
filter.addEventListener("click", closeFilter);
