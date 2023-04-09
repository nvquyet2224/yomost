var ua = navigator.userAgent;
var match = ua.match('MSIE (.)');
var isTouchDevice = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints > 0);
var isFirefox = typeof InstallTrigger !== 'undefined';
var ios, android, blackBerry, UCBrowser, Operamini, firefox, windows, smartphone, tablet, touchscreen, all;

var isMobile = {
    ios: (function () {
        return ua.match(/iPhone|iPad|iPod/i);
    }()),
    android: (function () {
        return ua.match(/Android/i);
    }()),
    blackBerry: (function () {
        return ua.match(/BB10|Tablet|Mobile/i);
    }()),
    UCBrowser: (function () {
        return ua.match(/UCBrowser/i);
    }()),
    Operamini: (function () {
        return ua.match(/Opera Mini/i);
    }()),

    windows: (function () {
        return ua.match(/IEMobile/i);
    }()),
    smartphone: (function () {
        return (ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && window.innerWidth <= 440 && window.innerHeight <= 740);
    }()),
    tablet: (function () {
        return (ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && window.innerWidth <= 1366 && window.innerHeight <= 800);
    }()),

    all: (function () {
        return ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
    }())
};

if (isTouchDevice && isMobile.all !== null) {
    var TouchLenght = true;
} else if (isMobile.tablet && isFirefox || isMobile.smartphone && isFirefox) {
    var TouchLenght = true;
} else {
    var TouchLenght = false;
}


var timer = null;


if (isTouchDevice && isMobile.all !== null) {
    var TouchLenght = true;
} else if (isMobile.tablet && isFirefox || isMobile.smartphone && isFirefox) {
    var TouchLenght = true;
} else {
    var TouchLenght = false;
}


var productsPC = $('.products-hiden-mobile').get(0);
var productsMobile1 = $('.products-hiden-pc').get(0);
var productsMobile2 = $('.products-hiden-pc').get(1);
var indexFullPage = $('body').has('#indexContainer').length;

var productTrexPC = $('.products-trex-hiden-mobile').get(0);
var productTrexMobile1 = $('.products-trex-hiden-pc').get(0);
var productTrexMobile2 = $('.products-trex-hiden-pc').get(1);
var productFullPage = $('body').has('#productContainer').length;
var errorFullPage = $('body').has('#page404Container').length;

function onResize() {
    var RatioF = 810 / 1440;
    var RatioM = 542 / 768;
    var xScreen = $(window).width();
    var hScreen = $(window).height();
    var portrait = $(window).height() >= $(window).width();
    var landscape = $(window).height() < $(window).width();


    if (indexFullPage != 0) {
        $('.products-hiden-mobile').remove();
        $('.products-hiden-pc').remove();
        $.fn.fullpage.destroy('all');
        // $.fn.fullpage.setAllowScrolling(false);
    }
    if (productFullPage != 0) {
        $('.products-trex-hiden-mobile').remove();
        $('.products-trex-hiden-pc').remove();
        $.fn.fullpage.destroy('all');
    }
    if (xScreen > 1024) {
        //Xoa product home page
        $('footer').removeClass('section fp-auto-height');
        $('footer, footer .fp-tableCell').css({height: 'auto'});
        if (indexFullPage != 0) {
            var anchorsrs = ['trang-chu', 'san-pham', 'chuong-trinh', 've-chung-toi', 'footer'];
            // var anchorsrs = ['trang-chu', 'san-pham', 'chuong-trinh', 'footer'];
            $('.full-slider').after(productsPC);

            initializeIndex(false, indexFullPage, anchorsrs);
            // $.fn.fullpage.setAllowScrolling(false);
        }
        if (productFullPage != 0) {
            $('footer').before(productTrexPC);

            initializeProduct(false, productFullPage);
        }

        $('.full-slider, .slider-bg').css({height: hScreen});
        $('.history').css({height: hScreen - 99});
        $('.history-index').css({height: hScreen});
        $('.products, .product-list, .product-item').css({height: hScreen});
        $('.campaign').css({'min-height': hScreen - 99});


    } else {
        //Xoa product home page
        $('footer').addClass('section fp-auto-height');
        $('footer, footer .fp-tableCell').css({height: 'auto'});

        if (indexFullPage != 0) {
            $('.full-slider').after(productsMobile2);
            $('.full-slider').after(productsMobile1);
            var anchorsrs = ['trang-chu', 'san-pham', 'san-pham-trex', 'chuong-trinh', 've-chung-toi', 'footer'];
            // var anchorsrs = ['trang-chu', 'san-pham', 'san-pham-trex', 'chuong-trinh', 'footer'];
            initializeIndex(false, indexFullPage, anchorsrs);
        }
        if (productFullPage != 0) {
            $('footer').before(productTrexMobile1);
            $('footer').before(productTrexMobile2);
            initializeProduct(false, productFullPage);
        }

        $('footer, footer .fp-tableCell').css({height: 'auto'});
        $(".item-menu").click(function (e) {
            $('header nav .nav').removeClass('active');
            $('header .nav-but').removeClass('active');
            setTimeout(function () {
                var post = $('.products').offset().top;
                $('html, body').stop().animate({scrollTop: post - 30}, 800);
            }, 200)
        });

        $('.product-list,  .type-07 .col').css({height: 'auto'});
        $('.product-item, .full-slider .fp-tableCell, .trex-box').css({height: hScreen});

        if (portrait) {
            $('.full-slider').css({height: hScreen});
            $('.slider-bg').css({height: xScreen * RatioF});
            $('.type-07 .col, .image-slider').css({height: hScreen - 50});

        } else {
            $('.full-slider, .slider-bg').css({height: hScreen});

        }

    }


}

function resetTimeOut() {

    timex = setTimeout(";");
    for (var i = 0; i < timex; i++) {
        clearTimeout(i);
    }

}
var colIndex = 1;

function colPlay(index) {
    resetTimeOut();
    var $active = $(".cols:nth-child(" + index + ")");
    $active.removeClass('off').addClass('on');
    var isPlay = true;


    timer = setTimeout(function () {
        $active.removeClass('on').addClass('off');
        colIndex++;

        if (colIndex == 5) {
            colIndex = 1
        }
        colPlay(colIndex);

    }, 2000);


}

var isYoutube = false;
var isRun = false;
var player;


function slider() {


    if ($('.full-slider').length) {

        var duration = $('.full-bg').data('duration');
        var swiper = new Swiper('.full-bg', {
            speed: 800,
            slidesPerView: 1,
            autoplay: false,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.next-but',
            prevButton: '.back-but',
            loop: true,
            effect: "fade",
            onInit: function (swiper) {

                if ($('.full-slider .swiper-slide').eq(swiper.activeIndex).hasClass('type-white')) {
                    $('.full-slider .go-down, .full-slider .slider-nav').attr('data-type', 'type-white');
                } else {
                    $('.full-slider .go-down, .full-slider .slider-nav').attr('data-type', 'type-green');
                }

                /* resetTimeOut();
                 $('.swiper-slide').removeClass('move');
                 $('.fly-ice, .fly-orange').removeClass('play');
                 $('.swiper-slide').eq(swiper.activeIndex).addClass('move');

                 timer = setTimeout(function() { $('.fly-ice, .fly-orange').addClass('play'); }, 6000);
                 */

            },
            onTransitionStart: function (swiper) {
                resetTimeOut();
                $('.swiper-slide').removeClass('move');
                $('.fly-ice, .fly-orange').removeClass('play');
                $('.swiper-slide').eq(swiper.activeIndex).addClass('move');

                timer = setTimeout(function () {
                    $('.fly-ice, .fly-orange').addClass('play');
                }, 6000);

            },
            onTransitionEnd: function (swiper) {

                if ($('.full-slider .swiper-slide').eq(swiper.activeIndex).hasClass('type-white')) {
                    $('.full-slider .go-down, .full-slider .slider-nav').attr('data-type', 'type-white');
                    colPlay(colIndex);

                    if (isYoutube && isRun) {
                        pauseVideo();
                    }

                } else {
                    $('.full-slider .go-down, .full-slider .slider-nav').attr('data-type', 'type-green');


                    if (isYoutube && isRun) {
                        pauseVideo();
                    }
                }

            }

        });

        $('.title-top, .title-bottom').addClass('show');

    }

    if ($('.year-slider').length) {

        var mbTouch = false;
        if ($(window).width() <= 1024) {
            mbTouch = true;
        }

        var picSlider = new Swiper('.pic-slider', {
            speed: 600,
            slidesPerView: 1,
            loop: true,
            paginationClickable: true,
            effect: "fade",
            shortSwipes: mbTouch,
            simulateTouch: mbTouch,
            nextButton: '.next-pic',
            prevButton: '.back-pic',
            onInit: function (swiper) {
            },
            onTransitionStart: function (swiper) {
            },
            onTransitionEnd: function (swiper) {
            }
        });

        var yearThumbs = new Swiper('.year-slider-thumbs', {
            spaceBetween: 10,
            loop: true,
            touchRatio: 0.2,
            slideToClickedSlide: false,
            onInit: function (swiper) {
            },
            onTransitionStart: function (swiper) {
                if ($(window).width() <= 1024) {
                    var index = $('.year-slider-thumbs .swiper-slide-active').attr('data-index');
                    picSlider.slideTo(index);
                }
            },
            onTransitionEnd: function (swiper) {
            }
        });


        var type = 'vertical';
        var view = 3;
        if ($(window).width() <= 1024) {
            type = 'horizontal';
            view = 1;
        }


        var yearSlide = new Swiper('.year-slider', {
            pagination: '.swiper-pagination',
            speed: 800,
            direction: type,
            slidesPerView: view,
            loop: true,
            simulateTouch: false,
            longSwipes: false,
            shortSwipes: false,
            followFinger: false,
            onInit: function (swiper) {
            },
            onTransitionStart: function (swiper) {
            },
            onTransitionEnd: function (swiper) {

            }

        });

        var titleYear = new Swiper('.title-year-slider', {
            direction: 'vertical',
            autoplay: false,
            speed: 800,
            loop: true,
            slidesPerView: 3,
            pagination: '.pagination',
            slideToClickedSlide: true,
            onInit: function (titleYear) {

            },
            onTransitionStart: function (titleYear) {
                //click on item
                try {
                    yearSlide.slideTo(titleYear.activeIndex, 800, false);
                    var index = $('.title-year-box .swiper-slide-active').attr('data-index');
                    picSlider.slideTo(index);
                } catch (err) {
                }
            },
            onTransitionEnd: function (titleYear) {
            }

        });


        $('.year .back-but').on('click', function () {
            titleYear.slidePrev(true, 800);
        });

        $('.year .next-but').on('click', function () {
            titleYear.slideNext(true, 800);
        });


        if ($(window).width() <= 1024) {
            yearSlide.slideTo(1, 800, false);
            picSlider.params.control = yearThumbs;
            yearThumbs.params.control = yearSlide;
        }


    }
    if ($('.campaign-slider').length) {

        var camSlide = new Swiper('.campaign-slider', {
            pagination: '.swiper-pagination',
            speed: 800,
            slidesPerView: 3,
            loop: false,
            nextButton: '.next-pic',
            prevButton: '.back-pic',
            paginationClickable: true,
            spaceBetween: 20,
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                820: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                1020: {
                    slidesPerView: 2,
                    spaceBetween: 20
                }

            }

        });

    }

    if ($('.article-slider').length) {


        var thumbClick = 0;

        var thumbSlider = new Swiper('.thumb-slider', {
            speed: 800,
            slidesPerView: 10,
            spaceBetween: 8,
            loop: false,
            pagination: '.pagination',
            paginationClickable: true,
            effect: "slide",
            shortSwipes: true,
            simulateTouch: true,
            onInit: function (swiper) {

            },
            onTransitionStart: function (swiper) {
            },
            onTransitionEnd: function (swiper) {


            }

        });

        var albumSlider = new Swiper('.article-slider', {
            speed: 800,
            slidesPerView: 1,
            loop: false,
            pagination: '.pagination',
            paginationClickable: true,
            effect: "fade",
            shortSwipes: true,
            simulateTouch: true,
            nextButton: '.nav-next',
            prevButton: '.nav-prev',
            onInit: function (swiper) {

            },
            onTransitionStart: function (swiper) {

                if (thumbClick == 1) {
                    thumbClick = 0;

                } else {
                    var index = albumSlider.activeIndex;
                    thumbSlider.slideTo(index);
                    index = index + 1;
                    //$('.thumb-pic').removeClass('current');
                    $(".thumb-slider .swiper-slide").removeClass('current');
                    $(".thumb-slider .swiper-slide:nth-child(" + index + ")").addClass('current');

                }


            },
            onTransitionEnd: function (swiper) {


            }

        });


        $('.thumb-pic').on('click', function (e) {
            e.preventDefault();
            var index = $(this).parent().index() + 1;
            $('.thumb-slider .swiper-slide').removeClass('current');
            thumbClick = 1;

            $(this).parent().addClass('current');
            $(".article-album .swiper-pagination-bullet:nth-child(" + index + ")").trigger('click');

            return false;

        });


    }


}


var scroll = true;

function isScroll() {
    scroll = true;
}
var _window = $(window).width();
if (_window > 1024) {
    var anchors = ['trang-chu', 'san-pham', 'chuong-trinh', 've-chung-toi', 'footer'];
    // var anchors = ['trang-chu', 'san-pham', 'chuong-trinh', 'footer'];
} else {
    var anchors = ['trang-chu', 'san-pham', 'san-pham-trex', 'chuong-trinh', 've-chung-toi', 'footer'];
    // var anchors = ['trang-chu', 'san-pham', 'san-pham-trex', 'chuong-trinh', 'footer'];
}

initializeIndex(false, indexFullPage, anchors);

function initializeIndex(hasScrollBar, check, anchors) {

    if (check == 1) {

        $('#indexContainer').fullpage({
            anchors: anchors,
            menu: '#menu',
            lockAnchors: false,
            slidesNavigation: true,
            scrollingSpeed: 1000,
            autoScrolling: true,
            scrollBar: true,
            fitToSection: true,
            afterLoad: function (anchorLink, index) {
                if ($(window).width() <= 1024) {
                    if ($('.history-index').hasClass('active') || $('.footer-fixed').hasClass('active')) {
                        $('.history-index').addClass('off');
                    } else {
                        $('.history-index').removeClass('off');
                    }
                    if ($('.campaign-index').hasClass('active') || $('.footer-fixed').hasClass('active')) {
                        $('.campaign-index').addClass('off');
                    } else {
                        $('.campaign-index').removeClass('off');
                    }
                }
            }
        });
    }
}


initializeProduct(false, productFullPage);

function initializeProduct(hasScrollBar, check) {
    if (check == 1) {
        $('#productContainer').fullpage({
            anchors: ['vi-cam', 'vi-bac-ha-viet-quat', 'vi-dau', 'vi-luu', 'vi-sua-chua'],
            menu: '.menu',
            lockAnchors: false,
            slidesNavigation: true,
            // responsiveWidth: 1025,
            scrollingSpeed: 1000,
            autoScrolling: true,
            scrollBar: true,
            fitToSection: true,
            afterLoad: function (anchorLink, index) {

                if ($(window).width() > 1024) {

                    if (anchorLink == 'trex') {
                        timer = setTimeout(function () {
                            $('.trex-ice').addClass('play');
                        }, 4000);

                    } else {
                        resetTimeOut();
                        $('.trex-ice').removeClass('play');
                    }

                } else {

                    if ($('.products-trex-bottom').hasClass('active') || $('.footer-fixed').hasClass('active')) {
                        $('.go-product').addClass('hide');
                        $('.products-trex-bottom').addClass('off');

                    } else {
                        $('.products-trex-bottom').removeClass('off');
                    }

                }

            },
            afterResponsive: function (isResponsive) {
            }

        });

    }
}


//-----------//TOUCH//-------------//
$(function () {
    $.fn.Myswipe = function (callback) {
        var touchDown = false,
            originalPosition = null,
            $el = $(this);

        function swipeInfo(event) {
            var x = event.originalEvent.pageX || event.originalEvent.touches[0].pageX,
                y = event.originalEvent.pageY || event.originalEvent.touches[0].pageY,
                dx, dy;
            dx = (x > originalPosition.x) ? "right" : "left";
            dy = (y > originalPosition.y) ? "down" : "up";

            return {
                direction: {
                    x: dx,
                    y: dy
                },
                offset: {
                    x: x - originalPosition.x,
                    y: originalPosition.y - y
                }
            };
        }

        $el.on("touchstart mousedown", function (event) {
            touchDown = true;
            originalPosition = {
                x: event.originalEvent.pageX || event.originalEvent.touches[0].pageX,
                y: event.originalEvent.pageY || event.originalEvent.touches[0].pageY
            };
        });

        $el.on("touchend mouseup", function () {
            touchDown = false;
            originalPosition = null;
        });

        $el.on("touchmove mousemove", function (event) {
            if (!touchDown) {
                return;
            }
            var info = swipeInfo(event);
            callback(info.direction, info.offset);
        });

        return true;
    };
});

$(document).ready(function () {

    onResize();
    slider();

    if (errorFullPage != 0) {
        $('#page404Container').fullpage({
            lockAnchors: false,
            slidesNavigation: true,
            scrollingSpeed: 1000,
            autoScrolling: true,
            scrollBar: true,
            fitToSection: true
        });
    }

    $('.container').on('click', '.btn-play', function (e) {
        e.preventDefault();

        if (isYoutube) {
            isRun = true;
            player.playVideo();
            $('.type-video').addClass('show');
            $('.wideothumail, #play-button').fadeOut(500);

        }

        return false;

    });

    $('.btn-play-open').on('click', function () {
        var videoURL = 'https://www.youtube.com/embed/N7l3IkNbe2g?rel=0&amp;controls=1&amp;showinfo=0;autoplay=1';
        $('#yt-player iframe').prop('src',videoURL);
    })

    function mailTo() {
        $('.email').on('click', function (event) {
            event.preventDefault();
            var email = 'cskh@frieslandcampina.com';
            window.location = 'mailto:' + email;
        });
    }

    $(document).ready(function () {
        mailTo();
        $(".chat_fb").click(function () {
            $('#cfacebook').toggleClass("active");
            $('.fchat').fadeToggle(300);
        });
    });

    $('.full-bg, .type-02').imagesLoaded().always(function (instance) {
        //console.log('all images loaded');

    }).done(function (instance) {

        $(' .load, .load-icon, .load-bg').fadeOut(500, function () {
            $('.load-icon, .load, .load-bg').remove();

        });


    }).fail(function () {

    }).progress(function (instance, image) {

    });

    setTimeout(function () {
        $('.header-cnt').addClass('show');

    }, 100);

    $('#menu li a').click(function (e) {
        setTimeout(function () {
            $('header nav .nav, header .nav-but').removeClass('active');
        }, 100);

    });

    $('.go-top .down').click(function (e) {
        e.preventDefault();
        var post = $('.products').offset().top;
        $('html, body').stop().animate({scrollTop: post}, 800);

        return false;
    });

    $('.go-about .down').click(function (e) {
        $('.about-content').addClass('off');
        setTimeout(function () {
            $('.about-content').addClass('hide');
        }, 1000);

    });

    $('.go-product .down').click(function (e) {
        e.preventDefault();

        try {
            var post = $('.section.active').next().offset().top;
            $('html, body').stop().animate({scrollTop: post}, 800);

        } catch (err) {
        }

        return false;

    });

    $('.about-content').bind('mousewheel', function (e) {

        if (e.originalEvent.wheelDelta < 0) {
            $('.about-content').addClass('off');
            setTimeout(function () {
                $('.about-content').addClass('hide');
            }, 1000);
        }

    });

    $('.about-content').Myswipe(function (direction, offset) {

        if (direction.y == 'up') {
            setTimeout(function () {
                $('.about-content').addClass('off');
                setTimeout(function () {
                    $('.about-content').addClass('hide');
                }, 1000);
            }, 1000);

        }

    });


    $('.nav-but').click(function (e) {

        e.preventDefault();

        if ($(this).hasClass('active')) {
            $('.nav-overlay, .nav, .nav-but').removeClass('active');
            $('body,html,.container').removeClass('no-scroll');

        } else {
            $('.nav-overlay, .nav, .nav-but').addClass('active');
            $('body,html,.container').addClass('no-scroll');
        }

        return false;

    });

    $
    setTimeout(onResize, 200);


});


// ./fullpage js
window.onorientationchange = onResize;
$(window).on("orientationchange", function () {

    if ($('.pic-slider').length) {
        var picSlider = $('.pic-slider')[0].swiper;
        picSlider.onResize();

    }

    onResize();


});

$(window).resize(function () {

    if (TouchLenght == false || !isTouchDevice) {
        onResize();
    }


});


$(window).on('resize', function () {

    if (TouchLenght == false || !isTouchDevice) {
        onResize();
    }

});

$(document).on('opened', '.remodal', function () {
    $.fn.fullpage.setAllowScrolling(false);
    if ($('.term-condition-content').length) {
        $('html,body,.container').addClass('no-scroll');
        $('.term-condition-content').customScrollbar();
    }
});
$(document).on('closed', '.remodal', function () {
    $.fn.fullpage.setAllowScrolling(true);
    if ($('#yt-player').length) {
        $('#yt-player iframe').prop('src','about:blank');
    }

    if ($('.term-condition-content').length) {
        $('html,body,.container').removeClass('no-scroll');
        $('.term-condition-content').customScrollbar("remove");
    }
});
