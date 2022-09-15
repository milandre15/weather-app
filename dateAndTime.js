const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const currentDateAndTime = () => {
  let tzOffset = localStorage.getItem("tzOffset");
  const date = new Date();

  const { locationDate, hour, minute } = getTime(date, tzOffset);

  const dateStr = locationDate.toLocaleDateString("en-US", dateOptions);
  document.querySelector("#curDate").innerText = dateStr;
  document.querySelector("#curTime").innerHTML = hour + ":" + minute;

  setTimeout(currentDateAndTime, 1000);
};
currentDateAndTime();
