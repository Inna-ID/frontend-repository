jQuery(document).ready(function() {


	function headerFix() {
		if ($(window).scrollTop() != 0) {
			$('header').addClass('fix');
		} else {
			$('header').removeClass('fix');
		}
	}
	headerFix();
	$(window).on('scroll', headerFix);

	function menuFun() {		
		$('.icon-menu').click(function(){
			$('.menu').addClass('active');
			$('.menu').animate({
				left: '0px'
			}, 200);
			$('body').animate({
				left: '300px'
			}, 200);
			$('.icon-menu').hide();
			$('.overlay-bg').show();
		});

		$('.icon-close').click(function(){
			$('.menu').removeClass('active');
			$('.menu').animate({
				left: '-300px'
			}, 200);
			$('body').animate({
				left: '0px'
			}, 200);
			$('.icon-menu').show();
			$('.overlay-bg').hide();
		});

		$('.overlay-bg').click(function(){
			$('.menu').removeClass('active');
			$('.menu').animate({
				left: '-300px'
			}, 200);
			$('body').animate({
				left: '0px'
			}, 200);
			$('.icon-menu').show();
			$('.overlay-bg').hide();
		});
	};

	$(window).on('load', menuFun);
	
});

//$(document).ready(menuFun);
