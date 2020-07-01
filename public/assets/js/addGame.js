


$(document).ready(function () {


    const populatePlatformList = () => {

        const platformUrl = `https://api.rawg.io/api/platforms`;

        $.get(platformUrl).then((response) => {
            // console.log(response.results);

            let platforms = response.results

            for (let i = 0; i < platforms.length; i++) {
                // console.log(platforms[i].name);

                const displayPlatformName = $("<button>").attr("type", "button").attr("data-id", platforms[i].id).addClass("list-group-item list-group-item-action platform-item").text(platforms[i].name);




                $(".platform-list").append(displayPlatformName);
            }
        });

    }



    populatePlatformList();




    $(".platform-list").on("click", function (event) {
        event.preventDefault();

        let platformId = $(".platform-item").data("id");

        console.log(platformId);

        let gamesByPlatformURL = `https://rawg.io/api/games?platforms=${platformId}&platforms_count=1&page_size=50&ordering=-rating`;

        $.get(gamesByPlatformURL).then((response) => {
            console.log(response.results);

            const game = response.results;


            for (let i = 0; i < game.length; i++) {


                const createCard = $("<div>").addClass("card d-inline-block").attr("style", "width: 12rem;");
                $(".col-auto").append(createCard);

                if (game[i].background_image === null) {
                    const cardImg = $("<img>").addClass("card-img-top").attr("alt", "game-image").attr("src", "https://placekitten.com/200/139");
                    createCard.append(cardImg);
                } else {
                    const cardImg = $("<img>").addClass("card-img-top").attr("alt", "game-image").attr("src", game[i].background_image);
                    createCard.append(cardImg);
                }

                const cardBody = $("<div>").addClass("card-body m-auto");
                createCard.append(cardBody);

                const cardTitle = $("<h6>").addClass("card-title text-center").text(game[i].name);
                cardBody.append(cardTitle);

                if (game[i].released === null) {
                    const cardDescription = $("<p>").addClass("card-text text-center").text(`Released: N/A`);
                    cardBody.append(cardDescription);
                } else {
                    const gameYear = game[i].released.split("-");

                    const cardDescription = $("<p>").addClass("card-text text-center").text(`Released: ${gameYear[0]}`);

                    cardBody.append(cardDescription);
                }

                const rawgRating = $("<p>").addClass("card-text text-center").text(`RAWG Rating: ${game[i].rating}`);
                cardBody.append(rawgRating);

                const addButton = $("<button>").addClass("btn btn-dark btn-sm btn-block").attr("id", "add-to-favorites-button").text(`Add to Library`);
                cardBody.append(addButton);


            }


        });


    });


});