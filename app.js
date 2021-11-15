//GLOBAL SELECTIONS
const apikey = '64fac9d92791659f3b07c1b89999782a';
const searchBtn = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-bar');
const descrip = document.querySelector('.description');
const humid = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const cityname = document.querySelector('.name');
const temp = document.querySelector('.temp');
const err = document.querySelector('.error');
const errMsg = document.querySelector('.error-msg');
const wrong = document.querySelector('.wrong');

//EVENT LISTENERS
searchBtn.addEventListener('click', function(){
    getData(searchInput.value);
});

//FUNCTIONS

function getData(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
        .then(response => response.json())
        .then(data => updateDisplay(data));
}

function updateDisplay(climateData){
    if(climateData.message === "city not found"){
        err.classList.add('active');
        errMsg.classList.add('active');
        wrong.textContent = searchInput.value;
        setTimeout(function(){
            err.classList.remove('active');
            errMsg.classList.remove('active');
        },700);
    }else{
        descrip.textContent = climateData.weather[0].main;
        wind.textContent = climateData.wind.speed;
        cityname.textContent = climateData.name;
        humid.textContent = climateData.main.humidity;
        temp.textContent = (Math.floor((climateData.main.temp-273.15)*100))/100;
        searchInput.value = "";
    }
    
}

//RUNTIME (MAIN)
getData('Mumbai');