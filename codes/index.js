let now = new Date();

let days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let formattedDate = `${currentDay} | ${currentHour}:${currentMinutes}`;

let currentDayTime = document.querySelector("#current-day");
let nowTime = new Date();
currentDayTime.innerHTML = formattedDate;

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
}

function liveLocation() {
  console.log("Hello");
}
let findTemp = document.querySelector("#current-temp");
findTemp.addEventListener("submit", getCity);
