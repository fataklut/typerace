let inputField = document.querySelector("#inputField");
let scoreParagraf = document.querySelector("#score");
let wordLine = document.querySelector("#wordLine");
let timeParagraf = document.querySelector("#time");
let resultParagraf = document.querySelector("#result");
let listContainer = document.querySelector("#listContainer");
let timeLeft = document.querySelector("#timeLeft");
let seconds = 0;
let timeLeftSec = 3;
if (localStorage.getItem("pointData" == null)) {
  localStorage.setItem("pointData", "");
}
if (localStorage.getItem("label" == null)) {
  localStorage.setItem("label", "");
}
let dataArray = [JSON.parse(localStorage.getItem("pointData"))];
let lableArray = [JSON.parse(localStorage.getItem("label"))];
timeParagraf.innerHTML = "Time remaining: " + (20 - seconds);
let gameRunning = false;
let selection = false;
let score = 0;
let canRun = true;
let ord = [
  "alt",
  "som",
  "her",
  "skulle",
  "år",
  "dette",
  "nå",
  "sammen",
  "han",
  "henne",
  "sin",
  "blir",
  "du",
  "denne",
  "enn",
  "noen",
  "før",
  "vi",
  "slik",
  "de",
  "hva",
  "siden",
  "noe",
  "når",
  "to",
  "fra",
  "ut",
  "går",
  "jeg",
  "selv",
  "gang",
  "ha",
  "over"
];
scoreParagraf.innerHTML = "Score: " + score;
let wordLineArray = [];
setInterval(function () {
  if (inputField.value == " ") {
    inputField.value = "";
  }
  if (wordLineArray.length < 6) {
    addWordLineWord();
  }
  let isWrong = false;
  for (let i = 0; i < inputField.value.length; i++) {
    let divs = document.getElementsByTagName("div");
    if (
      inputField.value.charAt(i) != divs[4].innerHTML.charAt(i) &&
      canRun &&
      inputField.value != ""
    ) {
      isWrong = true;
    }
    if (isWrong) {
      inputField.style.backgroundColor = "rgb(255, 179, 179)";
    } else {
      inputField.style.backgroundColor = "white";
    }
  }
  if (!canRun) {
    inputField.value = " Play again in: " + timeLeftSec;
  }
  if (inputField.value == "") {
    inputField.style.backgroundColor = "white";
  }
}, 10);

function setup() {
  while (wordLineArray.length < 6) {
    addWordLineWord();
  }
  for (let i = 0; i < 5; i++) {
    if (i < 2) {
      let divElement = document.createElement("div");
      divElement.style.width = "150px";
      divElement.style.borderBottom = "none";
      divElement.innerHTML = "";
      listContainer.appendChild(divElement);
    } else {
      let divElement = document.createElement("div");
      let randInt = Math.floor(Math.random() * ord.length);
      divElement.innerHTML = ord[randInt];
      divElement.style.fontSize = "30px";
      if (i > 2) {
        divElement.style.fontSize = "25px";
      }
      if (i == 2) {
        textNode = document.createTextNode(wordLineArray[2]);
        divElement.style.borderBottom = "none";
        divElement.style.backgroundColor = "lightblue";
      }
      divElement.style.width = "150px";
      listContainer.appendChild(divElement);
    }
  }
}

function startGame() {
  if (!gameRunning && canRun) {
    score = 0;
    gameRunning = true;
    seconds = 0;

    let timer = setInterval(function () {
      seconds++;
      timeParagraf.innerHTML = "Time remaining: " + (20 - seconds);
      if (seconds >= 20) {
        gameRunning = false;
        resultParagraf.style.borderLeft = "6px solid red";
        resultParagraf.style.boxShadow =
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
        resultParagraf.style.backgroundColor = "lightgray";
        resultParagraf.innerHTML =
          "Du skriver: " + score * 3 + " ord i minuttet";

        //kan ikke kjøre innen 3 sekunder etter slutt
        canRun = false;
        timeLeftSec = 3;
        inputField.readOnly = true;
        inputField.style.color = "rgba(0, 0, 0, 0.5)";
        inputField.value = " Play again in: " + timeLeftSec;
        let lablesLength = myChart.data.labels.length;
        addData(myChart, "Attempt " + String(lablesLength + 1), {
          x: lablesLength + 1,
          y: score * 3
        });

        // Play again time out
        let timeLeftFunction = setInterval(function () {
          timeLeftSec--;
          inputField.value = " Play again in: " + timeLeftSec;
          if (timeLeftSec <= 0) {
            inputField.value = "";
            inputField.style.color = "rgba(0, 0, 0, 1)";
            canRun = true;
            inputField.readOnly = false;
            seconds = 0;
            timeParagraf.innerHTML = "Time remaining: " + (20 - seconds);
            clearInterval(timeLeftFunction);
          }
        }, 1000);
        clearInterval(timer);
      }
    }, 1000);
  }
}

let myChart = new Chart(document.getElementById("chartjs-0"), {
  type: "line",
  data: {
    labels: [lableArray],
    datasets: [
      {
        label: "Progression",
        data: [dataArray],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        lineTension: 0.1
      }
    ]
  },
  options: {}
});
function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(data);
  });
  chart.update();
}

function addWordLineWord() {
  if (!selection) {
    let randInt = Math.floor(Math.random() * ord.length);
    wordLineArray.push(ord[randInt]);
    // wordLineArray.push(nameGen());
  }
}

function removeWordLineWord() {
  wordLineArray.splice(0, 1);
}

function addDiv() {
  let divElement = document.createElement("div");
  let textNode = document.createTextNode(wordLineArray[5]);
  divElement.style.width = "150px";
  divElement.style.fontSize = "20px";
  divElement.appendChild(textNode);
  listContainer.appendChild(divElement);
}

function removeDiv() {
  let divs = document.getElementsByTagName("div");
  listContainer.removeChild(divs[2]);
  divs[2].style.fontSize = "20px";
  divs[3].style.opacity = 0.5;
  divs[3].style.backgroundColor = "white";
  divs[3].style.fontSize = "25px";
  divs[4].style.borderBottom = "none";
  divs[4].style.backgroundColor = "lightblue";
  divs[4].style.fontSize = "30px";
  divs[5].style.fontSize = "25px";
}

function update() {
  if (canRun) {
    removeWordLineWord();
    addWordLineWord();
    removeDiv();
    addDiv();
  }
}

document.onkeypress = function (evt) {
  if (!selection) {
    if (inputField.value != "") {
      startGame();
    }
    let keyPressed = evt.keyCode;
    let divs = document.getElementsByTagName("div");
    if (keyPressed == 32 && inputField.value != "") {
      if (inputField.value == divs[4].innerHTML) {
        update();
        if (gameRunning) {
          scoreParagraf.style.transition = "font-size 0.2s";
          scoreParagraf.style.fontSize = "23px";
          let scorePTimer = setTimeout(() => {
            scoreParagraf.style.fontSize = "20px";
          }, 100);
          score++;
          scoreParagraf.innerHTML = "Score: " + score;
        }
        inputField.value = "";
      } else {
        update();
        if (gameRunning) {
          if (score > 0) {
            score--;
          }
          scoreParagraf.innerHTML = "Score: " + score;
        }
        inputField.value = "";
      }
    }
  }
};

// tilfeldig ord generator
let possibleNum = "11112222223333334444556";
var possibleC = "bbcdddffggghjjkklllmmnnnpppqrrrssstttvvvwxxyz";
var possibleV = "aeeiou";
var changeType = false;
var setCon = false;
var prevChar = "";

function nameGen() {
  var name = "";
  randNum = Number(
    possibleNum.charAt(Math.floor(Math.random() * possibleNum.length))
  );
  // var randNum = Math.floor(Math.random() * 9 + 2);

  for (i = 0; i <= randNum; i++) {
    var changeNum = Math.floor(Math.random() * 4 + 1);
    var char = "";

    if (changeNum == 4) {
      changeType = false;
    } else {
      changeType = true;
    }

    if (changeType) {
      if (!setCon) {
        setCon = true;
      } else {
        setCon = false;
      }
    }

    if (setCon) {
      char = possibleC.charAt(Math.floor(Math.random() * possibleC.length));
    } else {
      char = possibleV.charAt(Math.floor(Math.random() * possibleV.length));
      while (char == prevChar) {
        char = possibleV.charAt(Math.floor(Math.random() * possibleV.length));
      }
    }

    if (i == 1 && prevChar == char) {
    } else {
      name += char;
      prevChar = char;
    }
  }
  return name;
}
