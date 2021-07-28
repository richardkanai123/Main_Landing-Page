// on loading window
window.onload = ()=>{
    WeatherApiReq();
    GetCity();
    GetName();
    getLocation();
    GetJoke();
    GetQuote();
    GetAim();
    getTodos();
    SetDate();
    DetDay();
}

// username
const userDiv = document.querySelector('#UserName');

// set Name 
userDiv.addEventListener('keypress', SetName);
userDiv.addEventListener('blur', SetName);

// username manipulation
function SetName(e){
    if(e.type === 'keypress'){
        // ensure enter is pressed
        if(e.which == 13|| e.keyCode == 13){
            localStorage.setItem('Name', e.target.innerText);
            userDiv.blur();
        }
    }else {
        localStorage.setItem('Name', e.target.innerText);
    }
}

// get city from local storage
function GetName(){
    if (localStorage.getItem('Name') === null) {
        userDiv.textContent = '[Enter Your Name]';
    } else{
        userDiv.textContent = localStorage.getItem('Name');
    }

}


// main aim

const AimHolder = document.querySelector('#Aim')

AimHolder.addEventListener('keypress', SetAim);
AimHolder.addEventListener('blur', SetAim);

function SetAim(e){
    if(e.type === 'keypress'){
        // ensure enter is pressed
        if(e.which == 13|| e.keyCode == 13){
            localStorage.setItem('Aim', e.target.innerText);
            AimHolder.blur();
        }
    }else {
        localStorage.setItem('Aim', e.target.innerText);
    }
}

// get aim from local storage
function GetAim(){
    if (localStorage.getItem('Aim') === null) {
        AimHolder.textContent = '{Enter Main Aim}';
    } else{
        AimHolder.textContent = localStorage.getItem('Aim');
    }

}





// weather api
const Temp = document.querySelector('.temp')
const Description = document.querySelector('.description')
const Wind = document.querySelector('#wind')
const LatitudeDiv = document.querySelector('#Latitude')
const LongitudeDiv = document.querySelector('#Longitude')
const Ttemp = document.querySelector('.Ttemp')
const Tdescription = document.querySelector('.Tdescription')
const CurrentCity = document.querySelector('.City')

// set city 
CurrentCity.addEventListener('keypress', SetCity);
CurrentCity.addEventListener('blur', SetCity);

// set the city on update
function SetCity(e){
    if(e.type === 'keypress'){
        // ensure enter is pressed
        if(e.which == 13|| e.keyCode == 13){
            localStorage.setItem('City', e.target.innerText);
            CurrentCity.blur();
        }
    }else {
        localStorage.setItem('City', e.target.innerText);
    }
}

// get city from local storage
function GetCity(){
    if (localStorage.getItem('City') === null) {
        CurrentCity.textContent = '[Enter main Aim]';
    } else{
        CurrentCity.textContent = localStorage.getItem('City');
    }

}

// geolocation for sun details
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      prompt( "Geolocation is not supported by this browser.");
    }

}

// location data
function showPosition(position) {
    let Latitude = position.coords.latitude;
    let Longitude = position.coords.longitude;

    LongitudeDiv.textContent = Longitude.toFixed(3)
    LatitudeDiv.textContent = Latitude.toFixed(3)
}


// weather request
function WeatherApiReq(){
    fetch(`https://goweather.herokuapp.com/weather/${localStorage.getItem('City')}`)
    .then(response => response.json())
    .then(data =>{
        Temp.textContent = data.temperature;
        Description.textContent = data.description;
        Wind.textContent = data.wind;
        Ttemp.textContent = data.temperature;
    });
}

// time manipulation



// quotes api 
const Quote = document.querySelector('.quoteContent')
const Author = document.querySelector('.authorName')
const QuoteBtn = document.querySelector(".QuoteBtn")
QuoteBtn.addEventListener('click', GetQuote)

function GetQuote(){
    fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data =>{
        Author.textContent = data.author;
        Quote.textContent = data.content;
    })
}



// jokes api

const Jokecontent = document.querySelector(".Joke")
const JokeBtn = document.querySelector(".JokeBtn")

JokeBtn.addEventListener('click', GetJoke);

function GetJoke(){
    fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist&type=single")
    .then(response => response.json())
    .then(data =>{
        Jokecontent.textContent = data.joke;
    })

}



// todo list section
const AddBtn = document.querySelector('#Sbbtn')
const Todo = document.querySelector('#Todo')
const List = document.querySelector('.List')
const List_Item = document.querySelector('.ListItem')
const Activity = document.querySelector('.activity')


AddBtn.addEventListener('click', AddTodo);

function AddTodo(e){
    e.preventDefault()
    // create new div
    let newListItem = document.createElement('div');
    newListItem.classList.add('ListItem');

    // p holding the activity
    let newActivity = document.createElement('p');
    newActivity.classList.add('activity');
    newActivity.textContent = Todo.value;

    // savetoloacal storage
    saveLocalTodos(Todo.value);

    // check btn
    let newCheckBtn = document.createElement('button');
    newCheckBtn.classList.add('checkbtn');
    newCheckBtn.innerHTML = '<i class="bi bi-file-check-fill"></i>'

    // delete btn
    let newDeleteBTn = document.createElement('button');
    newDeleteBTn.classList.add('deletebtn')
    newDeleteBTn.innerHTML = '<i class="bi bi-trash-fill"></i>'
    // append p to div
    newListItem.appendChild(newActivity)

    // append the buttons to the div
    newListItem.appendChild(newCheckBtn)
    newListItem.appendChild(newDeleteBTn)

    // append the item to the list
    List.appendChild(newListItem)
    

    Todo.value = "";

}

// saving to local storage to array todo
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }




// get all available activities from local storage and append to the list
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        // create new div
    let newListItem = document.createElement('div');
    newListItem.classList.add('ListItem');

    // p holding the activity
    let newActivity = document.createElement('p');
    newActivity.classList.add('activity');
    newActivity.textContent = todo;

    // check btn
    let newCheckBtn = document.createElement('button');
    newCheckBtn.classList.add('checkbtn');
    newCheckBtn.innerHTML = '<i class="bi bi-file-check-fill"></i>'

    // delete btn
    let newDeleteBTn = document.createElement('button');
    newDeleteBTn.classList.add('deletebtn')
    newDeleteBTn.innerHTML = '<i class="bi bi-trash-fill"></i>'
    // append p to div
    newListItem.appendChild(newActivity)

    // append the buttons to the div
    newListItem.appendChild(newCheckBtn)
    newListItem.appendChild(newDeleteBTn)

    // append the item to the list
    List.appendChild(newListItem)
      
    });
}

// remove an existing activity in the todos array in L.Storage
function removeLocalTodos(ELementContainer) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    console.log(ELementContainer);
    const todoIndex = ELementContainer.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  } 

window.addEventListener('click', (e)=>{
    let theItem = e.target;
    if(theItem.classList.value === 'checkbtn'){

        // Make or remove from the classlist(open)...to reduce opacity.
        theItem.parentElement.classList.toggle('Done')

    } else if(e.target.classList.value === 'deletebtn'){
        theItem.parentElement.remove();
        console.log(theItem.parentElement.children[0].textContent);
        // delete the List_item clicked
        removeLocalTodos(theItem.parentElement)
    }
})



// Time

const Hour = document.querySelector('.hour')
const Minute = document.querySelector('.minute')
const Second = document.querySelector('.seconds')
const TodayDay = document.querySelector('#day')
const TodayDate = document.querySelector('.date')


function CurrentTime(){
    
    const now = new Date()
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    // set the hour
    addzero(hours, Hour)
    // set the min
    addzero(minutes, Minute)
    // set seconds
    addzero(seconds, Second)

}


//! add zero to unit less than 10
// x is the time unit
// y is the holder
function addzero(x,y){
    if (x<10) {
        y.textContent = `0${x}`;
        
    } else {
        y.textContent=x;
    }

}

// call current time every second
setInterval(() => {
    CurrentTime();
}, 1000);

// !Determine the day in words
 //* get today's by name not number as given by Js

 function DetDay(){
    var day;
    switch (new Date().getDay()) {
        case 0:
        day = "Sunday";
        break;
        case 1:
        day = "Monday";
        break;
        case 2:
        day = "Tuesday";
        break;
        case 3:
        day = "Wednesday";
        break;
        case 4:
        day = "Thursday";
        break;
        case 5:
        day = "Friday";
        break;
        case 6:
        day = "Saturday";
    }
    TodayDay.textContent = day;
}

// set Today's date
function SetDate(){
    const now = new Date()
    let T_date = now.getUTCDate();
    let T_month = DetMonth();
    let T_year = now.getUTCFullYear();
    TodayDate.textContent = T_date+'TH '+ T_month +', '+ T_year;
}


function DetMonth(){
    var Month;
    var now = new Date().getMonth();
    switch (now) {
        case 0:
        Month = "January";
        break;
        case 1:
        Month = "February";
        break;
        case 2:
        Month = "March";
        break;
        case 3:
        Month = "April";
        break;
        case 4:
        Month = "May";
        break;
        case 5:
        Month = "June";
        break;
        case 6:
        Month = "July";
        break;
        case 7:
        Month = "August";
        break;
        case 8:
        Month = "September";
        break;
        case 9:
        Month = "October";
        break;
        case 10:
        Month = "November";
        break;
        case 11:
        Month = "December";
    }
    return Month
}