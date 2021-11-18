let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let year = now.getFullYear();

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
let month = months[now.getMonth()];

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${day} ${date} ${month} ${year}`;

let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${hours}:${minutes}`;

function displayTemp(response) {
  let todayCity = document.querySelector(".city");
  let cTemp = document.querySelector("#cTemp");
  let currentCTemp = Math.round(response.data.main.temp);
  todayCity.innerHTML = `${response.data.name}`;
  cTemp.innerHTML = `${currentCTemp}`;
}

function searchCity(city) {
  let unit = "metric";
  let apiKey = "31d9e4a87fd2740761d20aeaee4d9ab6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "31d9e4a87fd2740761d20aeaee4d9ab6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

let button = document.querySelector("#current-city");
button.addEventListener("click", findCurrentLocation);

searchCity("Bangkok");
