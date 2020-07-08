$(document).ready(() => {
	//function gets profile information by calling the get route/api/profile route
	const getProfileInfo = () => {
		const userId = 2;
		$.get('api/profile' + userId, (data) => {
			console.log(data);
			//populate porile info
			populateProfileInfo(data);
			//populate modal
			populateModalForm(data);
			//load the user games
			loadUserGames();
			//set corrected youtube embedded video url
			setEmbeddedYoutubeUrl();
		});
	};

	//funnction that creates a new profile by calling the post route /api/profile/create
	const createProfile = (profileData) => {
		$.post('/api/profile/create', profileData).then((results) => {
			console.log('update successful', results);
			location.reload();
		});
	};

	//TODO- create function that updates a profile (PUT)
	const updateProfile = (profileData) => {
		const userId = 2;
		//take some profile data and update it in the database, exsiting
		$.ajax('/api/profile/update' + userId, {
			type: 'PUT',
			data: profileData
		}).then(() => {
			//reload the page to get the updated list from the database
			location.reload();
		});
	};

	//populates profile page with the profile information from the database
	const populateProfileInfo = (data) => {
		//set the profile name
		$('#profileName').text(data.profileName);

		//set the bio section
		$('#profileBio').text(data.bio);

		//sets users twitch url link ICON
		$('#twitch_icon_url').attr('href', data.twitchUrl);

		//sets users twitch url link ICON
		$('#youtube_icon_url').attr('href', data.youtubeChannelUrl);

		//sets the embedded youtube video
		$('#favoriteVideo').attr('src', data.favoriteYoutubeVideoUrl);

		//set the profile nickname
		$('#profileNickname').html(`<strong class="color-text">Name: </strong>
		${data.nickname}`);

		//sets the discord user name
		$('#discordUsername').html(`<strong class="color-text">Discord Username: </strong> ${data.discordUserName}`);

		//sets the twitch user name
		$('#twitchUserName').html(`<strong class="color-text">Twitch Username: </strong> ${data.twitchUserName}`);

		//sets the aboutme section
		$('#aboutMe').html(`<strong class="color-text">About: </strong> ${data.aboutMe}`);

		//sets the avatar image
		$('#user-profile').attr('src', data.avatarImg.substring(data.avatarImg.indexOf('/')));

		//set the cover photo of the image
		//$('#cover-photo').css('background-image', "url(data.avatarImg.substring(data.avatarImg.indexOf('/')))");
	};

	//populate the modal form
	const populateModalForm = (data) => {
		$('#profile-name').val(data.profileName);
		$('#bio').val(data.bio);
		$('#profileFav-youtube').val(data.favoriteYoutubeVideoUrl);
		$('#profile-twitchurl').val(data.twitchUrl);
		$('#profile-youtube').val(data.youtubeChannelUrl);
		$('#profile-discordusername').val(data.discordUserName);
		$('#profile-gamernickname').val(data.nickname);
		// $('#profile-discordserver').val();
		$('#profile-twitchusername').val(data.twitchUserName);
		$('#profile-aboutme').val(data.aboutMe);
	};

	//create an users selected games in the DB
	const createSelectedGames = (gameData) => {
		$.post('/api/profile/selectedgames', gameData).then((results) => {
			console.log('update successful', results);
			location.reload();
		});
	};

	//update the users selected games in the DB
	const updateSelectedGames = (gameData) => {
		const userId = 2;
		//take some profile data and update it in the database, exsiting
		$.ajax('/api/profile/selectedgames/update' + userId, {
			type: 'PUT',
			data: gameData
		}).then(() => {
			//reload the page to get the updated list from the database
			location.reload();
		});
	};

	const loadUserGames = () => {
		const userId = 2;
		$.get('api/profile/selectedgames' + userId, (data) => {
			//populate the modal data
			populateGameModal(data);
			//loop throught the data and populate the HTML
			Object.entries(data).forEach((entry) => {
				let searchGameUrl = `https://rawg.io/api/games?search=${entry[1]}`;

				$.get(searchGameUrl).then((response) => {
					if (response.count === 0) {
						$('#alert-modal').modal('show');
						$('#modal-text').text(`No results please try again`);
					} else {
						const searchResult = response.results;
						//populate html elements with image and game from rawg data//
						$(`#${entry[0]}Img`).attr('src', searchResult[0].background_image);
						if (entry[0] === 'currentlyPlaying') {
							$(`#${entry[0]}Name`).text(searchResult[0].name);
						}
					}
				});
			});
		});
	};

	const populateGameModal = (data) => {
		//set the profile name
		$('#currentlyPlaying').val(data.currentlyPlaying);
		$('#gameOne').val(data.favoriteGameOne);
		$('#gameTwo').val(data.favoriteGameTwo);
		$('#gameThree').val(data.favoriteGameThree);
		$('#leastOne').val(data.leastFavoriteOne);
		$('#leastTwo').val(data.leastFavoriteTwo);
		$('#leastThree').val(data.leastFavoriteThree);
	};

	//*******Onclick functions to capature info from modals ******/
	$('#editProfileForm').on('submit', (event) => {
		//stop the page from refreshing
		event.preventDefault();

		//collect all the modal form data into the profileData object
		const profileData = {
			profileName: $('#profile-name').val(),
			profileBio: $('#bio').val(),
			favoriteYoutubeVideoUrl: $('#profileFav-youtube').val(),
			twitch_icon_url: $('#profile-twitchurl').val(),
			youtube_icon_url: $('#profile-youtube').val(),
			discordServer: $('#profile-discordserver').val(),
			nickname: $('#profile-gamernickname').val(),
			discordUserName: $('#profile-discordusername').val(),
			twitchUserName: $('#profile-twitchusername').val(),
			aboutMe: $('#profile-aboutme').val()
		};

		//send profile data to backend via post route
		//the profile name is required, so if its empty its an new user who needs to create profile
		if ($('#profile-name').val().length === 0) {
			createProfile(profileData);
		} else {
			updateProfile(profileData);
		}

		//empty the edit profile modal form resets
		$('#editProfileForm').trigger('reset');
	});

	// 	//Populating game choices into carousels and currently playing
	$('#editGameDisplay').on('submit', (event) => {
		//stop the page from refreshing
		event.preventDefault();

		//collect all the modal form data into the profileData object
		const favGameData = {
			currentlyPlaying: $('#currentlyPlaying').val(),
			favoriteGameOne: $('#gameOne').val(),
			favoriteGameTwo: $('#gameTwo').val(),
			favoriteGameThree: $('#gameThree').val(),
			leastFavoriteOne: $('#leastOne').val(),
			leastFavoriteTwo: $('#leastTwo').val(),
			leastFavoriteThree: $('#leastThree').val()
		};

		if ($('#profile-name').val().length === 0) {
			createSelectedGames(favGameData);
		} else {
			updateSelectedGames(favGameData);
		}
	});

	//handle the avatar file upload event
	$('#avatar').change((event) => {
		const file_data = $('#avatar').prop('files')[0];
		const form_data = new FormData();
		form_data.append('file', file_data);
		//send the file to posted route
		$.ajax({
			url: '/api/profile/upload_avatar',
			type: 'POST',
			enctype: 'multipart/form-data',
			data: form_data,
			contentType: false,
			processData: false,
			cache: false
		}).then(() => {
			location.reload();
		});
	});

	//handle the cover image file upload event
	$('#coverImg').change((event) => {
		const file_data = $('#coverImg').prop('files')[0];
		const form_data = new FormData();
		form_data.append('file', file_data);
		//send the file to posted route
		$.ajax({
			url: '/api/profile/upload_coverImg',
			type: 'POST',
			enctype: 'multipart/form-data',
			data: form_data,
			contentType: false,
			processData: false,
			cache: false
		}).then(() => {
			location.reload();
		});
	});

	//handles "=" or slash. convers iframe youtube source to a embedded url e.g: https://www.youtube.com/embed/fVsD8KfkTg0
	const setEmbeddedYoutubeUrl = () => {
		const youtubeUrl = $('#profileFav-youtube').val();

		if (youtubeUrl.includes('=')) {
			let splitUrl = youtubeUrl.split('=');
			let youtubeUniqueId = splitUrl[splitUrl.length - 1];
			let embeddedUrl = `https://www.youtube.com/embed/${youtubeUniqueId}`;
			$('#favoriteVideo').attr('src', embeddedUrl);
		} else {
			let splitUrl = youtubeUrl.split('/');
			let youtubeUniqueId = splitUrl[splitUrl.length - 1];
			let embeddedUrl = `https://www.youtube.com/embed/${youtubeUniqueId}`;
			$('#favoriteVideo').attr('src', embeddedUrl);
		}
	};

	//get the latest profile information for the user
	getProfileInfo();

	// //////////////GUS GET REQUEST FOR GAMES
	const getUserGames = () => {
		return $.ajax({
			url: "/api/addgames",
			method: "GET",
		}).then((result) => {
			// console.log(result);

			let dbGames = result;

			for (let i = 0; i < dbGames.length; i++) {
				// console.log(dbGames[i].game_name);

				let slugURL = `https://rawg.io/api/games/${dbGames[i].game_name}`;

				$.get(slugURL).then((response) => {


					console.log(response);

					const createCard = $("<div>", {
						class: "card d-inline-block ",
						id: "game-card",
						style: "width: 15rem",

					});
					// append card to parent div (line 55 of addGame.html)
					$("#profile-game-area").append(createCard);

					if (response.background_image === null) {
						const cardImg = $("<img>", {
							class: "img-thumbnail",
							alt: "game-image",
							src: "https://placekitten.com/200/139",
						});
						createCard.append(cardImg);
					} else {
						const cardImg = $("<img>", {
							class: "img-thumbnail",
							alt: "game-image",
							src: response.background_image,
						});
						createCard.append(cardImg);
					}
					const cardBody = $("<div>", {

						class: "card-body m-auto",

					});
					// append card body to parent .card div
					createCard.append(cardBody);

					const cardTitle = $("<h6>", {
						class: "card-title text-center",
						text: response.name,

					});
					// append card title to card body
					cardBody.append(cardTitle);

					if (response.released === null) {
						const cardDescription = $("<p>", {
							class: "card-text text-center",






							text: `Released: N/A`,


						});
						cardBody.append(cardDescription);
					} else {
						// else set card description to game release year and append to card body
						const gameYear = response.released.split("-");

						const cardDescription = $("<p>", {
							class: "card-text text-center",

							text: `Released: ${gameYear[0]}`,

						});
						cardBody.append(cardDescription);
					}

					const percentage = Math.round((response.rating / 5) * 100);

					const rawgPercentage = $("<p>", {
						class: "card-text text-center",

						text: `Rating: ${percentage}%`,
					});


					const rawgRating = $("<p>", {
						class: "card-text text-center mx-auto",
					}).rateYo({
						rating: response.rating,
						readOnly: true,
						starWidth: "25px",
					});


					const userRatings = $("<p>", {
						class: "card-text text-center",
						text: `User Ratings: ${response.ratings_count}`,
					});


					cardBody.append(rawgPercentage, rawgRating, userRatings);

					// variable to create button that will add game to "favorites" library
					const deleteButton = $("<button>", {
						class: "btn btn-outline-danger btn-block ",
						id: "delete-button",
						type: "button",
						"data-type": response.id,
						"data-name": response.slug,
						"data-toggle": "popover",
						"data-content": "Game removed from library",

						text: `Remove from Library`,
					});

					// append button to card body
					cardBody.append(deleteButton);


				});

			}


		});

	}

	getUserGames();
	// ///////////////////////////////////////
});

// Object.entries(favGameData).forEach((entry) => {
// 	console.log(entry);
// 	//Calling rawg data from api
// 	let searchGameUrl = `https://rawg.io/api/games?search=${entry[1]}`;
// 	console.log(searchGameUrl);

// 	$.get(searchGameUrl).then((response) => {
// 		if (response.count === 0) {
// 			$('#alert-modal').modal('show');
// 			$('#modal-text').text(`No results please try again`);
// 		} else {
// 			const searchResult = response.results;
// 			console.log(searchResult[0]);
// 			//populate html elements with image and game from rawg data//
// 			$(`#${entry[0]}Img`).attr('src', searchResult[0].background_image);
// 			$(`#${entry[0]}Name`).text(searchResult[0].name);
// 		}
// 	});
// });
//references for profile js: //
//help with uploading avatars https://bezkoder.com/node-js-upload-image-mysql/ //
