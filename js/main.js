(function ($) {
    "use strict";

    // 1. Spinner - تم تعديله ليضمن الاختفاء عند الترجمة
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1000); // زدنا الوقت قليلاً لضمان استقرار الصفحة
    };
    spinner();
    
    // 2. دوال الترجمة (Google Translate)
    // دالة التهيئة
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'ar,en,es',
            autoDisplay: false
        }, 'google_translate_element');
    };

    // دالة تغيير اللغة وحفظها
    window.changeLanguage = function(lang) {
        localStorage.setItem('userLanguage', lang);
        var selectField = document.querySelector(".goog-te-combo");
        if (selectField) {
            selectField.value = lang;
            selectField.dispatchEvent(new Event('change'));
        }
    };

    // مراقبة تحميل الصفحة لتطبيق اللغة المحفوظة تلقائياً
    $(window).on('load', function () {
        var checkTranslate = setInterval(function() {
            var selectField = document.querySelector(".goog-te-combo");
            var savedLang = localStorage.getItem('userLanguage');
            if (selectField) {
                if (savedLang && savedLang !== 'en') {
                    changeLanguage(savedLang);
                }
                clearInterval(checkTranslate);
            }
        }, 500);
    });

    // --- بقية أكواد القالب الأصلي ---

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top shadow-sm');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow-sm');
        }
    });

    // Testimonial-carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{items:1},
            576:{items:1},
            768:{items:2},
            992:{items:2},
            1200:{items:2}
        }
    });

   // Back to top button
   $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);
