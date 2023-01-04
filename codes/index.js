function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-temp");
  let liveCity = document.querySelector("#city");
  liveCity.innerHTML = `${cityInput.value}`;
  currentCityTemperature();
}

function currentCityTemperature(position) {
  let cityInput = document.querySelector("#city-temp");
  console.log(cityInput.value);
  let cityLive = cityInput.value;
  console.log(cityLive);
  let apiKey = "9d18ac1c378d20dc84d1fe2241698d6f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityLive}&units=metric&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(showTemperature);
}

function showTemperature(event) {
  let liveTemp = Math.round(event.data.main.temp);
  tempChange = document.querySelector("#temperature");
  tempChange.innerHTML = liveTemp;
  let liveWindSpeed = Math.round(event.data.wind.speed);
  console.log(liveWindSpeed);
  windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = liveWindSpeed;
  let liveHumidity = event.data.main.humidity;
  humid = document.querySelector("#humidity");
  humid.innerHTML = liveHumidity;
  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = formatDate(event.data.dt * 1000);
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = event.data.weather[0].description;
  console.log(event.data.weather[0].description);
}

let findTemp = document.querySelector("#current-temp");
findTemp.addEventListener("submit", getCity);
