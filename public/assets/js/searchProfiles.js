
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
});

