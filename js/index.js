const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var btn = document.getElementById("search");
var input = document.getElementById("input");
var arr = [];

// Function to fetch weather based on user input
function search() {
    Weather(input.value);
}

// Function to get day name from date string
function getdayname(dateString) {
    const date = new Date(dateString); 
    const dayOfWeekNumber = date.getDay(); 
    return daysOfWeek[dayOfWeekNumber]; 
}

// Function to format date from date string
function formatDate(dateString) {
    const date = new Date(dateString); 
    const day = date.getDate(); 
    const monthIndex = date.getMonth(); 
    const month = months[monthIndex]; 
    const formattedDate = `${day} ${month}`;
    
    return formattedDate;
}

// Function to fetch weather based on provided location
async function Weather(zone) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${zone}&days=3`);
    var data = await response.json();
    arr = data;
    display();
}

// Function to fetch weather based on geolocation
async function getWeatherByGeolocation(latitude, longitude) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${latitude},${longitude}&days=3`);
    var data = await response.json();
    arr = data;
    display();
}

// Function to display weather data
function display() {
    const date1String = arr.forecast.forecastday[0].date;   
    const date2String = arr.forecast.forecastday[1].date;   
    const date3String = arr.forecast.forecastday[2].date; 
    const date = arr.forecast.forecastday[0].date;
    const formattedDate = formatDate(date);
    console.log(`${formattedDate}`); 
      
    const day1 = getdayname(date1String);
    const day2 = getdayname(date2String);
    const day3 = getdayname(date3String);

    console.log(`Day1 is ${day1}`);
    console.log(`Day2 is ${day2}`);
    console.log(`Day3 is ${day3}`);

    var cartona = `
        <div class="col-md-4 mb-4">
            <div class="card mt-5 " style="width:20rem">
                <div class="card-header h4 d-flex justify-content-between" style="background-color:#2D303D;color:#84858B">
                    <h3>${day1}</h3>
                    <h3>${formattedDate}</h3>
                </div>
                <div class="card-body " style="background-color:#323544;color:#84858B">
                    <span>${arr.location.region}</span>
                    <div class="fw-bold"><p style="font-size:75px;color:white">${arr.current.temp_c}°C</p></div>
                    <div><img src="https:${arr.current.condition.icon}" alt=""></div>
                    <span style="color:blue;">${arr.current.condition.text}</span>
                    <div style="color:#84858B" class="d-flex justify-content-between pt-3">
                        <span><i class="fa-solid fa-umbrella"></i> 20%</span>
                        <span><i class="fa-solid fa-wind"></i> ${arr.current.wind_kph} km/h</span>
                        <span><i class="fa-solid fa-compass"></i> ${arr.current.wind_dir}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-4 mb-4">
            <div class="card mt-5"  style="width:20rem">
                <div class="card-header h4 text-center" style="background-color:#2D303D;color:#84858B">
                    <h3>${day2}</h3>
                </div>
                <div class="card-body text-center" style="background-color:#323544;color:#84858B">
                    <div><img src="https:${arr.current.condition.icon}" alt=""></div>
                    <div class="fw-bold pt-5">
                        <p style="font-size:30px;color:white">${arr.forecast.forecastday[1].day.maxtemp_c}°C</p>
                    </div>
                    <div>
                        <p style="font-size:30px;color:#84858B">${arr.forecast.forecastday[1].day.mintemp_c}°C</p>
                    </div>
                    <div>
                        <p style="font-size:20px;color:blue">${arr.forecast.forecastday[1].day.condition.text}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-4 mb-4">
            <div class="card mt-5"  style="width:20rem">
                <div class="card-header h4 text-center" style="background-color:#2D303D;color:#84858B">
                    <h3>${day3}</h3>
                </div>
                <div class="card-body text-center" style="background-color:#323544;color:#84858B">
                    <div><img src="https:${arr.current.condition.icon}" alt=""></div>
                    <div class="fw-bold pt-5">
                        <p style="font-size:30px;color:white">${arr.forecast.forecastday[2].day.maxtemp_c}°C</p>
                    </div>
                    <div>
                        <p style="font-size:30px;color:#84858B">${arr.forecast.forecastday[2].day.mintemp_c}°C</p>
                    </div>
                    <div>
                        <p style="font-size:20px;color:blue">${arr.forecast.forecastday[2].day.condition.text}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
  
    document.getElementById("here").innerHTML = cartona;
}

// Function to get user's geolocation and fetch weather data
function getLocationAndWeather() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            getWeatherByGeolocation(latitude, longitude);
        }, function(error) {
            console.error("Error getting geolocation:", error);
            // Fallback to default location (e.g., Cairo)
            getWeather('cairo'); // Provide default location
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
        // Fallback to default location (e.g., Cairo)
        getWeather('cairo'); // Provide default location
    }
}

// Call function to fetch weather based on geolocation
getLocationAndWeather();
