const weatherApiKey = "cdaaac209fe99e6c8720ab2943bc6d48";
// fetch data
async function onSuccess(pos) {
  const crd = pos.coords;
  const weatherData = await getWeather(crd.latitude, crd.longitude);
  const aqData = await getAirQuality(crd.latitude, crd.longitude);
  localStorage.setItem("tzOffset", weatherData.weather.timezone_offset);
  printData(weatherData);
  printAQdata(aqData);
}
function onError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
const getWeather = async (lat, lon) => {
  let allData = {
    weather: {},
    city: "",
  };
  try {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${weatherApiKey}`
      )
      .then(({ data }) => {
        allData = {
          ...allData,
          weather: data,
        };

        return axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${weatherApiKey}`
        );
      })
      .then((res) => {
        allData = {
          ...allData,
          city: res.data[0].name,
        };
      });
    return allData;
  } catch (error) {
    console.error("ERROR!", error);
  }
};
const getAirQuality = async (lat, lon) => {
  let aqData = {};
  try {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
      )
      .then(({ data }) => {
        aqData = data;
      });
  } catch (err) {
    console.log("Error!", err);
  }
  return aqData;
};
// fetch data end

// print data
const printData = (data) => {
  printPlaceName(data.city);
  printCurrentWeather(data.weather);
  printHourlyWeather(data.weather);
  printAdditionallyWeatherInfo(data.weather);
  printDailyForecast(data.weather.daily);
  if (data.weather.alerts) {
    printAlerts(data.weather.alerts);
  } else {
    const alertsWraper = document.querySelector("#alerts_wraper");
    const hazardLevel = document.querySelector("#hazardLevel");
    alertsWraper.style.color = "#fff";
    alertsWraper.innerText = "There are no alerts at this time!";
    hazardLevel.classList.add("hide");
  }
  const loader = document.querySelector("#loader");
  loader.style.display = "none";
};
const printPlaceName = (name) => {
  const placeName = document.querySelector("#placeName");
  const dwPlaceName = document.querySelector("#dwPlaceName");
  const alPlaceName = document.querySelector("#alPlaceName");
  const aqPlaceName = document.querySelector("#aqPlaceName");
  placeName.innerText = name;
  dwPlaceName.innerText = name;
  alPlaceName.innerText = name;
  aqPlaceName.innerText = name;
};
const printCurrentWeather = (data) => {
  const tempEl = document.querySelector("#currentTemp");
  const windEl = document.querySelector("#cwWind");
  const humEl = document.querySelector("#cwHum");
  const descEl = document.querySelector("#cwDescription");
  const iconEl = document.querySelector("#cwIcon");
  const wraperEl = document.querySelector("#appWraper");

  const weatherID = data.current.weather[0].id;
  const currentTime = data.current.dt * 1000;
  const sunrise = data.current.sunrise * 1000;
  const sunset = data.current.sunset * 1000;
  const tzOffset = data.timezone_offset;

  const curTime = getTime(currentTime, tzOffset);
  const srTime = getTime(sunrise, tzOffset);
  const ssTime = getTime(sunset, tzOffset);

  const curTimeParsed = parseInt(`${curTime.hour}${curTime.minute}`);
  const srTimeParsed = parseInt(`${srTime.hour}${srTime.minute}`);
  const ssTimeParsed = parseInt(`${ssTime.hour}${ssTime.minute}`);

  const fullIconPath = getIcon(
    weatherID,
    curTimeParsed,
    srTimeParsed,
    ssTimeParsed
  );
  const fullBackgroundPath = getBackground(
    weatherID,
    curTimeParsed,
    srTimeParsed,
    ssTimeParsed
  );

  tempEl.innerHTML = `${Math.round(data.current.temp)}<span>&deg;</span>`;
  windEl.innerText = data.current.wind_speed.toFixed(1);
  humEl.innerText = data.current.humidity;
  descEl.innerHTML = data.current.weather[0].description;
  iconEl.setAttribute("src", fullIconPath);
  wraperEl.setAttribute(
    "style",
    `background-image: url('${fullBackgroundPath}');`
  );
};
const printHourlyWeather = (data) => {
  const hourlyArr = data.hourly.slice(1, 24);
  const wraper = document.querySelector("#hwWraper");
  wraper.innerHTML = "";
  for (let item of hourlyArr) {
    const html = document.createElement("div");
    html.classList.add("hw_box");

    const fullIconPath = getIcon(
      item.weather[0].id,
      item.dt,
      data.current.sunrise,
      data.current.sunset
    );

    let time = item.dt * 1000;
    let temp = Math.round(item.temp);

    const { hour } = getTime(time, data.timezone_offset);
    html.innerHTML = `
              <span class="hw_time">${hour}:00</span>
              <span class="hw_icon_holder" title="${item.weather[0].description}"><img src=${fullIconPath} alt="icon" class="hw_icon" ></span>
              <span class="hw_temp">${temp} <span>&deg;</span></span>
            `;

    wraper.appendChild(html);
  }
};
const printAdditionallyWeatherInfo = (data) => {
  const feel = document.querySelector("#awFeel");
  const humidity = document.querySelector("#awHum");
  const visibility = document.querySelector("#awVisibility");
  const pressure = document.querySelector("#awPressure");
  const wind = document.querySelector("#awWind");
  const uvIndex = document.querySelector("#awUV");
  const sunrise = document.querySelector("#awSunrise");
  const sunset = document.querySelector("#awSunset");

  let tzOffset = data.timezone_offset;
  const sunriseDate = data.current.sunrise * 1000;
  const sunsetDate = data.current.sunset * 1000;

  const srObj = getTime(sunriseDate, tzOffset);
  const ssObj = getTime(sunsetDate, tzOffset);

  sunrise.innerHTML = `${srObj.hour}:${srObj.minute}`;
  sunset.innerHTML = `${ssObj.hour}:${ssObj.minute}`;
  feel.innerHTML = `${Math.round(data.current.feels_like)}<span>&deg;C</span>`;
  humidity.innerHTML = `${data.current.humidity}%`;
  visibility.innerHTML = `${data.current.visibility.toLocaleString("sr-SR")}m`;
  pressure.innerHTML = `${data.current.pressure}mbar`;
  wind.innerHTML = `${data.current.wind_speed.toFixed(1)}m/s`;
  uvIndex.innerHTML = `${data.current.uvi}`;
};
const printDailyForecast = (data) => {
  const weekdayOptions = {
    weekday: "long",
  };
  const dateOptions = {
    month: "numeric",
    day: "numeric",
  };
  const wraper = document.querySelector("#daily_wraper");
  wraper.innerHTML = "";
  for (let item of data) {
    const html = document.createElement("div");
    html.classList.add("dw_day");

    let day = new Date(item.dt * 1000).toLocaleDateString(
      "en-US",
      weekdayOptions
    );
    let sDate = new Date(item.dt * 1000).toLocaleDateString(
      "it-IT",
      dateOptions
    );

    let maxTemp = Math.round(item.temp.max);
    let minTemp = Math.round(item.temp.min);
    let icon = getIconName(item.weather[0].id);
    let fullIconPath = `./assets/icons/day/${icon}.png`;
    html.innerHTML = `
    <span class="day_name">${day} 
    <span class="date">${sDate}</span>
    </span>
    <span class="day_temp">
      <span class="max">${maxTemp}<sup>&deg;</sup></span>
      <span class="min">${minTemp}<sup>&deg;</sup></span>
    </span>
    <span class="day_icon_holder">
      <img src="${fullIconPath}" alt="icon" class="day_icon">
    </span>
  `;
    wraper.appendChild(html);
  }
};
const printAlerts = (data) => {
  const dateOptions = {
    month: "long",
    day: "numeric",
  };
  const wraper = document.querySelector("#alerts_wraper");
  wraper.innerHTML = "";
  data.sort((a, b) => a.start - b.start);

  for (let item of data) {
    const html = document.createElement("div");
    const date = new Date(item.start * 1000).toLocaleDateString(
      "en-US",
      dateOptions
    );
    const description = item.description;
    const hazardLevel = document.querySelector("#hazardLevel");
    if (item.sender_name == "RHMS Serbia") {
      // added only for Serbia to show the danger level colors. Not a good practice in general
      const [title, alertClass] = item.event.split("-");
      html.classList.add("box", alertClass.trim());
      html.innerHTML = `
      <span class="al_date">${date}</span>
      <span class="al_title">${title.trim()}</span>
      <span class="al_desc">${description}</span>
    `;
    } else {
      hazardLevel.classList.add("hide");
      const title = item.event;
      html.classList.add("box", "yellow");
      html.innerHTML = `
      <span class="al_date">${date}</span>
      <span class="al_title">${title.trim()}</span>
      <span class="al_desc">${description}</span>
    `;
    }

    wraper.appendChild(html);
  }
};
const printAQdata = (data) => {
  const wraper = document.querySelector("#aq_wraper");
  wraper.innerHTML = "";
  const components = data.list[0].components;
  const aqi = data.list[0].main.aqi;

  const timeEl = document.querySelector("#aqTime");
  const aqiHtml = document.createElement("div");
  const colorClass = convertAQvalue(aqi).toLowerCase().replace(/\s/g, "");
  aqiHtml.classList.add("index_holder", colorClass);
  aqiHtml.innerHTML = `
  <span class="desc">${convertAQvalue(aqi)}</span>
  `;
  wraper.appendChild(aqiHtml);

  const componentsHtml = document.createElement("div");
  componentsHtml.classList.add("components_holder");
  for (let item in components) {
    let itemHtml = document.createElement("span");
    const colorClass2 = checkComponentsLevel(item, components[item])
      .toLowerCase()
      .replace(/\s/g, "");
    itemHtml.classList.add("item", colorClass2);
    itemHtml.innerHTML = `
      <span class="static">${item.toUpperCase()}</span>
      <span class="dinamic">${components[item].toFixed(
        1
      )} <small> μg/m3</small> 
      </span>
      <span class="level">${checkComponentsLevel(item, components[item])}</span>
    `;
    componentsHtml.appendChild(itemHtml);
  }
  wraper.appendChild(componentsHtml);

  const time = new Date(data.list[0].dt * 1000);
  let h = time.getHours();
  let m = time.getMinutes();
  m = checkTime(m);
  timeEl.innerHTML = `${h}:${m}`;
};
// print data end

// animate daily forecast, alerts and air quality sections
const dwButton = document.querySelector("#dwButton");
const dwClose = document.querySelector("#dwClose");
const dwSection = document.querySelector("#dwHolder");
dwButton.addEventListener("click", function () {
  dwSection.style.left = 0;
  document.body.style.overflow = "hidden";
});
dwClose.addEventListener("click", function () {
  dwSection.style.left = "100%";
  document.body.style.overflow = "auto";
});

const alButton = document.querySelector("#alButton");
const alClose = document.querySelector("#alClose");
const alSection = document.querySelector("#alHolder");
alButton.addEventListener("click", function () {
  alSection.style.left = 0;
  document.body.style.overflow = "hidden";
});
alClose.addEventListener("click", function () {
  alSection.style.left = "100%";
  document.body.style.overflow = "auto";
});

const aqButton = document.querySelector("#aqButton");
const aqClose = document.querySelector("#aqClose");
const aqSection = document.querySelector("#aqHolder");
aqButton.addEventListener("click", function () {
  aqSection.style.left = 0;
  document.body.style.overflow = "hidden";
});
aqClose.addEventListener("click", function () {
  aqSection.style.left = "100%";
  document.body.style.overflow = "auto";
});
// animate daily forecast, alerts and air quality sections end

const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};
const scrolToButton = document.querySelector("#scrollToButton");
scrolToButton.addEventListener("click", scrollToBottom);
navigator.geolocation.getCurrentPosition(onSuccess, onError);
