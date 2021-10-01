var apiKey = '7418456aab32e8f75f302c70d4e35fc7';

var dateText = document.createElement('p');
var tempCont = document.createElement('div');
var tempText = document.createElement('h1');
var iconDiv = document.createElement('img');
var locText = document.createElement('p');
var weatherToday = document.getElementById('weather-today');
var weatherPack = document.getElementById('weather-package') ;

var cityName = "Kuala Lumpur";

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
        // var timezone = data.timezone;
        // var humidity = data.current.humidity;
        var temp = data.current.temp;

        var icon = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;

        var dateTime = moment().utc(data.dt).format('Do MMM YYYY');
        dateText.classList.add('date-text');
        tempCont.classList.add('temp-cont');
        tempText.classList.add('temp-text');
        locText.classList.add('loc-text');

        tempText.innerHTML = Math.round(temp) + "&#8451;";
        iconDiv.src = icon;
        dateText.innerHTML = dateTime;
        locText.innerHTML = cityName;

        tempCont.append(tempText);
        tempCont.append(iconDiv);
        weatherToday.append(dateText);
        weatherToday.append(tempCont);
        weatherToday.append(locText);

        switch (data.current.weather[0].main) {
            case "Thunderstorm":
                weatherToday.style.backgroundImage = "url('images/thunderstorm.jpg')";
                break;
            case "Drizzle":
                weatherToday.style.backgroundImage = "url('images/drizzle.jpg')";
                break;
            case "Rain":
                weatherToday.style.backgroundImage = "url('images/rain.jpg')";
                break;
            case "Snow":
                weatherToday.style.backgroundImage = "url('images/snow.jpg')";
                break;
            case "Clear":
                weatherToday.style.backgroundImage = "url('images/clear.jpg')";
                break;
            case "Clouds":
                weatherToday.style.backgroundImage = "url('images/cloudy.jpg')";
                break;
            default:
                weatherToday.style.backgroundImage = "none";
        }

        for (i = 1; i < 7; i++ ) {
            var weatherCard = document.createElement('div');
            var date2Text = document.createElement('p');
            var temp2Cont = document.createElement('div');
            var temp2Text = document.createElement('h1');
            var icon2Div = document.createElement('img');
            var loc2Text = document.createElement('p');

            date2Text.classList.add('date-text');
            temp2Cont.classList.add('temp-cont');
            temp2Text.classList.add('temp2-text');
            loc2Text.classList.add('loc-text');

            var temp = data.daily[i].temp.max;
            var icon = `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;


            // console.log(moment().utc(data.daily[i].dt).format('Do MMM YYYY'));
            // var dateTime = moment().utc(data.daily.dt[i]).format('Do MMM YYYY');

            var dateTime = moment(dateTime, "Do-MMM-YYYY").add(i, 'days').format('Do MMM YYYY');

            weatherCard.classList.add('weather-card');

            temp2Text.innerHTML = Math.round(temp) + "&#8451;";
            icon2Div.src = icon;
            date2Text.innerHTML = dateTime;
            loc2Text.innerHTML = cityName;

            temp2Cont.append(temp2Text);
            temp2Cont.append(icon2Div);
            weatherCard.append(date2Text);
            weatherCard.append(temp2Cont);
            weatherCard.append(loc2Text);

            weatherPack.append(weatherCard);

            switch (data.daily[i].weather[0].main) {
                case "Thunderstorm":
                    weatherCard.style.backgroundImage = "url('images/thunderstorm.jpg')";
                    break;
                case "Drizzle":
                    weatherCard.style.backgroundImage = "url('images/drizzle.jpg')";
                    break;
                case "Rain":
                    weatherCard.style.backgroundImage = "url('images/rain.jpg')";
                    break;
                case "Snow":
                    weatherCard.style.backgroundImage = "url('images/snow.jpg')";
                    break;
                case "Clear":
                    weatherCard.style.backgroundImage = "url('images/clear.jpg')";
                    break;
                case "Clouds":
                    weatherCard.style.backgroundImage = "url('images/cloudy.jpg')";
                    break;

                default:
                    weatherCard.style.backgroundImage = "none";
            }
        }

    });
}

function currentApi (cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {

    console.log(data);       

    var pos  = {latitude:data.coord.lat,longitude:data.coord.lon,city:cityName};

    updateCity(pos);

    
    })
}

function updateCity (pos) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.latitude}&lon=${pos.longitude}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {


    var temp = data.current.temp;

    var icon = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;

    var tempText = document.querySelector('h1');
    var iconDiv = document.querySelector('img');
    var locText = document.querySelectorAll('.loc-text');

    tempText.innerHTML = Math.round(temp) + "&#8451;";
    iconDiv.src = icon;
    locText[0].innerHTML = pos.city;

    switch (data.current.weather[0].main) {
        case "Thunderstorm":
            weatherToday.style.backgroundImage = "url('images/thunderstorm.jpg')";
            break;
        case "Drizzle":
            weatherToday.style.backgroundImage = "url('images/drizzle.jpg')";
            break;
        case "Rain":
            weatherToday.style.backgroundImage = "url('images/rain.jpg')";
            break;
        case "Snow":
            weatherToday.style.backgroundImage = "url('images/snow.jpg')";
            break;
        case "Clear":
            weatherToday.style.backgroundImage = "url('images/clear.jpg')";
            break;
        case "Clouds":
            weatherToday.style.backgroundImage = "url('images/cloudy.jpg')";
            break;
        default:
            weatherToday.style.backgroundImage = "none";
    }

    

    for (i = 1; i < 7; i++) {
        var temp = data.daily[i].temp.max;
        var icon = `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;

        var temp2Text = document.querySelectorAll('.temp2-text')[i-1];

        var icon2Div = document.querySelectorAll('img')[i];

        temp2Text.innerHTML = Math.round(temp) + "&#8451;";
        icon2Div.src = icon;
        locText[i].innerHTML = pos.city;

        // console.log(document.querySelectorAll('.weather-card'));

        switch (data.daily[i].weather[0].main) {
            case "Thunderstorm":
                document.querySelectorAll('.weather-card')[i-1].style.backgroundImage = "url('images/thunderstorm.jpg')";
                break;
            case "Drizzle":
                document.querySelectorAll('.weather-card')[i-1].style.backgroundImage = "url('images/drizzle.jpg')";
                break;
            case "Rain":
                document.querySelectorAll('.weather-card')[i-1].style.backgroundImage = "url('images/rain.jpg')";
                break;
            case "Snow":
                document.querySelectorAll('.weather-card')[i-1].style.backgroundImage = "url('images/snow.jpg')";
                break;
            case "Clear":
                document.querySelectorAll('.weather-card')[i-1].style.backgroundImage = "url('images/clear.jpg')";
                break;
            case "Clouds":
                document.querySelectorAll('.weather-card')[i-1].style.backgroundImage = "url('images/cloudy.jpg')";
                break;

            default:
                document.querySelectorAll('.weather-card')[i-1].style.backgroundImage = "none";
        }
            
    }

    })
}


