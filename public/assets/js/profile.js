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
		const userId		 = 2;
		//take some profile data and update it in the database, exsiting
		$.ajax('/api/profile/update' + userId, {
			type: 'PUT',
			data: profileData
		}).then(() => {
			//reload the page to get the updated list from the database
			location.reload();
		});
	
	}

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
		if($('#profile-name').val().length === 0) {
			createProfile(profileData);
		} else {
			updateProfile(profileData);
		}
	
		//empty the edit profile modal form resets
		$('#editProfileForm').trigger('reset');

	});

	//handles "=" or slash. convers iframe youtube source to a embedded url e.g: https://www.youtube.com/embed/fVsD8KfkTg0
	const setEmbeddedYoutubeUrl = () => {

		const youtubeUrl=$('#profileFav-youtube').val();
		
		if(youtubeUrl.includes("=")) {
			let splitUrl = youtubeUrl.split('=');
			let youtubeUniqueId = splitUrl[splitUrl.length - 1];
			let embeddedUrl =  `https://www.youtube.com/embed/${youtubeUniqueId}`
			$('#favoriteVideo').attr('src', embeddedUrl);
		} else {
			let splitUrl = youtubeUrl.split('/');
			let youtubeUniqueId = splitUrl[splitUrl.length - 1];
			let embeddedUrl =  `https://www.youtube.com/embed/${youtubeUniqueId}`
			$('#favoriteVideo').attr('src', embeddedUrl);
		}

	}

	//when the user signs up and enter the profile for the very first time then
	   //open the modal using:
	   //$( "#editProfileBtn" ).trigger( "click" );

	
	//get the latest profile information for the user
	getProfileInfo();


});
