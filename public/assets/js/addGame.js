// const { json } = require("express");

$(document).ready(function() {
	// ////////////////////////////////////////////////////////////////initialize charts so we can use chart functions outside of response
	// set default chart variables
	// Chart.defaults.global.defaultFontColor = "white";
	//initialize toggle
	$('#toggle-demo').bootstrapToggle();

	// let chart = new Chart(ctx, {
	//   type: "bar",
	// });
	// initialize popovers
	let ctx = document.getElementById('topChart').getContext('2d');
	const doughnutCTX = document.getElementById('doughnutChart').getContext('2d');
	const lineCTX = document.getElementById('lineChart').getContext('2d');
	let chart = createChart(ctx, 'bar');
	let doughnutChart = createChart(doughnutCTX, 'doughnut');
	let lineChart = createChart(lineCTX, 'line');
	$('[data-toggle="popover"]').popover();

	//Function to populate "Select Platforms" dropdown
	const populatePlatformList = () => {
		const platformUrl = `https://api.rawg.io/api/platforms`;

		$.get(platformUrl).then((response) => {
			let platforms = response.results;

			for (let i = 0; i < platforms.length; i++) {
				const displayPlatformName = $('<a>', {
					class: 'dropdown-item platform-item',
					type: 'button',
					'data-id': platforms[i].id,
					name: platforms[i].name,
					text: platforms[i].name
				});

				$('.platform-list').append(displayPlatformName);
			}
		});
	};

	populatePlatformList();

	// On-click of platform option sets dropdown text, name-attribute, and value to the platform name & id
	$('.platform-list').on('click', 'a', function() {
		$('.platform:first-child').text($(this).text());
		$('.platform:first-child').val($(this).data('id'));
		$('.platform:first-child').attr('name', $(this).text());
	});

	// On-click of ordering option sets dropdown text and name-attribute to selected ordering option
	$('.order-list').on('click', 'a', function() {
		$('.order:first-child').text($(this).text());
		$('.order:first-child').attr('name', $(this).text());
	});

	//////////////////////////////////////////////////////////// single game search button
	$('#search-button').on('click', function(event) {
		event.preventDefault();

		$('#game-area').html('');

		$('#chart-button').show();
		$('#chart-button').prop('disabled', false);

		let gameName = $('#searchInput').val().trim();

		if (gameName === '') {
			$('#alert-modal').modal('show');
			$('#modal-text').text(`Please enter a valid game title!`);
		} else {
			renderSingleGame(gameName);
			///////////////////////////////////////////// render single chart here
			renderSingleChart(gameName);
		}
	});

	// Multiple game search on-click
	$('#browse-btn').on('click', function(event) {
		event.preventDefault();

		$('#game-area').html('');

		$('#chart-button').show();
		$('#chart-button').prop('disabled', false);

		let platformId = $('.platform').val();

		function renderChartID() {
			chartID.pop();
			chartID.push(platformId);
		}

		renderChartID();

		let platformName = $('.platform').attr('name');

		let yearInput = $('#yearInput').val().trim();

		let ordering = $('.order').attr('name').toLowerCase();

		function chartTitle() {
			title.pop();
			title.push(platformName);
		}
		chartTitle();

		if (yearInput === '') {
			renderGameGridPlatOrder(platformId, ordering);
		} else if (platformId === '') {
			renderGameGridYearOrder(yearInput, ordering);
		} else {
			renderGameGridAll(platformId, yearInput, ordering);
		}
	});

	// Render Game Grid ALL options have input
	const renderGameGridAll = (id, year, ordering) => {
		let gamesURL = `https://rawg.io/api/games?platforms=${id}&dates=${year}-01-01,${year}-12-31&ordering=-${ordering}&page_size=50`;

		$.get(gamesURL).then((response) => {
			renderCharts();

			if (response.count === 0) {
				$('#alert-modal').modal('show');
				$('#modal-text').text(`No results please try again`);
			} else {
				const game = response.results;

				for (let i = 0; i < game.length; i++) {
					const createCard = $('<div>', {
						class: 'card',
						id: 'multi-card',
						style: 'width: auto; max-width: 19rem;'
					});

					$('#game-area').append(createCard);

					if (game[i].clip === null) {
						const cardImg = $('<img>', {
							class: 'img-thumbnail',
							alt: 'game-image',
							src: game[i].background_image
						});
						createCard.append(cardImg);
					} else if (game[i].background_image === null) {
						const cardImg = $('<img>', {
							class: 'img-thumbnail',
							alt: 'game-image',
							src: 'https://placekitten.com/200/139'
						});
						createCard.append(cardImg);
					} else {
						const cardVid = $('<video>', {
							class: 'img-thumbnail',
							type: 'video/mp4',
							controls: 'controls',
							alt: 'game-image',
							src: game[i].clip.clip
						});
						createCard.append(cardVid);
					}

					const cardBody = $('<div>', {
						class: 'card-body m-auto'
					});
					createCard.append(cardBody);

					const cardTitle = $('<h6>', {
						class: 'card-title text-center',
						text: game[i].name
					});
					cardBody.append(cardTitle);

					if (game[i].released === null) {
						const cardDescription = $('<p>', {
							class: 'card-text text-center',
							text: `Released: N/A`
						});
						cardBody.append(cardDescription);
					} else {
						const gameYear = game[i].released.split('-');

						const cardDescription = $('<p>', {
							class: 'card-text text-center',
							text: `Released: ${gameYear[0]}`
						});
						cardBody.append(cardDescription);
					}

					const percentage = Math.round(game[i].rating / 5 * 100);

					const rawgPercentage = $('<p>', {
						class: 'card-text text-center',
						text: `Rating: ${percentage}%`
					});

					const rawgRating = $('<p>', {
						class: 'card-text text-center mx-auto'
					}).rateYo({
						rating: game[i].rating,
						readOnly: true,
						starWidth: '25px'
					});

					const userRatings = $('<p>', {
						class: 'card-text text-center',
						text: `User Ratings: ${game[i].ratings_count}`
					});

					cardBody.append(rawgPercentage, rawgRating, userRatings);

					const addButton = $('<button>', {
						class: 'btn btn-outline-secondary btn-block text-white',
						id: 'add-to-favorites-button',
						type: 'button',
						'data-type': game[i].id,
						'data-name': game[i].slug,
						'data-toggle': 'popover',
						'data-content': 'Game added to library',
						text: `Add to Library`
					});
					cardBody.append(addButton);
				}
			}
		});
	};

	const renderGameGridPlatOrder = (id, ordering) => {
		let gamesURL = `https://rawg.io/api/games?platforms=${id}&ordering=-${ordering}`;

		$.get(gamesURL).then((response) => {
			renderCharts();

			if (response.count === 0) {
				$('#alert-modal').modal('show');
				$('#modal-text').text(`No results please try again`);
			} else {
				const game = response.results;

				for (let i = 0; i < game.length; i++) {
					const createCard = $('<div>', {
						class: 'card ',
						id: 'multi-card',
						style: 'width: auto; max-width: 19rem;'
					});

					$('#game-area').append(createCard);

					if (game[i].clip === null) {
						const cardImg = $('<img>', {
							class: 'img-thumbnail',
							alt: 'game-image',
							src: game[i].background_image
						});
						createCard.append(cardImg);
					} else if (game[i].background_image === null) {
						const cardImg = $('<img>', {
							class: 'img-thumbnail',
							alt: 'game-image',
							src: 'https://placekitten.com/200/139'
						});
						createCard.append(cardImg);
					} else {
						const cardVid = $('<video>', {
							class: 'img-thumbnail',
							type: 'video/mp4',
							controls: 'controls',
							alt: 'game-image',
							src: game[i].clip.clip
						});
						createCard.append(cardVid);
					}

					const cardBody = $('<div>', {
						class: 'card-body m-auto'
					});
					createCard.append(cardBody);

					const cardTitle = $('<h6>', {
						class: 'card-title text-center',
						text: game[i].name
					});
					cardBody.append(cardTitle);

					if (game[i].released === null) {
						const cardDescription = $('<p>', {
							class: 'card-text text-center',
							text: `Released: N/A`
						});
						cardBody.append(cardDescription);
					} else {
						const gameYear = game[i].released.split('-');

						const cardDescription = $('<p>', {
							class: 'card-text text-center',
							text: `Released: ${gameYear[0]}`
						});
						cardBody.append(cardDescription);
					}

					const percentage = Math.round(game[i].rating / 5 * 100);

					const rawgPercentage = $('<p>', {
						class: 'card-text text-center',
						text: `Rating: ${percentage}%`
					});

					const rawgRating = $('<p>', {
						class: 'card-text text-center mx-auto'
					}).rateYo({
						rating: game[i].rating,
						readOnly: true,
						starWidth: '25px'
					});

					const userRatings = $('<p>', {
						class: 'card-text text-center',
						text: `User Ratings: ${game[i].ratings_count}`
					});

					cardBody.append(rawgPercentage, rawgRating, userRatings);

					const addButton = $('<button>', {
						class: 'btn btn-outline-secondary btn-block text-white',
						id: 'add-to-favorites-button',
						type: 'button',
						'data-type': game[i].id,
						'data-name': game[i].slug,
						'data-toggle': 'popover',
						'data-content': 'Game added to library',
						text: `Add to Library`
					});
					cardBody.append(addButton);
				}
			}
		});
	};

	const renderGameGridYearOrder = (year, ordering) => {
		let gamesURL = `https://rawg.io/api/games?dates=${year}-01-01,${year}-12-31&ordering=-${ordering}`;

		$.get(gamesURL).then((response) => {
			renderCharts();

			if (response.count === 0) {
				$('#alert-modal').modal('show');
				$('#modal-text').text(`No results please try again`);
			} else {
				const game = response.results;

				for (let i = 0; i < game.length; i++) {
					const createCard = $('<div>', {
						class: 'card ',
						id: 'multi-card',
						style: 'width: auto; max-width: 19rem;'
					});

					$('#game-area').append(createCard);

					if (game[i].clip === null) {
						const cardImg = $('<img>', {
							class: 'img-thumbnail',
							alt: 'game-image',
							src: game[i].background_image
						});

						createCard.append(cardImg);
					} else if (game[i].background_image === null) {
						const cardImg = $('<img>', {
							class: 'img-thumbnail',
							alt: 'game-image',
							src: 'https://placekitten.com/200/139'
						});

						createCard.append(cardImg);
					} else {
						const cardVid = $('<video>', {
							class: 'img-thumbnail',
							type: 'video/mp4',
							controls: 'controls',
							alt: 'game-image',
							src: game[i].clip.clip
						});

						createCard.append(cardVid);
					}
					const cardBody = $('<div>', {
						class: 'card-body m-auto'
					});

					createCard.append(cardBody);

					const cardTitle = $('<h6>', {
						class: 'card-title text-center',
						text: game[i].name
					});

					cardBody.append(cardTitle);

					if (game[i].released === null) {
						const cardDescription = $('<p>', {
							class: 'card-text text-center',
							text: `Released: N/A`
						});

						cardBody.append(cardDescription);
					} else {
						const gameYear = game[i].released.split('-');

						const cardDescription = $('<p>', {
							class: 'card-text text-center',

							text: `Released: ${gameYear[0]}`
						});

						cardBody.append(cardDescription);
					}

					const percentage = Math.round(game[i].rating / 5 * 100);

					const rawgPercentage = $('<p>', {
						class: 'card-text text-center',
						text: `Rating: ${percentage}%`
					});

					const rawgRating = $('<p>', {
						class: 'card-text text-center mx-auto'
					}).rateYo({
						rating: game[i].rating,
						readOnly: true,

						starWidth: '25px'
					});

					const userRatings = $('<p>', {
						class: 'card-text text-center',
						text: `User Ratings: ${game[i].ratings_count}`
					});

					cardBody.append(rawgPercentage, rawgRating, userRatings);

					const addButton = $('<button>', {
						class: 'btn btn-outline-secondary btn-block text-white',
						id: 'add-to-favorites-button',
						type: 'button',
						'data-type': game[i].id,
						'data-name': game[i].slug,
						'data-toggle': 'popover',
						'data-content': 'Game added to library',
						text: `Add to Library`
					});
					cardBody.append(addButton);
				}
			}
		});
	};

	const renderSingleGame = (searchInput) => {
		let searchURL = `https://rawg.io/api/games?search=${searchInput}`;

		$.get(searchURL).then((response) => {
			if (response.count === 0) {
				$('#alert-modal').modal('show');
				$('#modal-text').text(`No results please try again`);
			} else {
				let searchResponse = response.results;
				let slugURL = `https://rawg.io/api/games/${searchResponse[0].slug}`;

				$.get(slugURL).then((response) => {
					let slugResponse = response;

					const createCard = $('<div>', {
						class: 'card text-center ',
						id: 'single-card',
						style: 'width: auto; max-width: 600px;'
					});

					$('#game-area').append(createCard);

					if (slugResponse.clip === null) {
						const cardImg = $('<img>', {
							class: 'card-img-top',
							alt: 'game-image',
							src: slugResponse.background_image
						});
						createCard.append(cardImg);
					} else {
						const cardVid = $('<video>', {
							class: 'card-img-top',
							type: 'video/mp4',
							controls: 'controls',
							alt: 'game-image',
							src: slugResponse.clip.clip
						});
						createCard.append(cardVid);
					}

					const cardBody = $('<div>', {
						class: 'card-body'
					});
					createCard.append(cardBody);

					const cardTitle = $('<h5>', {
						class: 'card-title text-white',
						text: slugResponse.name
					});
					cardBody.append(cardTitle);

					const rating = $('<p>', {
						class: 'card-text text-center mx-auto'
					}).rateYo({
						rating: slugResponse.rating,
						readOnly: true,
						starWidth: '25px'
					});

					cardBody.append(rating);

					const cardDescription = $('<p>', {
						class: 'card-text',
						text: slugResponse.description_raw
					});

					cardBody.append(cardDescription);

					const addButton = $('<button>', {
						class: 'btn btn-outline-secondary btn-block text-white',
						id: 'add-to-favorites-button',
						type: 'button',
						'data-type': slugResponse.id,
						'data-name': slugResponse.slug,
						'data-toggle': 'popover',
						'data-content': 'Game added to library',
						text: `Add to Library`
					});

					cardBody.append(addButton);

					const gameYear = slugResponse.released.split('-');

					const cardFooter = $('<div>', {
						class: 'card-footer',
						text: `Released: ${gameYear[0]}`
					});

					cardBody.append(cardFooter);
				});
			}
		});
	};

	$('#game-area').on('click', 'button', function(event) {
		event.preventDefault();

		let gameSelect = $(this).data('name');
		let gameID = $(this).data('type');

		const newGame = {
			game_name: gameSelect,
			unique_id: gameID
		};

		$.ajax('/api/addgames', {
			type: 'POST',
			data: newGame
		})
			.then((result) => {
				$(this).popover('show');
				setTimeout(() => {
					$(this).popover('hide');
				}, 600);
			})
			.catch((err) => {
				if (err) {
					throw err;
				}
			});
	});

	//toggle nav bar link if the user is logged in
	$.get('/api/user-data', () => {}).then((result) => {
		if (result.userId) {
			$('#myprofilelink').removeClass('d-none');
			$('#signOut').parent().removeClass('d-none');
			$('#loginBtn').addClass('d-none');
		}
	});

	//handle sign out btn
	$('#signOut').on('click', function() {
		$.get('/api/logout', (data) => {
			window.location.replace('/');
		});
	});

	// let clearCharts = () => {
	//   $("#topChart").remove();
	//   $("#topChartCard").append($("<canvas>", { id: "topChart" }));
	// };

	// clearCharts();

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
	//   ////////////////////////////////////////////////////////////////////////////////get info for new chart
	//   //TODO: clear chart when running
	//   //TODO: update legend
	//   //TODO: get card on hover
	//   //TODO: allow changing chart type
	//   //TODO: allow addition of other data sets
	//   //TODO: switch color palette
	// TODO: make doughnut and line chart make sense
	// TODO: on hover love it or hate it
	//   // makes main chart
	let chartID = [];
	function renderCharts() {
		// chart.update();
		// lineChart.update();
		// doughnutChart.update();
		// enable tabs
		$('#doughnut-tab').prop('disabled', false);
		$('#line-tab').prop('disabled', false);
		id = chartID;
		$.get(`https://rawg.io/api/games?platforms=${id}&page_size=50&ordering=-added`).then((response) => {
			console.log(response);
			let chart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: [
						response.results[0].name,
						response.results[1].name,
						response.results[2].name,
						response.results[3].name,
						response.results[4].name,
						response.results[5].name
					],
					datasets: [
						{
							data: [
								response.results[0].metacritic,
								response.results[1].metacritic,
								response.results[2].metacritic,
								response.results[3].metacritic,
								response.results[4].metacritic,
								response.results[5].metacritic
							],
							// fillColor: "rgba(220, 220, 220, .5)",
							// fill: true,
							// backgroundColor: colorPaletteRGBTransparent,
							fill: true,
							backgroundColor: colorPaletteRGBTransparent,
							borderColor: colorPaletteRGBOpaque
						}
					]
				},
				options: {
					legend: {
						display: false
					},
					// fillColor: "rgba(220,220,220,0)",
					defaultFontColor: 'white',
					title: {
						display: true,
						position: 'top',
						text: `Top ${title} Games in 2020`
					},
					responsive: true,
					maintainAspectRatio: true,
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
									suggestedMin: 0,
									suggestedMax: 0
								}
							}
						]
					}
				}
			});

			// donut chart
			let doughnutChart = new Chart(doughnutCTX, {
				type: 'doughnut',
				data: {
					labels: [
						response.results[0].name,
						response.results[1].name,
						response.results[2].name,
						response.results[3].name,
						response.results[4].name,
						response.results[5].name
					],
					datasets: [
						{
							data: [
								response.results[0].metacritic,
								response.results[1].metacritic,
								response.results[2].metacritic,
								response.results[3].metacritic,
								response.results[4].metacritic,
								response.results[5].metacritic
							],
							backgroundColor: colorPaletteRGBTransparent,
							borderColor: colorPaletteRGBOpaque,
							fill: true
						}
					]
				},
				options: {
					title: {
						display: true,
						position: 'top',
						text: `Top ${title} Games in 2020`
					}
				}
			});
			// line chart
			let lineChart = new Chart(lineCTX, {
				type: 'line',
				data: {
					labels: [
						response.results[0].name,
						response.results[1].name,
						response.results[2].name,
						response.results[3].name,
						response.results[4].name,
						response.results[5].name
					],
					datasets: [
						{
							data: [
								response.results[0].metacritic,
								response.results[1].metacritic,
								response.results[2].metacritic,
								response.results[3].metacritic,
								response.results[4].metacritic,
								response.results[5].metacritic
							],
							backgroundColor: colorPaletteRGBTransparent,
							borderColor: colorPaletteRGBOpaque,
							fill: true
						}
					]
				},
				options: {
					legend: {
						display: false
					},
					title: {
						display: true,
						position: 'top',
						text: `Top ${title} Games in 2020`
					}
				}
			});
		});

		// ////////////////////////////////////////////////////////////////////////////////////////// top chart logic

		const colorPalette = [ '#3500D3', '#00ffff', '#4b7fff', '#703fff', '#9600ff', '#00e6e6', '#240090' ];
		const colorPaletteRGBTransparent = [
			'rgba(53,0,211,.4)',
			'rgba(0,255,255,.4)',
			'rgba(75,127,255,.4)',
			'rgba(112,63,255,.4)',
			'rgba(150,0,255,.4)',
			'rgba(0,230,230,.4)',
			'rgba(36,0,230,.4)'
		];
		const colorPaletteRGBOpaque = [
			'rgba(53,0,211,1)',
			'rgba(0,255,255,1)',
			'rgba(75,127,255,1)',
			'rgba(112,63,255,1)',
			'rgba(150,0,255,1)',
			'rgba(0,230,230,1)',
			'rgba(36,0,230,1)'
		];
		// ctx.style.backgroundColor = "rgba(255,0,0,255)";

		const borderPalette = [ 'red', 'green', 'yellow', 'orange', 'pink' ];
		// let newData1 = [53, 52, 18, 68, 50, 38, 73];
		// let oldData = [0, 1, 10, 43, 23, 88, 23];
		// let newData = [10, 14, 18, 43, 21, 38, 63];
		// let oldData1 = [99, 80, 60, 66, 63, 18, 23];

		function updateChart() {
			chart.reset();
			chart.update();
			chart.data.datasets[0].data = newData;
			chart.data.datasets[1].data = newData1;
		}
	}
	title = [];

	// toggle light and dark mode. remember to do this for all charts
	$('#toggle-demo').change(() => {
		if (
			$('#topChartCard').hasClass('make-white') ||
			$('#doughnutCard').hasClass('make-white') ||
			$('#lineCard').hasClass('make-white')
		) {
			$('#topChartCard').removeClass('make-white');
			$('#doughnutCard').removeClass('make-white');
			$('#lineCard').removeClass('make-white');

			$('#topChartCard').addClass('make-black');
			$('#doughnutCard').addClass('make-black');
			$('#lineCard').addClass('make-black');
			chart.options.defaultFontColor = 'white';
			chart.data.datasets[0].backgroundColor = colorPaletteRGBOpaque;
		} else {
			$('#topChartCard').removeClass('make-black');
			$('#doughnutCard').removeClass('make-black');
			$('#lineCard').removeClass('make-black');

			$('#topChartCard').addClass('make-white');
			$('#doughtnutCard').addClass('make-white');
			$('#lineCard').addClass('make-white');

			chart.options.defaultFontColor = 'black';
			chart.data.datasets[0].backgroundColor = colorPaletteRGBTransparent;
		}
	});
});

/////////////////adding chart to plat order/game order/all calls
function renderSingleChart(searchInput) {
	// disable other tabs
	$('#doughnut-tab').prop('disabled', true);
	$('#line-tab').prop('disabled', true);

	let searchURL = `https://rawg.io/api/games?search=${searchInput}`;
	let ctx = document.getElementById('topChart').getContext('2d');

	$.get(searchURL).then((response) => {
		let searchResponse = response.results;

		// variable to create card
		let slugURL = `https://rawg.io/api/games/${searchResponse[0].slug}`;
		$.get(slugURL).then((response) => {
			let doughnutChart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: [
						response.ratings[0].title,
						response.ratings[1].title,
						response.ratings[2].title,
						response.ratings[3].title
					],
					datasets: [
						{
							data: [
								response.ratings[0].percent,
								response.ratings[1].percent,
								response.ratings[2].percent,
								response.ratings[3].percent
							],
							backgroundColor: colorPaletteRGBTransparent,
							borderColor: colorPaletteRGBOpaque,
							fill: true
						}
					]
				},
				options: {
					title: {
						display: true,
						position: 'top',
						text: `Love or Skip ${searchResponse[0].slug} %`
					}
				}
			});
		});
	});
	const colorPaletteRGBTransparent = [
		'rgba(53,0,211,.4)',
		'rgba(0,255,255,.4)',
		'rgba(75,127,255,.4)',
		'rgba(112,63,255,.4)',
		'rgba(150,0,255,.4)',
		'rgba(0,230,230,.4)',
		'rgba(36,0,230,.4)'
	];
	const colorPaletteRGBOpaque = [
		'rgba(53,0,211,1)',
		'rgba(0,255,255,1)',
		'rgba(75,127,255,1)',
		'rgba(112,63,255,1)',
		'rgba(150,0,255,1)',
		'rgba(0,230,230,1)',
		'rgba(36,0,230,1)'
	];
}
// bubble chart ref
// let chart = new Chart(ctx, {
//   type: "bubble",
//   data: {
//     labels: [
//       // recommended, meh, exceptional, skip
//       response.ratings[0].title,
//       response.ratings[1].title,
//       response.ratings[2].title,
//       response.ratings[3].title,
//     ],
//     datasets: [
//       {
//         label: [response.ratings[0].title],
//         backgroundColor: "lightgreen",
//         data: [{ x: 1.5, y: 3, r: response.ratings[0].percent }],
//       },
//       {
//         label: [response.ratings[1].title],
//         backgroundColor: "yellow",
//         data: [{ x: 2, y: 1, r: response.ratings[1].percent }],
//       },
//       {
//         label: [response.ratings[2].title],
//         backgroundColor: "green",
//         data: [{ x: 2.5, y: 3, r: response.ratings[2].percent }],
//       },
//       {
//         label: [response.ratings[3].title],
//         backgroundColor: "red",
//         data: [{ x: 3, y: 1, r: response.ratings[2].percent }],
//       },
//     ],
//   },
//   options: {
//     title: {
//       display: true,
//       position: "top",
//       text: `Top ${title} Games in 2020`,
//     },
//     legend: {
//       display: true,
//       position: "top",
//     },
//   },
// });
function createChart(ctx, type) {
	new Chart(ctx, {
		type: type,
		data: {
			labels: [
				'Metal Gear Solid 5',
				'Animal Crossing: New Horizons',
				'Bioshock: Collection',
				'OverWatch',
				'The Witcher 3: Wild Hunt'
			],
			datasets: [
				{
					label: 'Metacritic Score',
					backgroundColor: [ '#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850' ],
					data: [ 78, 67, 73, 78, 93 ]
				}
			]
		},
		options: {
			legend: { display: false },
			title: {
				display: true,
				text: 'Top Games 2020'
			}
		}
	});
}
