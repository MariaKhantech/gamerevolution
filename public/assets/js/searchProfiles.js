

$("#carousel").Cloud9Carousel( {
    buttonLeft: $("#buttons > .left"),
    buttonRight: $("#buttons > .right"),
    autoPlay: 1,
    bringToFront: true,
  
    mirror: {
      gap: 12,     /* 12 pixel gap between item and reflection */
      height: 0.2, /* 20% of item height */
      opacity: 0.4 /* 40% opacity at the top */
    }
    
  } );