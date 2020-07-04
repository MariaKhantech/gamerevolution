// TODO: prompt user with questions
// TODO: open with modal
// TODO: once user inputs generate graphs
// TODO: save graph data so that it can be reloaded on specific page
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

saveStatBtn.on("click", () => {
  console.log(
    consoleVal.val(),
    pcVal.val(),
    onlineVal.val(),
    offlineVal.val(),
    shooterVal.val(),
    racingVal.val(),
    rpgVal.val(),
    actionVal.val(),
    adventureVal.val(),
    strategyVal.val()
  );
  //   alert("working");
});
// decide size of chart by 5 or 10?
const ctx = document.getElementById("userChart").getContext("2d");
let getUserChart = () => {
  data.push(checkConsole.val(), checkPC.val());
};

let data = [];
let userRadarChart = new Chart(ctx, {
  type: "radar",
  data: data,
  options: {
    scale: {
      angleLines: {
        display: false,
      },
      ticks: {
        suggestedMin: 50,
        suggestedMax: 100,
      },
    },
  },
});
