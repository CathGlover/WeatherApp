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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  let apiKeyTwo = "edf069311acf2bebo10f4bbbc53249t3";
  let apiURLTwo = `https://api.shecodes.io/weather/v1/forecast?query=${cityLive}&key=${apiKeyTwo}&units=metric`;
  axios.get(apiURLTwo).then(displayForecast);
}

function launchPage() {
  let cityInput = document.querySelector("#city-temp");
  let cityLive = "London";
  let apiKey = "9d18ac1c378d20dc84d1fe2241698d6f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityLive}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);
  let apiKeyTwo = "edf069311acf2bebo10f4bbbc53249t3";
  let apiURLTwo = `https://api.shecodes.io/weather/v1/forecast?query=${cityLive}&key=${apiKeyTwo}&units=metric`;
  axios.get(apiURLTwo).then(displayForecast);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(event) {
  console.log(event);
  let forecastElementOne = document.querySelector("#day-1");
  forecastElementOne.innerHTML = "Forecast 1";
  let dateOne = document.querySelector("#temp-1");
  dateOne.innerHTML = `${Math.round(event.data.daily[1].temperature.day)}°C`;
  let tempOne = document.querySelector("#day-1");
  tempOne.innerHTML = formatDay(event.data.daily[1].time);
  let iconOne = document.querySelector("#icon-1");
  iconOne.setAttribute("src", `${event.data.daily[1].condition.icon_url}`);

  let forecastElementTwo = document.querySelector("#day-2");
  forecastElementTwo.innerHTML = "Forecast 2";
  let dateTwo = document.querySelector("#temp-2");
  dateTwo.innerHTML = `${Math.round(event.data.daily[2].temperature.day)}°C`;
  let tempTwo = document.querySelector("#day-2");
  tempTwo.innerHTML = formatDay(event.data.daily[2].time);
  let iconTwo = document.querySelector("#icon-2");
  iconTwo.setAttribute("src", `${event.data.daily[2].condition.icon_url}`);

  let forecastElementThree = document.querySelector("#day-3");
  forecastElementThree.innerHTML = "Forecast 3";
  let dateThree = document.querySelector("#temp-3");
  dateThree.innerHTML = `${Math.round(event.data.daily[3].temperature.day)}°C`;
  let tempThree = document.querySelector("#day-3");
  tempThree.innerHTML = formatDay(event.data.daily[3].time);
  let iconThree = document.querySelector("#icon-3");
  iconThree.setAttribute("src", `${event.data.daily[3].condition.icon_url}`);

  let forecastElementFour = document.querySelector("#day-4");
  forecastElementFour.innerHTML = "Forecast 4";
  let dateFour = document.querySelector("#temp-4");
  dateFour.innerHTML = `${Math.round(event.data.daily[4].temperature.day)}°C`;
  let tempFour = document.querySelector("#day-4");
  tempFour.innerHTML = formatDay(event.data.daily[4].time);
  let iconFour = document.querySelector("#icon-4");
  iconFour.setAttribute("src", `${event.data.daily[4].condition.icon_url}`);
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

launchPage();

let celsiusTemperature = null;

let findTemp = document.querySelector("#current-temp");
findTemp.addEventListener("submit", getCity);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", getFarenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", getCelsius);
