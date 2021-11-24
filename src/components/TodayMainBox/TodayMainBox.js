import React from "react";
import styles from "./TodayMainBox.module.scss";
import we from "../../assets/svg/weather/clear-day.svg";

const TodayMainBox = () => {
  const dateObj = new Date();
  const getDayNum = dateObj.getDay();
  const getMonthNum = dateObj.getMonth();
  const date = dateObj.getDate();
  let day;
  switch (getDayNum) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }

  let month;
  switch (getMonthNum) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }
  return (
    <div className={styles.today_main}>
      <div className={styles.header}>
        <span className={styles.day}>Today</span>
        <span className={styles.date}>
          {day}, {date} {month}
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.temp}>
          <div className={styles.number}>30</div>
          <div className={styles.badge}>&deg; C</div>
        </div>
        <img src={we} alt="weather" className={styles.weather_icon} />
      </div>
    </div>
  );
};

export default TodayMainBox;
