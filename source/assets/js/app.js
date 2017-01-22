$(document).ready(function () {
    // show and hide post title in post carousel on mouseover
    $('.post').hover(
        function () {
            $('.postOver', this).css("display", "flex");
        },
        function () {
            $('.postOver', this).hide();
        }
    );
    // init slick slider
    $('#postCarousel').slick({
        accessibility: true,
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
        ]
    });


});