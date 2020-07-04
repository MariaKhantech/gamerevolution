// const { response } = require("express");

const { response } = require("express");

const ctx = document.getElementById("myChart").getContext("2d");
const ctxTOP = document.getElementById("topChart").getContext("2d");
const ps3Btn = document.getElementById("ps3Drop");
const xboxBtn = document.getElementById("xboxDrop");
const switchBtn = document.getElementById("switchDrop");
const pcBtn = document.getElementById("pcDrop");
// const axios = require("axios");
// chart extension
// chart extension
let myScale = Chart.Scale.extend(
  /* extensions ... */
  {
    left: 50, // left edge of the scale bounding box
    right: 50, // right edge of the bounding box
    top: 50,
    bottom: 50,
    width: 200, // the same as right - left
    height: 200, // the same as bottom - top

    // // Margin on each side. Like css, this is outside the bounding box.
    // margins: {
    //   left: number,
    //   right: number,
    //   top: number,
    //   bottom: number,
    // },

    // // Amount of padding on the inside of the bounding box (like CSS)
    // paddingLeft: number,
    // paddingRight: number,
    // paddingTop: number,
    // paddingBottom: number,
  }
);

// color array

const colorPalette = [
  "black",
  "#0c0032",
  "#190061",
  "#240090",
  "#3500D3",
  "#282828",
  "#00ff9f",
  "#00b8ff",
  "#001eff",
  "#bd00ff",
  "#d600ff",
];

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
        borderColor: "red",
        data: oldData,
      },
      {
        label: "second dataset",
        // backgroundColor: "rgb(99,2,33",
        borderColor: "blue",
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

$(document).ready(() => {
  // url = "https://chicken-coop.fr/rest/games?title=[TITRE]";
  // $.get(url).then((response) => {
  //   console.log(response);
  // });
  let topsearch = (id) => {
    url = `https://rawg.io/api/games?platforms=${id}&page_size=50&ordering=-rating`;
    $.get(url).then((response) => {
      //first 20 results
      for (let i = 0; i < 20; i++) {
        console.log(response.results[i].name, response.results[i].metacritic);
      }
      //initialize chart
      // TODO: if null don't display or put no data
      // dry how to make objects??
      let chart = new Chart(ctxTOP, {
        type: "horizontalBar",
        data: {
          datasets: [
            {
              label: response.results[0].name,
              // backgroundColor: "rgb(99,2,33",
              backgroundColor: colorPalette[1],
              data: [response.results[0].metacritic],
            },
            {
              label: response.results[1].name,
              // backgroundColor: "rgb(99,2,33",
              backgroundColor: colorPalette[2],
              data: [response.results[1].metacritic],
            },
            {
              label: response.results[2].name,
              // backgroundColor: "rgb(99,2,33",
              backgroundColor: colorPalette[3],
              data: [response.results[2].metacritic],
            },
            {
              label: response.results[9].name,
              // backgroundColor: "rgb(99,2,33",
              backgroundColor: colorPalette[4],
              data: [response.results[9].metacritic],
            },
            {
              label: response.results[10].name,
              // backgroundColor: "rgb(99,2,33",
              backgroundColor: colorPalette[5],
              data: [response.results[10].metacritic],
            },
            {
              label: response.results[5].name,
              // backgroundColor: "rgb(99,2,33",
              backgroundColor: colorPalette[6],
              data: [response.results[5].metacritic],
            },
          ],
        },
        responsive: true,
        //       options: {
        //         scales: {
        //           yAxes: [
        //             {
        //               type: myScale, // this is the same key that was passed to the registerScaleType function
        //             },
        //           ],
        //         },
        //       },
        //     });
        //     console.log(response);
        //   });
      });
      //gives 40 top games from page 1
    });
  };
  topsearch(1);
});

// Charts to make
// Allow user to make own chart (think genre vs. console vs. pc area chart)
// Allow user to cross reference platforms
// allow user to compare genre or game ratings!

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// {
//   label: "first dataset",
//   // backgroundColor: "rgb(0,99,120",
//   backgroundColor: colorPalette[1],
//   data: [response.results[0].metacritic],
// },
// {
//   label: "second dataset",
//   // backgroundColor: "rgb(99,2,33",
//   backgroundColor: colorPalette[2],
//   data: [response.results[1].metacritic],
// }

// for (let i=0; i<10; i++){
//   label: response.results[i].name,
//   backgroundColor: colorPalette[i],
//   data: [response.results[i].metacritic],
// }
// dynamic chart maker
// sort the results scores then render by largeness
response.results.forEach((item) => {});
// if (response.results[i].metacritic == null) {
//   makeGraph();
// }
