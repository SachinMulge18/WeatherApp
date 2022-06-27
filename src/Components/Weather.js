import React, { useEffect, useState } from "react";
import styles from "./Weather.module.css";

const Weather = () => {
  const [city, setCity] = useState();
  const [searchCity, setSearchCity] = useState("pune");
  const [des, setDes] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=e6b8873e6ec4094e81254226e7c0a582`;
      const response = await fetch(url);

      const responseData = await response.json();

      setCity(responseData.main, responseData.weather[0].weather);
      setDes(responseData.weather[0].description);
      setCountry(responseData.sys.country);
      console.log(responseData);
    };

    fetchApi();
  }, [searchCity]);

  const inputChangeHandler = (event) => {
    setSearchCity(event.target.value.toUpperCase());
    setCity("");
    searchCity('')
  };

  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = ["Sun", "Mon", "Tue", "wed", "Thur", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
  };

  return (
    <section className={styles.form}>
      <main>
        <input
          className={styles.inputField}
          type="text"
          value={searchCity}
          placeholder="Search"
          onChange={inputChangeHandler}
          maxLength={10}
        />
        {!city ? (
          <div className={styles.error}>
            <p>No data Found</p>
          </div>
        ) : (
          <div className={styles.location}>
            {searchCity.toUpperCase()}
            <div className={styles.country}>"{country}"</div>
            <div className={styles.date}>{dateBuilder(new Date())}</div>
            <div className={styles.temparature}>
              {city.temp}
              <p className={styles.degcel}>°C</p>
              <div className={styles.description}>
                <h5>{des}</h5>
              </div>
            </div>
            <div className={styles.temMinMax}>
              Min: {city.temp_min} | Mix: {city.temp_max}
            </div>
          </div>
        )}
      </main>
    </section>
  );
};

export default Weather;
