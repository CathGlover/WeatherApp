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
  currentCityTemperature();
}

function currentCityTemperature(position) {
  let cityInput = document.querySelector("#city-temp");
  let cityLive = cityInput.value;
  let apiKey = "9d18ac1c378d20dc84d1fe2241698d6f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityLive}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);
}

function showTemperature(event) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = event.data.name;
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
  let weatherImage = document.querySelector("#weather-image");
  weatherImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${event.data.weather[0].icon}@2x.png`
  );
  weatherImage.setAttribute("alt", event.data.weather[0].description);
  celsiusTemperature = event.data.main.temp;
}

function getFarenheit(position) {
  position.preventDefault();
  let farenheitElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  farenheitElement.innerHTML = Math.round(farenheitTemp);
}

function getCelsius(position) {
  position.preventDefault();
  let celsiusElement = document.querySelector("#temperature");
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let findTemp = document.querySelector("#current-temp");
findTemp.addEventListener("submit", getCity);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", getFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", getCelsius);
