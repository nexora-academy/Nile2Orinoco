(function ($) {
    "use strict";

    // 1. إدارة الـ Spinner
    var hideSpinner = function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    };
    // إخفاء إجباري بعد 3 ثواني حتى لو فشل كل شيء
    setTimeout(hideSpinner, 3000);

    // 2. إعدادات جوجل للترجمة (Global)
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'ar,en,es',
            autoDisplay: false
        }, 'google_translate_element');
    };

    // 3. دالة تغيير اللغة وحفظها
    window.changeLanguage = function(lang) {
        localStorage.setItem('userLanguage', lang);
        var selectField = document.querySelector(".goog-te-combo");
        if (selectField) {
            selectField.value = lang;
            selectField.dispatchEvent(new Event('change'));
        }
    };

    // 4. التشغيل الذكي (يراقب ظهور محرك جوجل باستمرار)
    var checkTranslateReady = setInterval(function() {
        var selectField = document.querySelector(".goog-te-combo");
        var savedLang = localStorage.getItem('userLanguage');
        
        if (selectField) {
            hideSpinner(); // اخفي التحميل فوراً عند جاهزية المترجم
            if (savedLang && savedLang !== 'en') {
                window.changeLanguage(savedLang);
            }
            clearInterval(checkTranslateReady);
        }
    }, 500);

    // --- أكواد القالب الباقية (WOW, Scroll, etc.) ---
    new WOW().init();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top shadow-sm');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow-sm');
        }
    });

    $(".testimonial-carousel").owlCarousel({
        autoplay: true, smartSpeed: 2000, center: false, dots: false, loop: true, margin: 25, nav : true,
        navText : ['<i class="bi bi-arrow-left"></i>','<i class="bi bi-arrow-right"></i>'],
        responsive: { 0:{items:1}, 768:{items:2}, 1200:{items:2} }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

})(jQuery);
