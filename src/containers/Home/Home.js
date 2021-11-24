import React, { useEffect } from "react";
import TodayMainBox from "../../components/TodayMainBox/TodayMainBox";

import styles from "./Home.module.scss";
import we from "../../assets/svg/weather/clear-day.svg";
import we2 from "../../assets/svg/weather/partly-cloudy-night-sleet.svg";

// console.log(process.env.API_KEY);

export default function Home({ data }) {
  console.log(data);

  return (
    <div className="container">
      <TodayMainBox />
      <div className={styles.day_options}>
        <span className={`${styles.option} ${styles.active}`}>Today</span>
        <span className={styles.option}>Tomorrow</span>
        <span className={styles.option}>Next 7 Days</span>
      </div>
      <div className={styles.hourly_holder}>
        <div className={styles.hourly}>
          <div className={styles.image_holder}>
            <img src={we2} alt="weather" className={styles.image} />
          </div>
          <div className={styles.time}>1 AM</div>
          <div className={styles.temp}>
            <div className={styles.number}>30</div>
            <div className={styles.badge}>&deg; C</div>
          </div>
        </div>
        <div className={styles.hourly}>
          <div className={styles.image_holder}>
            <img src={we} alt="weather" className={styles.image} />
          </div>
          <div className={styles.time}>1 AM</div>
          <div className={styles.temp}>
            <div className={styles.number}>30</div>
            <div className={styles.badge}>&deg; C</div>
          </div>
        </div>
        <div className={styles.hourly}>
          <div className={styles.image_holder}>
            <img src={we} alt="weather" className={styles.image} />
          </div>
          <div className={styles.time}>1 AM</div>
          <div className={styles.temp}>
            <div className={styles.number}>30</div>
            <div className={styles.badge}>&deg; C</div>
          </div>
        </div>
        <div className={styles.hourly}>
          <div className={styles.image_holder}>
            <img src={we2} alt="weather" className={styles.image} />
          </div>
          <div className={styles.time}>1 AM</div>
          <div className={styles.temp}>
            <div className={styles.number}>30</div>
            <div className={styles.badge}>&deg; C</div>
          </div>
        </div>
        <div className={styles.hourly}>
          <div className={styles.image_holder}>
            <img src={we2} alt="weather" className={styles.image} />
          </div>
          <div className={styles.time}>1 AM</div>
          <div className={styles.temp}>
            <div className={styles.number}>30</div>
            <div className={styles.badge}>&deg; C</div>
          </div>
        </div>
        <div className={styles.hourly}>
          <div className={styles.image_holder}>
            <img src={we2} alt="weather" className={styles.image} />
          </div>
          <div className={styles.time}>1 AM</div>
          <div className={styles.temp}>
            <div className={styles.number}>30</div>
            <div className={styles.badge}>&deg; C</div>
          </div>
        </div>
      </div>
    </div>
  );
}
