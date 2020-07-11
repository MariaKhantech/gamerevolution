
$(document).ready(() => {

	//returns a profile card div
	const createProfileCard = (imgsrc, profileName, profileBio) => {
		return $(`<div class="col-lg-3 ,mb-5">
		<div class="card text-center style-card" style="width: 18rem;">
		  <img id="profile-card"src="${imgsrc}" class="card-img-top img-portfolio img-fluid" alt="...">
		  <div class="card-body">
			<h5 class="card-title text-white style-p-card" id="profileName">${profileName}</h5>
			<hr class="text-white">
			<p class="card-text text-white style-p-card">${profileBio}.</p>
			<a href="#" class="btn btn-primary card-add-btn">Add Profile</a>
		  </div>
		</div>
	  </div>
	`);
	}

	//call the route to return all profiles to be rendrered on the page
	const showAllProfiles = () => {
		$.get("/api/profile/searchAll", () => {
		}).then((result) => {
			//looping through the list of results
			Object.entries(result).forEach((entry) => {
				console.log(entry);
				//holding profile card div
				const srcImg = entry[1].Profile.avatarImg.substring(entry[1].Profile.avatarImg.indexOf('/'));
				
				const cardHTML = createProfileCard(srcImg, entry[1].username, entry[1].Profile.bio );
				
				//appending profile card onto profile-grid
				$("#profile-grid").append(cardHTML);
			});	
		});
	}

	const runProfileSearch = (searchValue) => {
		$.get('/api/profile/searchUser' + searchValue, () => { }).then((data) => {
			//invalid profile name
			if(!data) {
				alert ("profile does not exist");
				return;
			}
			//clear the profile grid
			$("#profile-grid").html("");
			//append to the profil grid
			const srcImg = data.Profile.avatarImg.substring(data.Profile.avatarImg.indexOf('/'));
			const cardHTML = createProfileCard(srcImg, data.username, data.Profile.bio );
			$("#profile-grid").append(cardHTML);
	
		});	
	}

	//mario fades intp the page
	const fadeInMario = () => {
		$('#paper-mario1').fadeIn(4000).removeClass('d-none');
	}

	fadeInMario();
	showAllProfiles();

//   function triggerExplosion() {
		// let explosionAudio = $('<Audio></Audio>');
		// explosionAudio[0].src = 'assets/sounds/explosion.wav';
		// explosionAudio[0].play();
		// //stop audio for spaceship engine//
		// $('#audiospaceship')[0].pause();

		//used to edit the animation, speed of explosion animation/

		$('.brick').explode();

		$('.brick').explode({
			omitLastLine: false,
			radius: 80,
			minRadius: 20,
			release: true,
			fadeTime: 300,
			recycle: true,
			recycleDelay: 10,
			fill: true,
			explodeTime: 100,
			maxAngle: 360,
			gravity: 0,
			round: false,
			groundDistance: 400,
			ignoreCompelete: false,
			land: true
		});
	// }

	$('.brick').explodeRestore();


	// $('.brick').on("", function(event) {
	// 	triggerExplosion();

	$('#browse-btn').on('click', (event) => {
		const searchValue = $("#searchInput").val();
		if (searchValue === "") {
			$("#profile-grid").html("");
			showAllProfiles();
			return;
		}
		runProfileSearch(searchValue);
	});


	//toggle nav bar link if the user is logged in
	$.get('/api/user-data', () => { }).then((result) => {		
		if(result.userId) {
			$('#myprofilelink').removeClass('d-none')
			$('#signOut').parent().removeClass('d-none');
			$('#loginBtn').addClass('d-none');
		} 
	});

	//handle sign out btn
	$('#signOut').on('click', function () {
		$.get('/api/logout', (data) => {
			window.location.replace('/');
		});
	});
});


