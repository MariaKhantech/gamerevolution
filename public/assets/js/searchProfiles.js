$(document).ready(() => {
	let disableBtn = '';
	let userData = null;
	let pixels = 0;
	//returns a profile card div

	const createProfileCard = (imgsrc, profileName, profileBio, userId) => {
		return $(`<div class="card text-center style-card" id = "multi-card" style="width:auto; max-width: 18rem;">
		<img id="profile-card"src="${imgsrc}" class="card-img-top img-portfolio img-fluid" alt="...">
		<div class="card-body">
		  <h5 class="card-title" id="profileName">${profileName}</h5>
		  <hr class="text-white">
		  <p class="card-text style-p-card">${profileBio}</p>
		  <a href="#" id="addProfile" class="btn btn-primary card-add-btn ${disableBtn}" data-userId="${userId}">Add Profile</a>
		</div>
	  </div>
	`);
	};

	//call the route to return all profiles to be rendrered on the page
	const showAllProfiles = () => {
		$.get('/api/profile/searchAll', () => {}).then((result) => {
			//looping through the list of results
			Object.entries(result).forEach((entry) => {
				console.log(entry);
				//holding profile card div
				const srcImg = entry[1].Profile.avatarImg.substring(entry[1].Profile.avatarImg.indexOf('/'));
				const cardHTML = createProfileCard(srcImg, entry[1].username, entry[1].Profile.bio, entry[1].userId);
				//appending profile card onto profile-grid
				$('#profile-grid').append(cardHTML);
			});
		});
	};

	//run a single profile search
	const runProfileSearch = (searchValue) => {
		$.get('/api/profile/searchUser' + searchValue, () => {}).then((data) => {
			//invalid profile name
			if (!data) {
				let noProfile = $(' <h6 class = "text-white">Profile does not exist!</h6>');
				$('#not-exist').removeClass('d-none');
				setTimeout(function() {
					$('#not-exist').addClass('d-none');
				}, 3000);

				return;
			}
			//clear the profile grid
			$('#profile-grid').html('');
			//append to the profil grid
			const srcImg = data.Profile.avatarImg.substring(data.Profile.avatarImg.indexOf('/'));
			const cardHTML = createProfileCard(srcImg, data.username, data.Profile.bio, data.userId);
			$('#profile-grid').append(cardHTML);
		});
	};

	//mario fades intp the page
	const fadeInMario = () => {
		$('#paper-mario1').fadeIn(4000).removeClass('d-none');
	};

	//toggle nav bar link if the user is logged in
	$.get('/api/user-data', () => {}).then((result) => {
		if (result.userId) {
			userData = result;
			$('#myprofilelink').removeClass('d-none');
			$('#signOut').parent().removeClass('d-none');
		} else {
			//disable add profile BTN
			disableBtn = 'disabled';
		}
	});

	fadeInMario();
	showAllProfiles();

	$('#browse-btn').on('click', (event) => {
		const searchValue = $('#searchInput').val();
		if (searchValue === '') {
			$('#profile-grid').html('');
			showAllProfiles();
			return;
		}
		runProfileSearch(searchValue);
	});

	//handle add Freind
	$('#profile-grid').on('click', 'a', function(event) {
		event.preventDefault();
		console.log($(this).data('userid'));

		//create an object to store the friend_id variable
		const friendData = {
			friendId: $(this).data('userid')
		};
		//connecto api route to add friend
		$.post('/api/profile/friend/create', friendData).then((results) => {
			console.log('user posts', results);
			let success = $('<h6 class = "text-white">success!</h6>');
			$(this).replaceWith('<h6 class="text-white">success!</h6>');
		});
	});

	//handle sign out btn
	$('#signOut').on('click', function() {
		$.get('/api/logout', (data) => {
			window.location.replace('/');
		});
	});
});
