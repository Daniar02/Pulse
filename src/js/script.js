// var name = "Ivan";

// let number = 4;

// const pi = 3.14;

// number = 7;


// let leftBorderWidth = 200;

// console.log(number);
// let answer = confirm("Вам есть 18");
// console.log(answer);
// let answer = prompt("Вам есть 18", "");
// console.log(answer);
// console.log(4 + 'daniar');
// let isChecked = true,
//     isClose = false;

// console.log (isChecked && isClose)

// console.log (isChecked || isClose)
// if (2*3 == 8*1) {
//     console.log('верно')
// } else {
//     console.log('ошибка')
// }

// let answer = confirm("Вам есть 18");
// if (answer) {
//     console.log('кир')
// } else {
//     console.log('кет')
// }

// const   num =50;
// if (num < 49) {
//     console.log('неправильно')
// } else if (num > 100) {
//     console.log('Много')
// } else {
//     console.log('верно')
// }
// for (let i = 1; i < 9; i++) {
//     console.log(i);
// }
// function logging (a,b) {
//     console.log (a + b)
// }

// logging(3, 5);

// logging(15, 5);

$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }


            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    function toggleSlide(item) {
        $(item).each(function(i){
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back'); 
    
    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay,#order').fadeIn('slow');
        })
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required:true,
                    minlength:2,    
                },
                phone: "required",
                email: {
                    required: true,
                    email:true,
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефон",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Не правилно введен адрес почты"
                }
              }
        });
    };
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()){
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");


            $('form').trigger('reset');
        });
        return false;
    });
    // Smooth scroll and pageup

    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});

