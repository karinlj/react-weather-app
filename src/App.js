import React, { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const api = {
    key: "729fb3bb61954ef74da54f6561ad72b5",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  const search = (evt) => {
    console.log("  evt.target.value:", evt.target.value);

    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          //console.log(result);
        });
    }
  };
  //just javascript
  const dateBuilder = (mydate) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[mydate.getDay()]; //no 0-6
    let month = months[mydate.getMonth()]; //no 0-11

    let date = mydate.getDate();
    let year = mydate.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  useEffect(() => {
    console.log("query:", query);
  }, [query]);

  useEffect(() => {
    console.log("weather:", weather);
  }, [weather]);

  return (
    <div
      className={weather.main && weather.main.temp > 14 ? "app warm" : "app"}
    >
      <main>
        <div className="search_box">
          <input
            type="text"
            className="search_bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {weather.main ? (
          <div>
            <section className="location_box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </section>
            <section className="weather_box">
              <div className="temp">{Math.round(weather.main.temp)}°c </div>
              <div className="weather">{weather.weather[0].main} </div>
            </section>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
