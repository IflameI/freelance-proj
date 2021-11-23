var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any()) { }

	if (location.hash) {
		var hsh = location.hash.replace('#', '');
		if ($('.popup-' + hsh).length > 0) {
			popupOpen(hsh);
		} else if ($('div.' + hsh).length > 0) {
			$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
		}
	}
	$('.wrapper').addClass('loaded');

	var act = "click";
	if (isMobile.iOS()) {
		var act = "touchstart";
	}

	let iconMenu = document.querySelector(".icon-menu");
	let body = document.querySelector("body");
	let menuBody = document.querySelector(".menu__body");
	if (iconMenu) {
		iconMenu.addEventListener("click", function () {
			iconMenu.classList.toggle("active");
			body.classList.toggle("lock");
			menuBody.classList.toggle("active");
		});
	}

//ZOOM
if ($('.gallery').length > 0) {
	baguetteBox.run('.gallery', {
		// Custom options
	});
}


//POPUP
$('.pl').click(function (event) {
	var pl = $(this).attr('href').replace('#', '');
	var v = $(this).data('vid');
	popupOpen(pl, v);
	return false;
});
function popupOpen(pl, v) {
	$('.popup').removeClass('active').hide();
	if (!$('.menu__body').hasClass('active')) {
		//$('body').data('scroll',$(window).scrollTop());
	}
	if (!isMobile.any()) {
		$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
		$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
	} else {
		setTimeout(function () {
			$('body').addClass('lock');
		}, 300);
	}
	history.pushState('', '', '#' + pl);
	if (v != '' && v != null) {
		$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

	if ($('.popup-' + pl).find('.slick-slider').length > 0) {
		$('.popup-' + pl).find('.slick-slider').slick('setPosition');
	}
}
function openPopupById(popup_id) {
	$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
}
function popupClose() {
	$('.popup').removeClass('active').fadeOut(300);
	if (!$('.menu__body').hasClass('active')) {
		if (!isMobile.any()) {
			setTimeout(function () {
				$('body').css({ paddingRight: 0 });
				$('.pdb').css({ paddingRight: 0 });
			}, 200);
			setTimeout(function () {
				$('body').removeClass('lock');
				//$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}, 200);
		} else {
			$('body').removeClass('lock');
			//$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function (event) {
	popupClose();
	return false;
});
$('.popup').click(function (e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});

// $('.goto').click(function () {
// 	var el = $(this).attr('href').replace('#', '');
// 	var offset = 0;
// 	console.log(123)

// 	$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });
// 	console.log(offset)

// 	if ($('.menu__body').hasClass('active')) {
// 		$('.menu__body,.icon-menu').removeClass('active');
// 		$('body').removeClass('lock');
// 	}
// 	return false;
// });


$('.menu__list a').click(function(e){
    	if($(this).attr('href').indexOf('#') != -1){ // Проверяем, является и ссылка действительно якорной ссылкой.
			e.preventDefault(); // Отменяем событие перехода.
            var href = $(this).attr('href').replace('#', ''); // Получаем из якорной ссылки нужный ID элемента, к которому будет происходить переход.

			if($('#'+href).length > 0){ // Проверяем, существует ли на странице нужный нам элемент.
            	var tophref = $('body').find('#'+href).offset().top; // Получаем координаты элемента, относительно начала страницы.
            	$('html, body').animate({scrollTop: tophref}, 800); // Создаём анимацию скрола к нужному элементу.
            }
        }
        if ($('.menu__body').hasClass('active')) {
        	$('.menu__body,.icon-menu').removeClass('active');
        	$('body').removeClass('lock');
        }
        
    });