$(document).ready(function () {
  ////////////////////////////////////////////////////////////////initialize charts so we can use chart functions outside of response
  let chart = new Chart(ctx, {
    type: "bar",
  });
  // initialize popovers
  $('[data-toggle="popover"]').popover();

  // Function that populates side menu with list of RAWG platform names and sets data-ids equal to the rawg id number for platform
  const populatePlatformList = () => {
    const platformUrl = `https://api.rawg.io/api/platforms`;

    $.get(platformUrl).then((response) => {
      // console.log(response.results);

      let platforms = response.results;

      for (let i = 0; i < platforms.length; i++) {
        // console.log(platforms[i].name);

        const displayPlatformName = $("<button>")
          .attr("type", "button")
          .attr("data-id", platforms[i].id)
          .attr("name", platforms[i].name)
          .addClass("list-group-item list-group-item-action platform-item")
          .text(platforms[i].name);

        $(".platform-list").append(displayPlatformName);
      }
    });
  };

  populatePlatformList();

  // on click of a platform name using the data-id,
  // if the platform-title area (see <h3> tags on line 54 of addGame.html) is blank (null) it will set title text to the platform name the user selected and then render the game-grid based on the users selection.  If a user then tries to select that same platform name again, an alert modal will appear alerting the user that they have already selected that platform.

  // STILL WIP...how to refresh page on click of another platform title and only rendered those results in the game-gird.
  $(".platform-list").on("click", "button", function (event) {
    event.preventDefault();
    // clear chart
    // chart.destroy();

    let platformId = $(this).data("id");
    let platformName = $(this).attr("name");
    let platformTitle = $(".platform-title");

    if (platformTitle.text() === "") {
      platformTitle.text(platformName);
      renderGameGrid(platformId);
    } else if (platformTitle.text() === platformName) {
      // alert(`you already have ${platformName} selected`);
      $("#alert-modal").modal("show");
      $("#modal-text").text(`You already have ${platformName} selected`);
    } else {
      renderGameGrid(platformId);
    }
    /////////////////////////////////////////////////////////////////// update chart on click

    function chartTitle() {
      title.pop();
      title.push(platformName);
    }
    chartTitle();
    ////////////////////////clear chart on click
    // console.log(title);
  });

  $(".search").on("click", "button", function (event) {
    event.preventDefault();

    let gameName = $("#searchInput").val().trim();

    gameSlug = gameName.replace(/\s+/g, "-").toLowerCase();

    console.log(gameSlug);
  });

  // function to render highest-rated games to a card by platform a using RAWG API
  const renderGameGrid = (id) => {
    let gamesByPlatformURL = `https://rawg.io/api/games?platforms=${id}&page_size=50&ordering=-added`;

    $.get(gamesByPlatformURL).then((response) => {
      console.log(response.results);

      const game = response.results;

      // for loop to dynamically create and display a) Card/Card components and b) game data we want displayed to each card
      for (let i = 0; i < game.length; i++) {
        // variable to create card
        const createCard = $("<div>", {
          class: "card d-inline-block mr-3 mt-3",
          style: "width: 30%;",
        });
        // append card to parent div (line 55 of addGame.html)
        $(".col-auto").append(createCard);

        // if game has no background image fill card image with a placekitten holder (not permanent just TEMPORARY)
        if (game[i].background_image === null) {
          const cardImg = $("<img>", {
            class: "card-img-top",
            alt: "game-image",
            src: "https://placekitten.com/200/139",
          });
          createCard.append(cardImg);
        } else {
          // else fill card image with the game's background-image  from API
          const cardImg = $("<img>", {
            class: "img-thumbnail",
            alt: "game-image",
            src: game[i].background_image,
          });
          createCard.append(cardImg);
        }

        // variable to create card body div
        const cardBody = $("<div>", {
          class: "card-body m-auto",
        });
        // append card body to parent .card div
        createCard.append(cardBody);

        // variable to display game title
        const cardTitle = $("<h6>", {
          class: "card-title text-center",
          text: game[i].name,
        });
        // append card title to card body
        cardBody.append(cardTitle);

        // if game year is null set card description (release year) to N/A and append to card body
        if (game[i].released === null) {
          const cardDescription = $("<p>", {
            class: "card-text text-center",
            text: `Released: N/A`,
          });
          cardBody.append(cardDescription);
        } else {
          // else set card description to game release year and append to card body
          const gameYear = game[i].released.split("-");

          const cardDescription = $("<p>", {
            class: "card-text text-center",
            text: `Released: ${gameYear[0]}`,
          });
          cardBody.append(cardDescription);
        }

        // variables to set RAWG rating to card body

        const percentage = Math.round((game[i].rating / 5) * 100);

        const rawgPercentage = $("<p>", {
          class: "card-text text-center",
          text: `Rating: ${percentage}%`,
        });

        const rawgRating = $("<p>", {
          class: "card-text text-center",
        }).rateYo({
          rating: game[i].rating,
          readOnly: true,
        });

        const userRatings = $("<p>", {
          class: "card-text text-center",
          text: `User Ratings: ${game[i].ratings_count}`,
        });

        cardBody.append(rawgPercentage, rawgRating, userRatings);

        // variable to create button that will add game to "favorites" library
        const addButton = $("<button>", {
          class: "btn btn-dark btn-sm btn-block",
          id: "add-to-favorites-button",
          type: "button",
          "data-type": game[i].id,
          "data-name": game[i].slug,
          "data-toggle": "popover",
          "data-content": "Game added to library",
          text: `Add to Library`,
        });

        // append button to card body
        cardBody.append(addButton);

        ////////////////////////////////////////////////make popover
        const popover = $("<button>", {
          class: "btn btn-lg btn-primary",
          "data-toggle": "popover",
          "data-placement": "bottom",
          id: `${response.results[i].id}`,
          text: "Must Play or Skip?",
          trigger: "hover",
          "data-content": "working!",
        });
        cardBody.append(popover);
      }
      ////////////////////////////////////////////////////////////////////////////////get info for new chart
      //TODO: clear chart when running
      //TODO: update legend
      //TODO: get card on hover
      //TODO: allow changing chart type
      //TODO: allow addition of other data sets
      //TODO: switch color palette
      //TODO: make pie data for how many people loved/hated the game for individual game
      // makes main chart
      let chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            response.results[0].name,
            response.results[1].name,
            response.results[2].name,
            response.results[3].name,
            response.results[4].name,
            response.results[5].name,
          ],
          datasets: [
            {
              data: [
                response.results[0].metacritic,
                response.results[1].metacritic,
                response.results[2].metacritic,
                response.results[3].metacritic,
                response.results[4].metacritic,
                response.results[5].metacritic,
              ],
              backgroundColor: colorPalette,
            },
          ],
        },
        options: {
          title: {
            display: true,
            position: "top",
            text: `Top ${title} Games in 2020`,
          },
        },
      });
      // TODO: make DONUT and LINE charts
      // donut chart
      let doughnutChart = new Chart(doughnutCTX, {
        type: "doughnut",
        data: {
          labels: [
            response.results[0].name,
            response.results[1].name,
            response.results[2].name,
            response.results[3].name,
            response.results[4].name,
            response.results[5].name,
          ],
          datasets: [
            {
              data: [
                response.results[0].metacritic,
                response.results[1].metacritic,
                response.results[2].metacritic,
                response.results[3].metacritic,
                response.results[4].metacritic,
                response.results[5].metacritic,
              ],
              backgroundColor: colorPalette,
            },
          ],
        },
        options: {
          title: {
            display: true,
            position: "top",
            text: `Top ${title} Games in 2020`,
          },
        },
      });
      // line chart
      let lineChart = new Chart(lineCTX, {
        type: "line",
        data: {
          labels: [
            response.results[0].name,
            response.results[1].name,
            response.results[2].name,
            response.results[3].name,
            response.results[4].name,
            response.results[5].name,
          ],
          datasets: [
            {
              data: [
                response.results[0].metacritic,
                response.results[1].metacritic,
                response.results[2].metacritic,
                response.results[3].metacritic,
                response.results[4].metacritic,
                response.results[5].metacritic,
              ],
              backgroundColor: colorPalette,
            },
          ],
        },
        options: {
          title: {
            display: true,
            position: "top",
            text: `Top ${title} Games in 2020`,
          },
        },
      });
    });
  };

  const renderSearchResult = (gameSlug) => {};
  // On click of "add to library" button to post game slug (which will be later retrieved in the user favorites section to make rawg api call to display games they have added)
  $(".col-auto").on("click", "button", function (event) {
    event.preventDefault();

    // variable that sets the slug to as data-name
    let gameSelect = $(this).data("name");
    // variable that sets the unique game id as the data-id
    let gameID = $(this).data("id");

    // console.log(`${gameSelect} & ${gameID}`);

    // sets game slug and unique game id as game_name and unique_id in database
    const newGame = {
      game_name: gameSelect,
      unique_id: gameID,
    };
    // post request to our sever to add new game to database
    $.ajax("/api/addgames", {
      type: "POST",
      data: newGame,
    })
      .then((result) => {
        // console.log(result);
        $(this).popover("show");
        setTimeout(() => {
          $(this).popover("hide");
        }, 600);
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  });
});

////////////////////////////////////////////////////////////////////////////////////////// top chart logic
const ctx = document.getElementById("topChart").getContext("2d");
const doughnutCTX = document.getElementById("doughnutChart").getContext("2d");
const lineCTX = document.getElementById("lineChart").getContext("2d");

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
// let newData1 = [53, 52, 18, 68, 50, 38, 73];
// let oldData = [0, 1, 10, 43, 23, 88, 23];
// let newData = [10, 14, 18, 43, 21, 38, 63];
// let oldData1 = [99, 80, 60, 66, 63, 18, 23];
title = [];
function updateChart() {
  chart.reset();
  chart.update();
  chart.data.datasets[0].data = newData;
  chart.data.datasets[1].data = newData1;
}

// let clearCharts = () => {
//     $("#topChart").remove();
//     $("#topChartCard").append($("<canvas>", { id: "topChart" }));
//   };
//   clearCharts();

// popover chart
// $('[data-toggle="popover"]').popover({
//     html: true,
//     content: '<canvas id="myChart" width="400" height="400"></canvas>',
//   }).on('shown.bs.popover', function() {

//     new Chart($('#myChart'), {
//       // The type of chart we want to create
//       type: 'line',

//       // The data for our dataset
//       data: {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [{
//           label: "My First dataset",
//           backgroundColor: 'rgb(255, 99, 132)',
//           borderColor: 'rgb(255, 99, 132)',
//           data: [0, 10, 5, 2, 20, 30, 45],
//         }]
//       },

//       // Configuration options go here
//       options: {}
//     });
//////////////////////////////// popover js
