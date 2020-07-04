// TODO: prompt user with questions
// TODO: open with modal
// TODO: once user inputs generate graphs
// TODO: save graph data so that it can be reloaded on specific page
//TODO: upload an average of user data for base chart data
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
Chart.defaults.global.defaultFontColor = "white";
//initilize chart
let userRadarChart = new Chart(ctx, {
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
      {
        label: "Average User Stats",
        data: [1, 2, 5, 5, 4, 2, 8, 6, 4, 8],
        borderColor: "red",
      },
    ],
  },
  options: {
    fontColor: "white",
    legend: {
      labels: {
        fontColor: "white",
      },
    },
    scale: {
      gridLines: {
        color: "white",
      },
      angleLines: {
        display: false,
      },
      ticks: {
        suggestedMin: 1,
        suggestedMax: 10,
      },
    },
  },
});
// updates chart on click
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
  // update chart data here

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
          borderColor: "red",
        },
      ],
    },
    options: {
      scale: {
        gridLines: {
          color: "white",
        },
        angleLines: {
          display: false,
        },
        ticks: {
          suggestedMin: 1,
          suggestedMax: 10,
        },
      },
    },
  });
});

function updateUserChart() {
  userRadarChart.update();
  userRadarChart.data.datasets.data = userData;
}
// decide size of chart by 5 or 10?
