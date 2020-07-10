
$(document).ready(() => {

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
  console.log($("#carousel").data("carousel").itemsRotated());

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


});

