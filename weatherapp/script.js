let weather = {
    apiKey: "1d1e24256ba2d1dc8f380bb128d05dcd",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&units=imperial&appid=" 
             + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon , description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
        document.querySelector(".desc").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " +humidity+"%";
        document.querySelector(".wind").innerText = "Wind Speed: " +speed+"mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')";
    },
    srch: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
.querySelector(".search")
.addEventListener("click",function(){
    weather.srch();
});

document
.querySelector(".search-bar")
.addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        weather.srch();
    }
});

weather.fetchWeather("New york");