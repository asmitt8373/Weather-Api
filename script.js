const searchInput = document.getElementById("form1")
const searchButton = document.getElementById("searchCity")

//adding dates to each card
$("#currentDay").text(moment().format("MM-DD-YYYY"));
$("#currentDay1").text(moment().add(1, "days").format("MM-DD-YYYY"));
$("#currentDay2").text(moment().add(2, "days").format("MM-DD-YYYY"));
$("#currentDay3").text(moment().add(3, "days").format("MM-DD-YYYY"));
$("#currentDay4").text(moment().add(4, "days").format("MM-DD-YYYY"));
$("#currentDay5").text(moment().add(5, "days").format("MM-DD-YYYY"));

var cities = JSON.parse(window.localStorage.getItem("cities")) || ["San diego", "New York", "Houston", "Los-Angeles", "Encinitas", "Tampa", "Nashville", "San-Francisco"]
function loadCities() {
    var listCities = document.getElementById('listGroup');
    listCities.innerHTML = "";
    $.each(cities, function (i) {
        var li = $('<li/>')
            .addClass('list-group-item')
            .text(cities[i])
            .appendTo(listCities);
    });
    var liCities = document.getElementsByClassName('list-group-item');
}
loadCities()

function checkIfExists() {
    //already exists, load in weather, dont add to array, Use loop
    for (let index = 0; index < cities.length; index++) {
        if (searchInput.value == cities[index]) {
            cities.splice(index, 1);
        }
    }
}

// Add New City If its real
function addNewCity() {
    checkIfExists();
    cities.unshift(searchInput.value);
    cityLimit();
}

// This fuction keeps the array at 8 cities or less
function cityLimit() {
    if (cities.length > 8) {
        cities.pop();
    }
}

searchButton.addEventListener("click", geoSearch)
function geoSearch() {
    addNewCity()
    // grabbing the value from the search input
    var city = $("#form1").val()
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=9e0994da5eadf601dbe4aca2c840def6"
    fetch(url).then(function (response) {
        return response.json()
    }).then(function (data) {
        //fetches data to put in location spot 
        var location = data[0].name
        $(".location").text("Location: " + location)

        //fetches latitude and longitute to get weather data from api
        console.log(data[0])
        var latitude = data[0].lat
        var longitude = data[0].lon
        var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=9e0994da5eadf601dbe4aca2c840def6"
        fetch(url).then(function (response) {
            return response.json()
        }).then(function (data) {
            // fetches all the data to put inside the correct category
            //data for big card
            $(".tempature").text("Tempature: " + data.daily[0].temp.day + "° F");
            $(".windSpeed").text("Wind-Speed: " + data.daily[0].wind_speed)
            $(".humidity").text("Humidity: " + data.daily[0].humidity)
            $("#uvIndex0").append($(`<p>UV Index: <span id="uv">${data.daily[0].uvi}</span></p>`));
            if (data.daily[0].uvi <= 3) {
                $("#uv").css({
                    "background-color": "green"
                });
            }
            else if (data.daily[0].uvi >= 3 || data.daily[0].uvi <= 6) {
                $("#uv").css({
                    "background-color": "yellow"
                });
            }
            else if (data.daily[0].uvi >= 6 || data.daily[0].uvi <= 8) {
                $("#uv").css({
                    "background-color": "orange"
                });
            }
            else {
                $("#uv").css({
                    "background-color": "red"
                });
            }
            $("#currentIcon").prepend($("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png"))
            //data for tomorrows weather
            $(".forecastTemperature1").text("Temp: " + data.daily[1].temp.day + "° F");
            $(".forecastwind1").text("Wind-Speed: " + data.daily[1].wind_speed)
            $(".forecastHumidity1").text("Humidity: " + data.daily[1].humidity)
            $("#forecastIcon1").prepend($("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png"))
            // data for the day after
            $(".forecastTemperature2").text("Temp: " + data.daily[2].temp.day + "° F");
            $(".forecastwind2").text("Wind-Speed: " + data.daily[2].wind_speed)
            $(".forecastHumidity2").text("Humidity: " + data.daily[2].humidity)
            $("#forecastIcon2").prepend($("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png"))
            // data for the next day after
            $(".forecastTemperature3").text("Temp: " + data.daily[3].temp.day + "° F");
            $(".forecastwind3").text("Wind-Speed: " + data.daily[3].wind_speed)
            $(".forecastHumidity3").text("Humidity: " + data.daily[3].humidity)
            $("#forecastIcon3").prepend($("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png"))
            // data for the day after
            $(".forecastTemperature4").text("Temp: " + data.daily[4].temp.day + "° F");
            $(".forecastwind4").text("Wind-Speed: " + data.daily[4].wind_speed)
            $(".forecastHumidity4").text("Humidity: " + data.daily[4].humidity)
            $("#forecastIcon4").prepend($("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png"))
            // data for the next day
            $(".forecastTemperature5").text("Temp: " + data.daily[5].temp.day + "° F");
            $(".forecastwind5").text("Wind-Speed: " + data.daily[5].wind_speed)
            $(".forecastHumidity5").text("Humidity: " + data.daily[5].humidity)
            $("#forecastIcon5").prepend($("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + ".png"))
        })
    })
    window.localStorage.setItem("cities", JSON.stringify(cities));
    loadCities();
}
