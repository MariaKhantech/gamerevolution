
$(document).ready(() => {

	//////////////////////animation js///////////
 $("#carousel").Cloud9Carousel( {
    buttonLeft: $("#buttons > .left"),
    buttonRight: $("#buttons > .right"),
    autoPlay: 0,
    bringToFront: true,
    yRadius:100,
    xRadius: 600,
    mirror: {
      gap: 12,     /* 12 pixel gap between item and reflection */
      height: 0.2, /* 20% of item height */
      opacity: 0.4 /* 40% opacity at the top */
    }
 

  });
  console.log($("#carousel").data("carousel").nearestItem());

  $('.left').on('click', (event) =>{
    console.log($("#carousel").data("carousel").nearestItem());
  })

  
  const fadeInMario = () => {
    $('#paper-mario1').fadeIn(4000).removeClass('d-none');
  }

  fadeInMario();

  function triggerExplosion() {
		let explosionAudio = $('<Audio></Audio>');
		explosionAudio[0].src = 'assets/sounds/explosion.wav';
		explosionAudio[0].play();
		//stop audio for spaceship engine//
		$('#audiospaceship')[0].pause();

		//used to edit the animation, speed of explosion animation//
		$('#explodeship').explode({
			omitLastLine: false,
			radius: 80,
			minRadius: 20,
			release: true,
			fadeTime: 300,
			recycle: true,
			recycleDelay: 10,
			fill: true,
			explodeTime: 300,
			maxAngle: 360,
			gravity: 0,
			round: false,
			groundDistance: 400,
			ignoreCompelete: false,
			land: true
		});
	}



	//funcionality js///

const showAllProfiles = () => {
	$.get('/api/profile/searchUser', () => { }).then((data) => {

	});
}

$('#browse-btn').on('click', (event) => {
	console.log('works');
	const searchValue = $("#searchInput").val();
	if (searchValue === "") {
		return 
	} 
	$.get('/api/profile/searchUser' + searchValue, () => { }).then((data) => {
		console.log("this is search profile data")
		console.log(data);
		console.log($("#carousel").data("carousel").nearestItem().element);
		//create a profile card//
		 $("#carousel").data("carousel").nearestItem().element=
		 
		//  let searchProfileCard = createProfileCard(data.Profile.avatarImg, data.username, data.Profile.bio);

		$("#carousel").data("carousel").nearestItem() 
		// const profileCardImg = $("#profile-card").attr("src");
		// const profileName = $("#profileName").text();
		// const profileBio = $("profileBio").text();

		// data.username
		// data.Profile.avatarImg
		
		});	
});

	const createProfileCard = (imgsrc, profileName, profileBio) => {
		return $("#middle-column").append(
			` <div id="carousel">
            <div class="card cloud9-item text-center" style="width: 18rem;">
              <img id="profile-card"src="${imgsrc}" class="card-img-top img-portfolio" alt="...">
              <div class="card-body">
                <h5 class="${profileName}" id="profileName">Card title</h5>
                <p class="card-text">${profileBio}</p>
                <a href="#" class="btn btn-primary">Add Profile</a>
              </div>
            </div>`
		)


	}

});
