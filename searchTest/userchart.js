// TODO: prompt user with questions
// TODO: open with modal
// TODO: once user inputs generate graphs
// TODO: save graph data so that it can be reloaded on specific page
//TODO: upload an average of user data for base chart data
//TODO: make gauge chart
const questionDiv = $("#questionDiv");
const statStartBtn = $("#userStatStartBtn");
const saveStatBtn = $("#saveStatsBtn");
// form values
const consoleVal = $("#consoleVal");
const pcVal = $("#pcVal");
const onlineVal = $("#onlineVal");
const offlineVal = $("#offlineVal");
const shooterVal = $("#shooterVal");
const racingVal = $("#racingVal");
const rpgVal = $("#rpgVal");
const actionVal = $("#actionVal");
const adventureVal = $("#adventureVal");
const strategyVal = $("#strategyVal");
let userData = [];
const ctx = document.getElementById("userChart").getContext("2d");
//set chart font to white
Chart.defaults.global.defaultFontColor = "black";
//initilize chart
createUserChart("radar");
// updates chart on click,
saveStatBtn.on("click", () => {
  userData = [
    consoleVal.val(),
    pcVal.val(),
    onlineVal.val(),
    offlineVal.val(),
    shooterVal.val(),
    racingVal.val(),
    rpgVal.val(),
    actionVal.val(),
    adventureVal.val(),
    strategyVal.val(),
  ];
  console.log(consoleVal.val());
  // /////////////////////////////////////////////////////////////////////update chart data here

  userRadarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "Console",
        "PC",
        "Online",
        "Offline",
        "Shooter",
        "Racing",
        "RPG",
        "Action",
        "Adventure",
        "Strategy",
      ],
      datasets: [
        { label: "User Stats", data: userData, borderColor: "#240090" },
        {
          label: "Average User Stats",
          data: [1, 2, 5, 5, 4, 2, 8, 6, 4, 8],
          borderColor: "#84e0ee",
        },
      ],
    },
    options: {
      scale: {
        gridLines: {
          color: "black",
        },
        angleLines: {
          display: false,
        },
        ticks: {
          display: false,
          // suggestedMin: 1,
          // suggestedMax: 10,
        },
      },
    },
  });
});
// $("#toggleBtn").on('click',()=>{
//     toggleFill();
// const toggleFill = () => {
//     userRadarChart.

function updateUserChart() {
  userRadarChart.update();
  userRadarChart.data.datasets.data = userData;
}

function updateRadar() {
  userRadarChart.options.backgroundColor = "white";
}
// decide size of chart by 5 or 10?
///////////////////////////////////////////////////////////button
$("#userGaugeBtn").on("click", () => {
  makeDonut();
});

// func to make charts
function createUserChart(type) {
  let userRadarChart = new Chart(ctx, {
    type: type,
    data: {
      labels: [
        "Console",
        "PC",
        "Online",
        "Offline",
        "Shooter",
        "Racing",
        "RPG",
        "Action",
        "Adventure",
        "Strategy",
      ],
      datasets: [
        {
          label: "Average User Stats",
          data: [1, 2, 5, 5, 4, 2, 8, 6, 4, 8],
          borderColor: "#84e0ee",
          fill: true,
        },
      ],
    },
    options: {
      backgroundColor: "black",
      fontColor: "white",
      legend: {
        labels: {
          fontColor: "black",
        },
      },
      scale: {
        gridLines: {
          color: "black",
        },
        angleLines: {
          display: false,
        },
        ticks: {
          display: false,
          // suggestedMin: 1,
          // suggestedMax: 10,
        },
      },
    },
  });
}
/////////////////////////////////////////////////////////// make gauge
function makeDonut() {
  // userData = [
  //   consoleVal.val(),
  //   pcVal.val(),
  //   onlineVal.val(),
  //   offlineVal.val(),
  //   shooterVal.val(),
  //   racingVal.val(),
  //   rpgVal.val(),
  //   actionVal.val(),
  //   adventureVal.val(),
  //   strategyVal.val(),
  // ];
  let userRadarChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [
        "Console",
        "PC",
        "Online",
        "Offline",
        "Shooter",
        "Racing",
        "RPG",
        "Action",
        "Adventure",
        "Strategy",
      ],
      datasets: [
        {
          label: "User Stats",
          data: userData,
          fill: true,
          backgroundColor: colorPaletteRGBTransparent,
        },
      ],
    },
    options: {
      circumference: 1 * Math.PI,
      rotation: 1 * Math.PI,
      cutOutPercentage: 60,
      backgroundColor: "black",
      fontColor: "white",
      legend: {
        labels: {
          fontColor: "black",
        },
      },
    },
  });
}
const colorPaletteRGBTransparent = [
  "rgba(53,0,211,.4)",
  "rgba(0,255,255,.4)",
  "rgba(75,127,255,.4)",
  "rgba(112,63,255,.4)",
  "rgba(242, 38, 19, .4)",
  "rgba(0, 230, 64, .4)",
  "rgba(240, 255, 0, .4)",
  "rgba(242, 120, 75, .4)",
  "rgba(83, 51, 237, .4)",
  "rgba(219, 10, 91, .4)",
];
$("#rollStatsBtn").on("click", () => {
  for (let i; i < 10; i++) {
    min = Math.ceil(1);
    max = Math.floor(10);
    randomNum = Math.floor(Math.random() * (max - min)) + min;
    userData.push(randomNum);
  }
  console.log(userData);
});
