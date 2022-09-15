function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
const getIconName = (id) => {
  let icon = "";
  switch (id) {
    case 200:
    case 201:
    case 202:
    case 230:
    case 231:
    case 232:
      icon = "thunderstorm-rain";
      break;
    case 210:
    case 211:
    case 212:
    case 221:
      icon = "thunderstorm";
      break;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
    case 500:
    case 501:
    case 520:
      icon = "drizzle";
      break;
    case 502:
    case 503:
    case 504:
    case 511:
    case 521:
    case 522:
    case 531:
      icon = "rain";
      break;
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      icon = "snow";
      break;
    case 701:
    case 711:
    case 721:
    case 741:
      icon = "fog";
      break;
    case 731:
    case 751:
    case 761:
    case 762:
      icon = "sand";
      break;
    case 771:
      icon = "squall";
      break;
    case 781:
      icon = "tornado";
      break;
    case 800:
      icon = "clear";
      break;
    case 801:
    case 802:
      icon = "few-clouds";
      break;
    case 803:
    case 804:
      icon = "clouds";
      break;
    default:
      icon = "";
      break;
  }
  return icon;
};
const getBackgroundName = (id) => {
  let background = "";
  switch (id) {
    case 200:
    case 201:
    case 202:
    case 230:
    case 231:
    case 232:
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 511:
    case 520:
    case 521:
    case 522:
    case 531:
      background = "rain";
      break;

    case 210:
    case 211:
    case 212:
    case 221:
      background = "thunderstorm";
      break;

    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      background = "snow";
      break;
    case 701:
    case 711:
    case 721:
    case 741:
    case 731:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      background = "fog";
      break;
    case 800:
      background = "clear";
      break;
    case 801:
    case 802:
      background = "few-clouds";
      break;
    case 803:
    case 804:
      background = "clouds";
      break;
    default:
      background = "";
      break;
  }
  return background;
};
// const parseTimes = (t) => {
//   let th = new Date(t * 1000).getHours();
//   let tm = new Date(t * 1000).getMinutes();
//   tm = checkTime(tm);
//   let total = parseInt(`${th}${tm}`);
//   return total;
// };
const getIcon = (id, currentTime, sunrise, sunset) => {
  let iconsPath = "";

  if (currentTime > sunrise && currentTime < sunset) {
    iconsPath = "./assets/icons/day";
  } else {
    iconsPath = "./assets/icons/night";
  }
  const icon = getIconName(id);

  return `${iconsPath}/${icon}.png`;
};
const getBackground = (id, currentTime, sunrise, sunset) => {
  let bckgPath = "";

  if (currentTime > sunrise && currentTime < sunset) {
    bckgPath = "./assets/backgrounds/day";
  } else {
    bckgPath = "./assets/backgrounds/night";
  }
  const icon = getBackgroundName(id);

  return `${bckgPath}/${icon}.jpg`;
};
const convertAQvalue = (val) => {
  let value = "";
  switch (val) {
    case 1:
      value = "Good";
      break;
    case 2:
      value = "Fair";
      break;
    case 3:
      value = "Moderate";
      break;
    case 4:
      value = "Poor";
      break;
    case 5:
      value = "Very Poor";
      break;
    default:
      break;
  }
  return value;
};
const checkComponentsLevel = (pollutant, val) => {
  let message = "";
  let levels = [];
  switch (pollutant) {
    case "no2":
      levels = [50, 100, 200, 400];
      break;
    case "pm10":
      levels = [25, 50, 90, 180];
      break;
    case "o3":
      levels = [60, 120, 180, 240];
      break;
    case "pm2_5":
      levels = [15, 30, 55, 110];
      break;
    case "co":
      levels = [5041, 10769, 14206, 34827];
      break;
    default:
      levels = [];
      break;
  }
  switch (true) {
    case val <= levels[0]:
      message = "Good";
      break;
    case val <= levels[1]:
      message = "Fair";
      break;
    case val <= levels[2]:
      message = "Moderate";
      break;
    case val <= levels[3]:
      message = "Poor";
      break;
    case val > levels[3]:
      message = "Very poor";
      break;
    default:
      message = "-";
      break;
  }
  return message;
};
const getTime = (data, offset) => {
  const timeOffset = offset / 3600;
  const date = new Date(data);

  // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;

  let locationDate = new Date(utcTime + 3600000 * timeOffset);
  let hour = locationDate.getHours();
  let minute = locationDate.getMinutes();
  let second = locationDate.getSeconds();

  hour = checkTime(hour);
  minute = checkTime(minute);
  second = checkTime(second);
  return { locationDate, hour, minute, second };
};
