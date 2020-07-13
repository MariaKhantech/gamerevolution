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

	function triggerBrickExplosion() {
		let brickExplosion = $('<Audio></Audio>');
		brickExplosion[0].src = 'assets/sounds/brick-smash.wav';
		brickExplosion[0].play();
		//stop audio for spaceship engine//
		// $('.brick')[0].pause();
	}

	//get the left and top position of the brick//
	// let left = $('.brick')[0].style.left;
	// let top = $('.brick')[0].style.top;

	// let mushroomMario = $('<img id="red-alien"src="assets/img/red-alien.png" alt="red alien">');
	// mushroomMario.css('left', left);
	// mushroomMario.css('top', top);

	//used to edit the animation, speed of explosion animation/

	// $('.brick').explode({
	// 	omitLastLine: false,
	// 	radius: 40,
	// 	minRadius: 20,
	// 	release: true,
	// 	fadeTime: 100,
	// 	recycle: true,
	// 	recycleDelay: 1,
	// 	fill: true,
	// 	explodeTime: 15,
	// 	maxAngle: 360,
	// 	gravity: 0,
	// 	round: false,
	// 	groundDistance: 400,
	// 	ignoreCompelete: false,
	// 	land: true
	// });

	// $('.brick').explodeRestore();

	// $('.brick').on("", function(event) {
	// 	triggerExplosion();

	//Starting mario animations//
	let offset = $('.paper-mario').position();
	console.log(offset);
	let isExploded = false;
	let isGrown = false;
	document.body.onkeyup = function(e) {
		console.log(e);
		if (e.keyCode === 32) {
			$('.paper-mario').addClass('animated');
			setTimeout(function() {
				//JUMP SOUND HERE
				let jumpMario = $('<Audio></Audio>');
				jumpMario[0].src = 'assets/sounds/jump-mario.wav';
				jumpMario[0].play();

				let brickPos = $('.brick').position();
				console.log(brickPos);

				let marioPos = $('.paper-mario').position();
				console.log(marioPos.left);

				if (marioPos.left > 10 && marioPos.left < 51 && !isExploded) {
					console.log('hot brick');
					$('.brick').explode();
					triggerBrickExplosion();
					//show the mushroom
					$('.mushroom').removeClass('d-none');
					isExploded = true;
					//grow mario
				} else if (marioPos.left > 10 && marioPos.left < 51 && !isGrown) {
					console.log('grab mushroom');
					$('.paper-mario').animate({ width: '150px', height: '150px' }, 1000);
					$('.mushroom').addClass('d-none');
					isGrown = true;
				}

				$('.paper-mario').removeClass('animated');
			}, 1000);
		}
	};

	let change = {
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

	function getOffset(el) {
		var _x = 0;
		var _y = 0;
		while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	}
});
