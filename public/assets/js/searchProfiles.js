$(document).ready(() => {
	let disableBtn = '';
	let userData = null;
	let pixels = 0;
	//returns a profile card div
	const createProfileCard = (imgsrc, profileName, profileBio, userId) => {
		return $(`<div class="col-lg-4 mb-5">
		<div class="card text-center style-card" style="width: 15rem;">
		  <img id="profile-card"src="${imgsrc}" class="card-img-top img-portfolio img-fluid" alt="...">
		  <div class="card-body">
			<h5 class="card-title text-white style-p-card" id="profileName">${profileName}</h5>
			<hr class="text-white">
			<p class="card-text text-white style-p-card">${profileBio}.</p>
			<a href="#" id="addProfile" class="btn btn-primary card-add-btn ${disableBtn}" data-userId="${userId}">Add Profile</a>
		  </div>
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
				alert('profile does not exist');
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

	function triggerBrickExplosion() {
		let brickExplosion = $('<Audio></Audio>');
		brickExplosion[0].src = 'assets/sounds/brick-smash.wav';
		brickExplosion[0].play();
		//stop audio for spaceship engine//
		// $('.brick')[0].pause();
	}
	triggerBrickExplosion();

	//get the left and top position of the brick//
	let left = $('.brick')[0].style.left;
	let top = $('.brick')[0].style.top;

	let mushroomMario = $('<img id="red-alien"src="assets/img/red-alien.png" alt="red alien">');
	mushroomMario.css('left', left);
	mushroomMario.css('top', top);

	//used to edit the animation, speed of explosion animation/
	$('.brick').explode();

	$('.brick').explode({
		omitLastLine: false,
		radius: 40,
		minRadius: 20,
		release: true,
		fadeTime: 100,
		recycle: true,
		recycleDelay: 1,
		fill: true,
		explodeTime: 15,
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

	//Starting mario animations//

	document.body.onkeyup = function(e) {
		console.log(e);
		if (e.keyCode == 32) {
			console.log('hello');
			//JUMP SOUND HERE
			let jumpMario = $('<Audio></Audio>');
			jumpMario[0].src = 'assets/sounds/jump-mario.wav';
			jumpMario[0].play();

			$('.paper-mario').addClass('animated');

			setTimeout(function() {
				$('.paper-mario').removeClass('animated');
			}, 2000);
		}
	};

	var change = {
		37: {
			left: '-=1'
		},

		39: {
			left: '+=1'
		}
	};
	$(document).one('keydown', keyDown);

	var going;

	function keyDown(e) {
		console.log('down');

		$(document).one('keyup', keyup);
		var animation = change[e.which];
		going = setInterval(keepGoing, 1);

		function keepGoing() {
			$('.paper-mario').css(animation);
		}
	}

	function keyup(e) {
		console.log('up');
		clearInterval(going);
		$(document).one('keydown', keyDown);
	}
	// $('button').click(function() {
	// 	$(".fademe").addClass('animated');
	// 	setTimeout(function() {
	// 	  $(".fademe").removeClass('animated');
	// 	}, 1500);
	//   });
});
