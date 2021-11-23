//SLIDERS
var $slider = $('.slider-gallery1');
var $slider2 = $('.slider-reviews');
var $progressBar = $('.progress');
var $progressBar2 = $('.progress2');
var $currentValueBar = $('.current');
var $totalValueBar= $('.total');

if($('.slider-gallery1').length>0){
	$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
		var calc = ( (nextSlide) / (slick.slideCount) ) * 100;

		$progressBar
		.css('background-size', calc + '% 100%')
		.attr('aria-valuenow', calc );

	});

	$('.slider-gallery1').slick({
		//autoplay: true,
		// infinite: false,
		dots: false,
		arrows: false,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {}
		}]
	});
}


var filtered = false;

if(!filtered){
	$('.slider-gallery1').slick('slickUnfilter').slick('slickFilter','.'+'kyx');
}

$('.filter__list li').on('click',function(){
	$('.filter__list li').removeClass('active');
	var filter = $(this).data('filter');
	$('.slider-gallery1').slick('slickUnfilter').slick('slickFilter','.'+filter);
	$(this).addClass('active');
	$(".slider-gallery1").slick("slickGoTo", 0);
	$progressBar
	.css('background-size', 0 + '% 100%')
	.attr('aria-valuenow', 0 );
	filtered = true;
});  


if($('.slider-reviews').length>0){
	$slider2.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
		var calc = ( (nextSlide) / (slick.slideCount -1) ) * 100;

		$progressBar2
		.css('background-size', calc + '% 100%')
		.attr('aria-valuenow', calc );
		$currentValueBar.text(nextSlide + 1);
	});
	$slider2.on('init', function(event, slick) {
		$currentValueBar.text(slick.currentSlide + 1)
		$totalValueBar.text(slick.slideCount)

	})
	$('.slider-reviews').slick({
		//autoplay: true,
		infinite: true,
		dots: false,
		arrows: true,
		accessibility:false,
		autoplaySpeed: 3000,
		centerMode: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerPadding:0,
		focusOnSelect:true,
		cssEase: 'linear',
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:$('.slick-next'),
		prevArrow:$('.slick-prev'),
		responsive: [{
			breakpoint: 991.98,
			settings: {
					slidesToShow: 1,
			}
		}]
	});
}