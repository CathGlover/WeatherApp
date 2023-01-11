function formatDate() {
  let date = new Date();
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
  let apiKey = "edf069311acf2bebo10f4bbbc53249t3";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityLive}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature).then(displayForecast);
  let apiKeyTwo = "edf069311acf2bebo10f4bbbc53249t3";
  let apiURLTwo = `https://api.shecodes.io/weather/v1/forecast?query=${cityLive}&key=${apiKeyTwo}&units=metric`;
  axios.get(apiURLTwo).then(displayForecast);
}

function launchPage() {
  let cityInput = document.querySelector("#city-temp");
  let cityLive = "London";
  let apiKey = "edf069311acf2bebo10f4bbbc53249t3";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityLive}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
  let apiKeyTwo = "edf069311acf2bebo10f4bbbc53249t3";
  let apiURLTwo = `https://api.shecodes.io/weather/v1/forecast?query=${cityLive}&key=${apiKeyTwo}&units=metric`;
  axios.get(apiURLTwo).then(displayForecast);
}
function showTemperature(event) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = event.data.city;
  let liveTemp = Math.round(event.data.daily[0].temperature.day);
  tempChange = document.querySelector("#temperature");
  tempChange.innerHTML = `${liveTemp}°C`;
  let liveWindSpeed = Math.round(event.data.daily[0].wind.speed);
  windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = liveWindSpeed;
  let liveHumidity = event.data.daily[0].temperature.humidity;
  humid = document.querySelector("#humidity");
  humid.innerHTML = liveHumidity;
  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = formatDate();
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = event.data.daily[0].condition.description;
  let weatherImage = document.querySelector("#weather-image");
  weatherImage.setAttribute("src", `${event.data.daily[0].condition.icon_url}`);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(event) {
  let forecastElementOne = document.querySelector("#day-1");
  let dateOne = document.querySelector("#temp-1");
  dateOne.innerHTML = `${Math.round(event.data.daily[1].temperature.day)}°C`;
  let tempOne = document.querySelector("#day-1");
  tempOne.innerHTML = formatDay(event.data.daily[1].time);
  let iconOne = document.querySelector("#icon-1");
  iconOne.setAttribute("src", `${event.data.daily[1].condition.icon_url}`);

  let forecastElementTwo = document.querySelector("#day-2");
  let dateTwo = document.querySelector("#temp-2");
  dateTwo.innerHTML = `${Math.round(event.data.daily[2].temperature.day)}°C`;
  let tempTwo = document.querySelector("#day-2");
  tempTwo.innerHTML = formatDay(event.data.daily[2].time);
  let iconTwo = document.querySelector("#icon-2");
  iconTwo.setAttribute("src", `${event.data.daily[2].condition.icon_url}`);

  let forecastElementThree = document.querySelector("#day-3");
  let dateThree = document.querySelector("#temp-3");
  dateThree.innerHTML = `${Math.round(event.data.daily[3].temperature.day)}°C`;
  let tempThree = document.querySelector("#day-3");
  tempThree.innerHTML = formatDay(event.data.daily[3].time);
  let iconThree = document.querySelector("#icon-3");
  iconThree.setAttribute("src", `${event.data.daily[3].condition.icon_url}`);

  let forecastElementFour = document.querySelector("#day-4");
  let dateFour = document.querySelector("#temp-4");
  dateFour.innerHTML = `${Math.round(event.data.daily[4].temperature.day)}°C`;
  let tempFour = document.querySelector("#day-4");
  tempFour.innerHTML = formatDay(event.data.daily[4].time);
  let iconFour = document.querySelector("#icon-4");
  iconFour.setAttribute("src", `${event.data.daily[4].condition.icon_url}`);
}

launchPage();

let findTemp = document.querySelector("#current-temp");
findTemp.addEventListener("submit", getCity);
