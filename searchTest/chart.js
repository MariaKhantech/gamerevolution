const ctx = document.getElementById("myChart").getContext("2d");
const ps3Btn = document.getElementById("ps3Drop");
const xboxBtn = document.getElementById("xboxDrop");
const switchBtn = document.getElementById("switchDrop");
const pcBtn = document.getElementById("pcDrop");

let oldData = [0, 1, 10, 43, 23, 88, 23];
let newData = [10, 14, 18, 43, 21, 38, 63];
let oldData1 = [99, 80, 60, 66, 63, 18, 23];
let newData1 = [53, 52, 18, 68, 50, 38, 73];
let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [
      {
        label: "first dataset",
        // backgroundColor: "rgb(0,99,120",
        borderColor: "rgb(0,99,120",
        data: oldData,
      },
      {
        label: "second dataset",
        // backgroundColor: "rgb(99,2,33",
        borderColor: "rgb(100, 20, 30",
        data: oldData1,
      },
    ],
  },
});

function updateChart() {
  chart.update();
  chart.data.datasets[0].data = newData;
  chart.data.datasets[1].data = newData1;
}
