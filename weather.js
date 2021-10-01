var apiKey = '7418456aab32e8f75f302c70d4e35fc7';

var now = new Date();

var dateText = document.createElement('h3');
var tempCont = document.createElement('div');
var tempText = document.createElement('h1');
var iconDiv = document.createElement('img');
var weatherCard = document.getElementById('weather-card');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
} else {
    alert('Your browser does not support geolocation');
}

function showPosition (position) {
    callWeatherApi(position);
}

function callWeatherApi(pos) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        var timezone = data.timezone;
        var humidity = data.current.humidity;
        var temp = data.current.temp;

        var icon = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;

        // dateText.innerHTML = now.toDateString();
        dateText.classList.add('date-text');
        tempText.classList.add('date-text');
        tempCont.classList.add('temp-cont');

        tempText.innerHTML = Math.round(temp) + "degC";
        iconDiv.src = icon;

    });
}

function currentApi (cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        console.log('City:',data);

        // var timezone = data.timezone;
        // var humidity = data.current.humidity;
        var temp = data.main.temp-273;

        var icon = data.weather[0].icon;
        var dateTime = moment().utc(data.dt).format('MMMM Do YYYY, h:mm:ss a');

        console.log(dateTime);

        dateText.innerHTML = now.toDateString();
        dateText.classList.add('date-text');
        tempText.classList.add('date-text');
        tempCont.classList.add('temp-cont');

        tempText.innerHTML = Math.round(temp) + "degC";
        iconDiv.src = `http://openweathermap.org/img/w/${icon}.png`;

    })
}



tempCont.append(tempText);
tempCont.append(iconDiv);
weatherCard.append(dateText);
weatherCard.append(tempCont);



