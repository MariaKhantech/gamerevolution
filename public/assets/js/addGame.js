
$(document).ready(function () {

    // Function that populates side menu with list of RAWG platform names and sets data-ids equal to the rawg id number for platform
    const populatePlatformList = () => {

        const platformUrl = `https://api.rawg.io/api/platforms`;

        $.get(platformUrl).then((response) => {
            // console.log(response.results);

            let platforms = response.results

            for (let i = 0; i < platforms.length; i++) {
                // console.log(platforms[i].name);

                const displayPlatformName = $("<button>").attr("type", "button").attr("data-id", platforms[i].id).attr("name", platforms[i].name).addClass("list-group-item list-group-item-action platform-item").text(platforms[i].name);

                $(".platform-list").append(displayPlatformName);
            }
        });

    }

    populatePlatformList();

    // on click of a platform name using the data-id, 
    // if the platform-title area (see <h3> tags on line 54 of addGame.html) is blank (null) it will set title text to the platform name the user selected and then render the game-grid based on the users selection.  If a user then tries to select that same platform name again, an alert modal will appear alerting the user that they have already selected that platform.

    // STILL WIP...how to refresh page on click of another platform title and only rendered those results in the game-gird.
    $(".platform-list").on("click", "button", function (event) {
        event.preventDefault();
        let platformId = $(this).data("id");
        let platformName = $(this).attr("name");
        let platformTitle = $(".platform-title")

        if (platformTitle.text() === "") {
            platformTitle.text(platformName);
            renderGameGrid(platformId)
        } else if (platformTitle.text() === platformName) {
            // alert(`you already have ${platformName} selected`);
            $('#alert-modal').modal('show');
            $('#modal-text').text(`You already have ${platformName} selected`);
        } else {
            renderGameGrid(platformId);
        }
    });




    // function to render highest-rated games to a card by platform a using RAWG API
    const renderGameGrid = (id) => {

        let gamesByPlatformURL = `https://rawg.io/api/games?platforms=${id}&page_size=50&ordering=-rating`;


        $.get(gamesByPlatformURL).then((response) => {
            console.log(response.results);

            const game = response.results;

            // for loop to dynamically create and display a) Card/Card components and b) game data we want displayed to each card
            for (let i = 0; i < game.length; i++) {

                // variable to create card
                const createCard = $("<div>").addClass("card d-inline-block mr-3 mt-3").attr("style", "width: 30%;");
                // append card to parent div (line 55 of addGame.html)
                $(".col-auto").append(createCard);

                // if game has no background image fill card image with a placekitten holder (not permanent just TEMPORARY)
                if (game[i].background_image === null) {
                    const cardImg = $("<img>").addClass("card-img-top").attr("alt", "game-image").attr("src", "https://placekitten.com/200/139");
                    createCard.append(cardImg);
                } else {
                    // else fill card image with the game's background-image  from API
                    const cardImg = $("<img>").addClass("img-thumbnail").attr("alt", "game-image").attr("src", game[i].background_image);
                    createCard.append(cardImg);
                }

                // variable to create card body div
                const cardBody = $("<div>").addClass("card-body m-auto");
                // append card body to parent .card div
                createCard.append(cardBody);

                // variable to display game title 
                const cardTitle = $("<h6>").addClass("card-title text-center").text(game[i].name);
                // append card title to card body
                cardBody.append(cardTitle);

                // if game year is null set card description (release year) to N/A and append to card body
                if (game[i].released === null) {
                    const cardDescription = $("<p>").addClass("card-text text-center").text(`Released: N/A`);
                    cardBody.append(cardDescription);
                } else {
                    // else set card description to game release year and append to card body
                    const gameYear = game[i].released.split("-");

                    const cardDescription = $("<p>").addClass("card-text text-center").text(`Released: ${gameYear[0]}`);

                    cardBody.append(cardDescription);
                }

                // variable to set RAWG rating to card body
                const rawgRating = $("<p>").addClass("card-text text-center").text(`RAWG Rating: ${game[i].rating}`);
                // append RAWG rating to card body
                cardBody.append(rawgRating);

                // variabel to create button that will add game to "favorites" library
                const addButton = $("<button>").addClass("btn btn-dark btn-sm btn-block").attr("id", "add-to-favorites-button").attr("type", "button").attr("data-id", game[i].id).attr("data-name", game[i].slug).text(`Add to Library`);
                // append button to card body
                cardBody.append(addButton);
            }


        });

    }

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
            unique_id: gameID
        }
        // post request to our sever to add new game to database
        $.ajax("/api/addgames", {
            type: "POST",
            data: newGame
        }).then((result) => {
            // console.log(result);
            $('#alert-modal').modal('show');
            $('#modal-text').text(`Game added to library`);

        }).catch((err) => {
            if (err) {
                throw (err);
            }
        });
    });
});