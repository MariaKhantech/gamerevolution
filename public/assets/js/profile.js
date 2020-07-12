$(document).ready(() => {
	//function gets profile information by calling the get route/api/profile route
	let userData;

	const getProfileInfo = () => {
		$.get('api/user-data', () => {}).then((result) => {
			userData = result;
			//sets the username
			$('#username').text(`@${result.username}`);

			//check if profile exists
			$.get('api/profile' + result.userId, (data) => {
				if (!data) {
					//create them an empty profile
					createProfile(data);
				}
				//populate porile info
				populateProfileInfo(data);
				//populate modal
				populateModalForm(data);
				//load the user games
				loadUserGames();
				//set corrected youtube embedded video url
				setEmbeddedYoutubeUrl();
				//Get user comments //
				getCommentData(result);
				//get the users friends
				getUserFriends(result);
			});
		});
	};
	//function TODO COMMENT
	const getCommentData = (result) => {
		$.get('api/profile/comment' + result.userId, () => {}).then((data) => {
			//grab the avatar to use in the comments section
			commentImg = $('#user-profile').attr('src');
			commentUsername = $('#username').text();

			//loop through the list of comments in the data obkect
			Object.entries(data).forEach((entry) => {
				createComment(entry[1].comments, commentUsername, commentImg);
			});
		});
	};

	//function TODO COMMENT
	const getUserFriends = (result) => {
		$.get('api/profile/friends' + result.userId, () => {}).then((data) => {
			//grab the avatar to use in the comments section

			if (data.length === 0) {
				$('#profile-friends-area').append(
					'<h4 class= "text-white text-center">Navigate to Profile Search page to add friends</h4>'
				);
				return;
			}
			let friendCounter = 0;

			data.forEach((element) => {
				$.get('api/profile' + element.friend_id, () => {}).then((friendData) => {
					const createCard = $('<div>', {
						class: 'card d-inline-block ',
						id: 'game-card',
						style: 'width: 15rem'
					});
					const cardImg = $('<img>', {
						class: 'img-thumbnail',
						alt: 'game-image',
						src: friendData.avatarImg.substring(friendData.avatarImg.indexOf('/'))
					});

					const cardTitle = $('<h6>', {
						class: 'card-title text-center',
						text: friendData.profileName
					});

					$('#profile-friends-area').append(createCard);
					createCard.append(cardImg);
					createCard.append(cardTitle);

					//create top 3 card
					if (friendCounter < 3) {
						let friendImg = friendData.avatarImg.substring(friendData.avatarImg.indexOf('/'));
						let topFriend = createTopFriend(friendImg, friendData.profileName);
						$('#top-three-friends').append(topFriend);
						friendCounter += 1;
					}
				});
			});
		});
	};

	//comment button on user profile//
	$('#post-btn').on('click', (event) => {
		//event.preventDefault();

		//grab the value from the text box
		const userComment = $('#message').val();
		//checking if the entry is blank if so do not send to database to create an emtpy column
		if (userComment === '') {
			alert('no comment provided.');
			return;
		}
		//create an object to store the comment variable
		const userCommentData = {
			comment: userComment
		};

		//post putting comment into the database
		$.post('/api/profile/comment', userCommentData).then((results) => {
			commentImg = $('#user-profile').attr('src');
			commentUsername = $('#username').text();
			createComment(results.comments, commentUsername, commentImg);
		});
	});

	$('#signOut').on('click', function() {
		$.get('/api/logout', (data) => {
			window.location.replace('/');
		});
	});

	//funnction that creates a new profile by calling the post route /api/profile/create
	const createProfile = (profileData) => {
		$.post('/api/profile/create', profileData).then((results) => {
			location.reload();
		});
	};

	//TODO- create function that updates a profile (PUT)
	const updateProfile = (profileData) => {
		//take some profile data and update it in the database, exsiting
		$.ajax('/api/profile/update' + userData.userId, {
			type: 'PUT',
			data: profileData
		}).then((data) => {
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
		$('#profileNickname').html(`<strong class="color-text">Name:<br> </strong>
		${data.nickname}`);

		//sets the discord user name
		$('#discordUsername').html(
			`<strong class="color-text">Discord Username:<br> </strong> ${data.discordUserName}`
		);

		//sets the twitch user name
		$('#twitchUserName').html(`<strong class="color-text">Twitch Username:<br> </strong> ${data.twitchUserName}`);

		//sets the aboutme section
		$('#aboutMe').html(`<strong class="color-text">About:<br> </strong> ${data.aboutMe}`);

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
		$.get('api/profile/selectedgames' + userData.userId, (data) => {
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

		if ($('#currentlyPlayingImg').attr('src').endsWith('default-selectedGame.jpg')) {
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

	//huge div copied from the html to dynamically append a comment to middle column
	const createComment = (comment, username, imgSrc) => {
		$('#middle-column').append(
			`<div class="card social-timeline-card comments">
			<div class="card-header">
				<div class="d-flex justify-content-between align-items-center">
					<div class="d-flex justify-content-between align-items-center">
						<div class="mr-2">
							<img id='comment-img' class="rounded-circle" width="45"
								src="${imgSrc}" alt="">
						</div>
						<div class="ml-2">
							<div id ='comment-user1' class="h5 m-0 text-blue">${username}</div>
						</div>

					</div>
				</div>
			</div>
			<div class="card-body">
				<div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>10 min ago</div>
				<p class="card-text">${comment}</p>
			</div>
			<div class="card-footer">
				<a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
				<a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
				<a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
			</div>
		</div>`
		);
	};

	const createTopFriend = (imgSrc, profileName) => {
		return $(`<div class="col-md-auto">
					<div class="friend1 text-center">
						<img class="friends" src="${imgSrc}" alt="">
						<h3 class="text-center">${profileName}</h3>
					</div>
				</div>`);
	};

	//load the user friends

	//get the latest profile information for the user
	getProfileInfo();

	// //////////////GUS GET REQUEST FOR GAMES
	const getUserGames = () => {
		$.ajax({
			url: `api/user-data`,
			method: 'GET'
		}).then((data) => {
			$.ajax({
				url: `/api/addgames${data.userId}`,
				method: 'GET'
			}).then((results) => {
				console.log(results.length === 0);
				if (results.length === 0) {
					$('#profile-game-area').append(
						'<h4 class= "text-white text-center">Navigate to Game Search page to add games</h4>'
					);
					return;
				}
				let dbGames = results;

				for (let i = 0; i < dbGames.length; i++) {
					let slugURL = `https://rawg.io/api/games/${dbGames[i].game_name}`;

					$.get(slugURL).then((response) => {
						const createCard = $('<div>', {
							class: 'card d-inline-block ',
							id: 'game-card',
							style: 'width: 15rem'
						});

						$('#profile-game-area').append(createCard);

						if (response.background_image === null) {
							const cardImg = $('<img>', {
								class: 'img-thumbnail',
								alt: 'game-image',
								src: 'https://placekitten.com/200/139'
							});
							createCard.append(cardImg);
						} else {
							const cardImg = $('<img>', {
								class: 'img-thumbnail',
								alt: 'game-image',
								src: response.background_image
							});
							createCard.append(cardImg);
						}
						const cardBody = $('<div>', {
							class: 'card-body m-auto'
						});

						createCard.append(cardBody);

						const cardTitle = $('<h6>', {
							class: 'card-title text-center',
							text: response.name
						});

						cardBody.append(cardTitle);

						if (response.released === null) {
							const cardDescription = $('<p>', {
								class: 'card-text text-center',

								text: `Released: N/A`
							});
							cardBody.append(cardDescription);
						} else {
							const gameYear = response.released.split('-');

							const cardDescription = $('<p>', {
								class: 'card-text text-center',

								text: `Released: ${gameYear[0]}`
							});
							cardBody.append(cardDescription);
						}

						const percentage = Math.round(response.rating / 5 * 100);

						const rawgPercentage = $('<p>', {
							class: 'card-text text-center',

							text: `Rating: ${percentage}%`
						});

						const rawgRating = $('<p>', {
							class: 'card-text text-center mx-auto'
						}).rateYo({
							rating: response.rating,
							readOnly: true,
							starWidth: '25px'
						});

						const userRatings = $('<p>', {
							class: 'card-text text-center',
							text: `User Ratings: ${response.ratings_count}`
						});

						cardBody.append(rawgPercentage, rawgRating, userRatings);

						const deleteButton = $('<button>', {
							class: 'btn btn-outline-danger btn-block ',
							id: 'delete-button',
							type: 'button',
							'data-type': response.id,
							'data-name': response.slug,
							'data-toggle': 'popover',
							'data-content': 'Game removed from library',
							text: `Remove from Library`
						});

						cardBody.append(deleteButton);
					});
				}
			});
		});
	};

	getUserGames();

	$('#profile-game-area').on('click', 'button', function(event) {
		event.preventDefault();
		let name = $(this).data('name');
		// Alert modal show
		$.ajax({
			url: `api/user-data`,
			method: 'GET'
		}).then((data) => {
			const userGame = {
				game_name: name,
				userId: data.userId
			};
			$.ajax(`/api/addgames${data.userId}`, {
				type: 'DELETE',
				data: userGame
			}).then((result) => {
				$('#load-modal').modal('show');

				setTimeout(function() {
					$('#load-modal').modal('hide');
				}, 1500);
				$('#profile-game-area').empty();
				getUserGames();
			});
		});
	});
});
