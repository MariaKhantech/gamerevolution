$(document).ready(function () {

    // Function that populates side menu with list of RAWG platform names and sets data-ids equal to the rawg id number for platform
    const populatePlatformList = () => {

        const platformUrl = `https://api.rawg.io/api/platforms`;

        $.get(platformUrl).then((response) => {
            // console.log(response.results);

            let platforms = response.results

            for (let i = 0; i < platforms.length; i++) {
                // console.log(platforms[i].name);


                const displayPlatformName = $("<a>", {
                    class: "dropdown-item platform-item",
                    type: "button",
                    "data-id": platforms[i].id,
                    name: platforms[i].name,
                    text: platforms[i].name

                })



                // const displayPlatformName = $("<button>").attr("type", "button").attr("data-id", platforms[i].id).attr("name", platforms[i].name).addClass("list-group-item list-group-item-action platform-item").text(platforms[i].name);

                $(".platform-list").append(displayPlatformName);
            }
        });

    }

    populatePlatformList();

    $(".platform-list").on('click', 'a', function () {
        $(".platform:first-child").text($(this).text());
        $(".platform:first-child").val($(this).data("id"));
        $(".platform:first-child").attr("name", $(this).text());
    });

    $(".order-list").on('click', 'a', function () {
        $(".order:first-child").text($(this).text());
        // $(".browse:first-child").val($(this).data("id"));
        $(".order:first-child").attr("name", $(this).text());
    });

    $('.search').on("click", "button", function (event) {
        event.preventDefault();

        let gameName = $("#searchInput").val().trim();

        // gameSlug = gameName.replace(/\s+/g, '-').toLowerCase();

        renderSingleGame(gameName);
    });

    // STILL WIP...how to refresh page on click of another platform title and only rendered those results in the game-gird.
    $("#browse-btn").on("click", function (event) {
        event.preventDefault();

        let platformId = $(".platform").val();
        // console.log(platformId);
        let platformName = $(".platform").attr("name");

        let yearInput = $("#yearInput").val().trim();
        // console.log(yearInput)
        let ordering = $(".order").attr("name").toLowerCase();
        // console.log(ordering)

        if (yearInput === "") {
            renderGameGridPlatOrder(platformId, ordering);
        } else if (platformId === "") {
            renderGameGridYearOrder(yearInput, ordering);
        }
        else {
            renderGameGridAll(platformId, yearInput, ordering);
        }

    });

    // function to render highest-rated games to a card by platform a using RAWG API
    const renderGameGridAll = (id, year, ordering) => {

        let gamesURL = `https://rawg.io/api/games?platforms=${id}&dates=${year}-01-01,${year}-12-31&ordering=-${ordering}&page_size=50`;

        // console.log(gamesByPlatformURL);
        $.get(gamesURL).then((response) => {
            console.log(response);

            if (response.count === 0) {
                $('#alert-modal').modal('show');
                $('#modal-text').text(`No results please try again`);
            } else {
                const game = response.results;

                // for loop to dynamically create and display a) Card/Card components and b) game data we want displayed to each card
                for (let i = 0; i < game.length; i++) {

                    // variable to create card
                    const createCard = $("<div>", {
                        class: "card d-inline-block mr-3 mt-3",
                        style: "width: 30%;"
                    });
                    // append card to parent div (line 55 of addGame.html)
                    $(".col-auto").append(createCard);

                    // if game has no background image fill card image with a placekitten holder (not permanent just TEMPORARY)
                    if (game[i].background_image === null) {
                        const cardImg = $("<img>", {
                            class: "card-img-top",
                            alt: "game-image",
                            src: "https://placekitten.com/200/139"
                        });
                        createCard.append(cardImg);
                    } else {
                        // else fill card image with the game's background-image  from API
                        const cardImg = $("<img>", {
                            class: "img-thumbnail",
                            alt: "game-image",
                            src: game[i].background_image
                        });
                        createCard.append(cardImg);
                    }

                    // variable to create card body div
                    const cardBody = $("<div>", {
                        class: "card-body m-auto"
                    });
                    // append card body to parent .card div
                    createCard.append(cardBody);

                    // variable to display game title 
                    const cardTitle = $("<h6>", {
                        class: "card-title text-center",
                        text: game[i].name
                    });
                    // append card title to card body
                    cardBody.append(cardTitle);

                    // if game year is null set card description (release year) to N/A and append to card body
                    if (game[i].released === null) {
                        const cardDescription = $("<p>", {
                            class: "card-text text-center",
                            text: `Released: N/A`
                        });
                        cardBody.append(cardDescription);
                    } else {
                        // else set card description to game release year and append to card body
                        const gameYear = game[i].released.split("-");

                        const cardDescription = $("<p>", {
                            class: "card-text text-center",
                            text: `Released: ${gameYear[0]}`
                        });
                        cardBody.append(cardDescription);
                    }

                    // variables to set RAWG rating to card body

                    const percentage = Math.round((game[i].rating / 5) * 100);

                    const rawgPercentage = $("<p>", {
                        class: "card-text text-center",
                        text: `Rating: ${percentage}%`
                    });

                    const rawgRating = $("<p>", {
                        class: "card-text text-center",
                    }).rateYo({
                        rating: game[i].rating,
                        readOnly: true
                    });

                    const userRatings = $("<p>", {
                        class: "card-text text-center",
                        text: `User Ratings: ${game[i].ratings_count}`
                    })

                    cardBody.append(rawgPercentage, rawgRating, userRatings);

                    // variable to create button that will add game to "favorites" library
                    const addButton = $("<button>", {
                        class: "btn btn-outline-secondary btn-sm btn-block text-white",
                        id: "add-to-favorites-button",
                        type: "button",
                        "data-type": game[i].id,
                        "data-name": game[i].slug,
                        "data-toggle": "popover",
                        "data-content": "Game added to library",
                        text: `Add to Library`
                    });

                    // append button to card body
                    cardBody.append(addButton);
                }
            }
        });
        // });
    }

    const renderGameGridPlatOrder = (id, ordering) => {
        let gamesURL = `https://rawg.io/api/games?platforms=${id}&ordering=-${ordering}`;

        $.get(gamesURL).then((response) => {
            // console.log(response);

            if (response.count === 0) {
                $('#alert-modal').modal('show');
                $('#modal-text').text(`No results please try again`);
            } else {

                const game = response.results;

                // for loop to dynamically create and display a) Card/Card components and b) game data we want displayed to each card
                for (let i = 0; i < game.length; i++) {

                    // variable to create card
                    const createCard = $("<div>", {
                        class: "card d-inline-block mr-3 mt-3",
                        style: "width: 30%;"
                    });
                    // append card to parent div (line 55 of addGame.html)
                    $(".col-auto").append(createCard);

                    // if game has no background image fill card image with a placekitten holder (not permanent just TEMPORARY)
                    if (game[i].background_image === null) {
                        const cardImg = $("<img>", {
                            class: "card-img-top",
                            alt: "game-image",
                            src: "https://placekitten.com/200/139"
                        });
                        createCard.append(cardImg);
                    } else {
                        // else fill card image with the game's background-image  from API
                        const cardImg = $("<img>", {
                            class: "img-thumbnail",
                            alt: "game-image",
                            src: game[i].background_image
                        });
                        createCard.append(cardImg);
                    }

                    // variable to create card body div
                    const cardBody = $("<div>", {
                        class: "card-body m-auto"
                    });
                    // append card body to parent .card div
                    createCard.append(cardBody);

                    // variable to display game title 
                    const cardTitle = $("<h6>", {
                        class: "card-title text-center",
                        text: game[i].name
                    });
                    // append card title to card body
                    cardBody.append(cardTitle);

                    // if game year is null set card description (release year) to N/A and append to card body
                    if (game[i].released === null) {
                        const cardDescription = $("<p>", {
                            class: "card-text text-center",
                            text: `Released: N/A`
                        });
                        cardBody.append(cardDescription);
                    } else {
                        // else set card description to game release year and append to card body
                        const gameYear = game[i].released.split("-");

                        const cardDescription = $("<p>", {
                            class: "card-text text-center",
                            text: `Released: ${gameYear[0]}`
                        });
                        cardBody.append(cardDescription);
                    }

                    // variables to set RAWG rating to card body

                    const percentage = Math.round((game[i].rating / 5) * 100);

                    const rawgPercentage = $("<p>", {
                        class: "card-text text-center",
                        text: `Rating: ${percentage}%`
                    });

                    const rawgRating = $("<p>", {
                        class: "card-text text-center",
                    }).rateYo({
                        rating: game[i].rating,
                        readOnly: true
                    });

                    const userRatings = $("<p>", {
                        class: "card-text text-center",
                        text: `User Ratings: ${game[i].ratings_count}`
                    })

                    cardBody.append(rawgPercentage, rawgRating, userRatings);

                    // variable to create button that will add game to "favorites" library
                    const addButton = $("<button>", {
                        class: "btn btn-outline-secondary btn-sm btn-block text-white",
                        id: "add-to-favorites-button",
                        type: "button",
                        "data-type": game[i].id,
                        "data-name": game[i].slug,
                        "data-toggle": "popover",
                        "data-content": "Game added to library",
                        text: `Add to Library`
                    });

                    // append button to card body
                    cardBody.append(addButton);
                }
            }
        });
    }

    const renderGameGridYearOrder = (year, ordering) => {
        let gamesURL = `https://rawg.io/api/games?dates=${year}-01-01,${year}-12-31&ordering=-${ordering}`;

        $.get(gamesURL).then((response) => {
            // console.log(response);

            if (response.count === 0) {
                $('#alert-modal').modal('show');
                $('#modal-text').text(`No results please try again`);
            } else {

                const game = response.results;

                // for loop to dynamically create and display a) Card/Card components and b) game data we want displayed to each card
                for (let i = 0; i < game.length; i++) {

                    // variable to create card
                    const createCard = $("<div>", {
                        class: "card d-inline-block mr-3 mt-3",
                        style: "width: 30%;"
                    });
                    // append card to parent div (line 55 of addGame.html)
                    $(".col-auto").append(createCard);

                    // if game has no background image fill card image with a placekitten holder (not permanent just TEMPORARY)
                    if (game[i].background_image === null) {
                        const cardImg = $("<img>", {
                            class: "card-img-top",
                            alt: "game-image",
                            src: "https://placekitten.com/200/139"
                        });
                        createCard.append(cardImg);
                    } else {
                        // else fill card image with the game's background-image  from API
                        const cardImg = $("<img>", {
                            class: "img-thumbnail",
                            alt: "game-image",
                            src: game[i].background_image
                        });
                        createCard.append(cardImg);
                    }

                    // variable to create card body div
                    const cardBody = $("<div>", {
                        class: "card-body m-auto"
                    });
                    // append card body to parent .card div
                    createCard.append(cardBody);

                    // variable to display game title 
                    const cardTitle = $("<h6>", {
                        class: "card-title text-center",
                        text: game[i].name
                    });
                    // append card title to card body
                    cardBody.append(cardTitle);

                    // if game year is null set card description (release year) to N/A and append to card body
                    if (game[i].released === null) {
                        const cardDescription = $("<p>", {
                            class: "card-text text-center",
                            text: `Released: N/A`
                        });
                        cardBody.append(cardDescription);
                    } else {
                        // else set card description to game release year and append to card body
                        const gameYear = game[i].released.split("-");

                        const cardDescription = $("<p>", {
                            class: "card-text text-center",
                            text: `Released: ${gameYear[0]}`
                        });
                        cardBody.append(cardDescription);
                    }

                    // variables to set RAWG rating to card body

                    const percentage = Math.round((game[i].rating / 5) * 100);

                    const rawgPercentage = $("<p>", {
                        class: "card-text text-center",
                        text: `Rating: ${percentage}%`
                    });

                    const rawgRating = $("<p>", {
                        class: "card-text text-center",
                    }).rateYo({
                        rating: game[i].rating,
                        readOnly: true
                    });

                    const userRatings = $("<p>", {
                        class: "card-text text-center",
                        text: `User Ratings: ${game[i].ratings_count}`
                    })

                    cardBody.append(rawgPercentage, rawgRating, userRatings);

                    // variable to create button that will add game to "favorites" library
                    const addButton = $("<button>", {
                        class: "btn btn-outline-secondary btn-sm btn-block text-white",
                        id: "add-to-favorites-button",
                        type: "button",
                        "data-type": game[i].id,
                        "data-name": game[i].slug,
                        "data-toggle": "popover",
                        "data-content": "Game added to library",
                        text: `Add to Library`
                    });

                    // append button to card body
                    cardBody.append(addButton);
                }
            }
        });
    }


    const renderSingleGame = (searchInput) => {
        let searchURL = `https://rawg.io/api/games?search=${searchInput}`


        $.get(searchURL).then((response) => {
            console.log(response)

            if (response.count === 0) {
                $('#alert-modal').modal('show');
                $('#modal-text').text(`No results please try again`);
            } else {

                const searchResponse = response.results;
                // variable to create card

                let slugURL = `https://rawg.io/api/games/${searchResponse[0].slug}`

                $.get(slugURL).then((response) => {

                    let slugResponse = response;

                    const createCard = $("<div>", {
                        class: "card text-center",
                    });
                    // append card to parent div (line 55 of addGame.html)
                    $(".col-auto").append(createCard);


                    const cardImg = $("<img>", {
                        class: "card-img-top",
                        alt: "game-image",
                        src: slugResponse.background_image
                    });
                    createCard.append(cardImg);

                    const cardBody = $("<div>", {
                        class: "card-body",
                    })
                    createCard.append(cardBody);

                    const cardTitle = $("<h5>", {
                        class: "card-title text-white",
                        text: slugResponse.name
                    });
                    cardBody.append(cardTitle);

                    const rating = $("<p>", {
                        class: "card-text text-center",
                    }).rateYo({
                        rating: slugResponse.rating,
                        readOnly: true
                    });

                    cardBody.append(rating);

                    const cardDescription = $("<p>", {
                        class: "card-text",
                        text: slugResponse.description_raw
                    });

                    cardBody.append(cardDescription);

                    const gameYear = slugResponse.released.split("-");


                    const cardFooter = $("<div>", {
                        class: "card-footer",
                        text: gameYear[0]

                    });

                    cardBody.append(cardFooter);



                });
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
            $(this).popover('show');
            setTimeout(() => {
                $(this).popover('hide');
            }, 600);

        }).catch((err) => {
            if (err) {
                throw (err);
            }
        });
    });
});


