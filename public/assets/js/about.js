//ABOUT US PAGE

(function(window, document, $, undefined) {
	var $slides, $btnArr;

	function onClick(e) {
		var $target = $(e.target);
		if ($target.hasClass('slide') && !$target.hasClass('active') && !$target.siblings().hasClass('active')) {
			$target.removeClass('anim-in last-viewed').addClass('active');
			$target.siblings().removeClass('anim-in last-viewed').addClass('anim-out');
		}
	}

	function closeSlide(e) {
		var $slide = $(e.target).parent();
		$slide.removeClass('active anim-in').addClass('last-viewed');
		$slide.siblings().removeClass('anim-out').addClass('anim-in');
	}

	$(function() {
		$slides = $('.slide');
		$btnArr = $slides.find('.btn-close');
		$slides.on('click', onClick);
		$btnArr.on('click', closeSlide);
	});
})(this, document, jQuery);

//toggle nav bar link if the user is logged in
$.get('/api/user-data', () => {}).then((result) => {
	if (result.userId) {
		$('#myprofilelink').removeClass('d-none');
		$('#signOut').parent().removeClass('d-none');
		$('#loginBtn').addClass('d-none');
	}
});

//handle sign out btn
$('#signOut').on('click', function() {
	$.get('/api/logout', (data) => {
		window.location.replace('/');
	});
});
