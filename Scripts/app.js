// // selcotrs
const serachBtn = document.getElementById("locBtn");
const inputContainer = document.getElementById("inputContainer");
const userInputTextFeild = document.querySelector(".userInput");

// ************

//************ */

let storageEmpty = localStorage.length == 0 ? true : false;

if (storageEmpty) {
  newUser();
} else {
  returning();
}
//************ */
function newUser() {
  inputContainer.style.display = "inline-block";
  inputContainer.style.animationName = "fadein";
  //inputContainer.style.animationDuration = "10s";
  // var cityCyle = setInterval(cyleNames, 2500);

  serachBtn.addEventListener("click", (fucnion) => {
    var input = userInputTextFeild.value + "";
    console.log(input + "in the aciton");
    if (userInputTextFeild.value == "") {
      alert("Enter a city");
    } else {
      //alert(userInputTextFeild.value + "");
      // ****************

      getCurretWeather(input);
    }
  });

  document.addEventListener("click", function (event) {
    ///USE eveent.target.classList, instead of event.target.id
    if (event.target && event.target.classList == "fa fa-plus-circle fa-3x") {
      let newInput = prompt("Enter a city name");
      if (newInput == "") {
        alert("Enter a city");
      } else {
        //alert(userInputTextFeild.value + "");
        // ****************

        getCurretWeather(newInput);
      }

      // ans = ans + "  " + event.target.id;

      //  alert(ans + "");

      //  document.getElementById(itemDel + "").remove();
    }
  });

  // userInputTextFeild.addEventListener("focusin", (fucnion) => {
  //   userInputTextFeild.placeholder = "";

  //   clearInterval(cityCyle);
  // });
}

// function cyleNames() {
//   const citites = [
//     "New York City, NY.",
//     "Los Angeles, CA.",
//     "Chicago, IL.",
//     "Houston, TX.",
//     "Phoenix, AZ.",
//     "Philadelphia, PA.",
//     "San Diego, CA.",
//   ];

//   userInputTextFeild.placeholder =
//     citites[Math.floor(Math.random() * citites.length)];
// }

function getCurretWeather(input) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&units=imperial&appid=2fefb7fcd6a37f2fb7c60079982b701d"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Invaild city name");
      }
      //if (response.status == 404) throw Error(response.status);
    })
    .then((data) => {
      let start = document.getElementById("cardContainer");

      // *******
      let index = localData(input);

      if (index == "false") throw Error("max card limit");

      if (index != "zero") document.getElementById("addcard").remove();

      index = index + '"';
      start.insertAdjacentHTML(
        "beforeend",
        '  <div class="card" id ="' +
          index +
          '><div class="mainDay" id ="' +
          index +
          '> <button class ="delBtn" id =' +
          index +
          '> X </button> <h2 class="City"id ="' +
          index +
          '></h2> <h2 class="description"id ="' +
          index +
          '></h2> <h1 class="currentTemp"id ="' +
          index +
          '></h1><div class="moreData"id ="' +
          index +
          '><div><h1> Humidity</h1> <p class="humididy"id ="' +
          index +
          '></p></div><div> <h1> Min </h1><p class="minTemp"id ="' +
          index +
          '></p></div> <div> <h1> Max </h1> <p class="maxTemp"id ="' +
          index +
          '></p> </div> </div></div> </div><i class="fa fa-plus-circle fa-3x" id ="addcard" aria-hidden="true"></i>'
      );
      index = index.slice(0, -1);
      console.log(index + "");
      // *****
      let cardContainer = document.querySelector("#" + index + ".card");
      let city = document.querySelector("#" + index + ".City");
      let description = document.querySelector("#" + index + ".description");
      let currentTempature = document.querySelector(
        "#" + index + ".currentTemp"
      );

      let currentTempIcon = document.querySelector(
        "#" + index + ".currentTempIcon"
      );
      let humididty = document.querySelector("#" + index + ".humididy");
      let minTemp = document.querySelector("#" + index + ".minTemp");
      let maxTemp = document.querySelector("#" + index + ".maxTemp");

      var name = data["name"];
      var currentTemp = data["main"]["temp"];
      var descr = data["weather"][0]["description"];
      var tempMin = data["main"]["temp_min"];
      var tempMax = data["main"]["temp_max"];
      var humid = data["main"]["humidity"];
      var iconId = data["weather"][0]["icon"];

      var img = document.createElement("img");

      img.src = "Images/" + iconId + ".png";
      img.className = "currentTempIcon";

      city.textContent = name;
      description.textContent = descr;
      currentTempature.innerHTML = Math.round(currentTemp) + "°";
      currentTempature.appendChild(img);
      minTemp.textContent = Math.round(tempMin) + "°";
      maxTemp.textContent = Math.round(tempMax) + "°";
      humididty.textContent = Math.round(humid) + "%";

      // *********
      inputContainer.style.animationName = "fadeout";
      inputContainer.style.display = "none";

      cardContainer.style.animationName = "fadein";
      cardContainer.style.display = "inline-block";
      loadCard();
      // *****
    })
    .catch((error) => {
      alert(error);
    });
}

function loadWeather(input, index) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&units=imperial&appid=2fefb7fcd6a37f2fb7c60079982b701d"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Invaild city name");
      }
      //if (response.status == 404) throw Error(response.status);
    })
    .then((data) => {
      let start = document.getElementById("cardContainer");

      // *******
      // let index = localData(input);
      if (index == "false") throw Error("max card limit");

      if (index != "zero") document.getElementById("addcard").remove();

      index = index + '"';
      start.insertAdjacentHTML(
        "beforeend",
        '  <div class="card" id ="' +
          index +
          '><div class="mainDay" id ="' +
          index +
          '> <button class ="delBtn" id =' +
          index +
          '> X </button> <h2 class="City"id ="' +
          index +
          '></h2> <h2 class="description"id ="' +
          index +
          '></h2> <h1 class="currentTemp"id ="' +
          index +
          '></h1><div class="moreData"id ="' +
          index +
          '><div><h1> Humidity</h1> <p class="humididy"id ="' +
          index +
          '></p></div><div> <h1> Min </h1><p class="minTemp"id ="' +
          index +
          '></p></div> <div> <h1> Max </h1> <p class="maxTemp"id ="' +
          index +
          '></p> </div> </div></div> </div><i class="fa fa-plus-circle fa-3x" id ="addcard" aria-hidden="true"></i>'
      );

      index = index.slice(0, -1);
      console.log(index + "");
      // *****
      let cardContainer = document.querySelector("#" + index + ".card");
      let city = document.querySelector("#" + index + ".City");
      let description = document.querySelector("#" + index + ".description");
      let currentTempature = document.querySelector(
        "#" + index + ".currentTemp"
      );

      let currentTempIcon = document.querySelector(
        "#" + index + ".currentTempIcon"
      );
      let humididty = document.querySelector("#" + index + ".humididy");
      let minTemp = document.querySelector("#" + index + ".minTemp");
      let maxTemp = document.querySelector("#" + index + ".maxTemp");

      var name = data["name"];
      var currentTemp = data["main"]["temp"];
      var descr = data["weather"][0]["description"];
      var tempMin = data["main"]["temp_min"];
      var tempMax = data["main"]["temp_max"];
      var humid = data["main"]["humidity"];
      var iconId = data["weather"][0]["icon"];

      var img = document.createElement("img");

      img.src = "Images/" + iconId + ".png";
      img.className = "currentTempIcon";

      city.textContent = name;
      description.textContent = descr;
      currentTempature.innerHTML = Math.round(currentTemp) + "°";
      currentTempature.appendChild(img);
      minTemp.textContent = Math.round(tempMin) + "°";
      maxTemp.textContent = Math.round(tempMax) + "°";
      humididty.textContent = Math.round(humid) + "%";

      // *********
      inputContainer.style.animationName = "fadeout";
      inputContainer.style.display = "none";

      cardContainer.style.animationName = "fadein";
      cardContainer.style.display = "inline-block";
      loadCard();
      // *****
    })
    .catch((error) => {
      alert(error);
    });
}

function localData(input) {
  // if (localStorage.length == 0) {
  //   localStorage.setItem("0", input + "");
  //   return "zero";
  // } else if (localStorage.length == 1) {
  //   localStorage.setItem("1", input + "");
  //   return "one";
  // } else if (localStorage.length == 2) {
  //   localStorage.setItem("2", input + "");
  //   return "two";
  // } else {
  //   return "false";
  // }

  if (localStorage.getItem("zero") == null) {
    localStorage.setItem("zero", input + "");
    return "zero";
  } else if (localStorage.getItem("one") == null) {
    localStorage.setItem("one", input + "");
    return "one";
  } else if (localStorage.getItem("two") == null) {
    localStorage.setItem("two", input + "");
    return "two";
  } else {
    return "false";
  }
}

function returning() {
  if (localStorage.getItem("zero") != null) {
    loadWeather(localStorage.getItem("zero"), "zero");
  }
  if (localStorage.getItem("one") != null) {
    loadWeather(localStorage.getItem("one"), "one");
  }
  if (localStorage.getItem("two") != null) {
    loadWeather(localStorage.getItem("two"), "two");
  }

  document.addEventListener("click", function (event) {
    ///USE eveent.target.classList, instead of event.target.id
    if (event.target && event.target.classList == "fa fa-plus-circle fa-3x") {
      let newInput = prompt("Enter a city name");
      if (newInput == "") {
        alert("Enter a city");
      } else {
        //alert(userInputTextFeild.value + "");
        // ****************

        getCurretWeather(newInput);
      }

      // ans = ans + "  " + event.target.id;

      //  alert(ans + "");

      //  document.getElementById(itemDel + "").remove();
    }
  });

  // getCurretWeather(input);
  // getCurretWeather(localStorage.getItem("zero"));
}

function loadCard() {}
