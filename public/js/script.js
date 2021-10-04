// Menu Behaviour
$('.menu-button').on('click', () => {
    $('.navbar').removeClass('hide-navbar');
    $('.menu-button').attr('style', 'display: none;');
});
$('.close-menu-button').on('click', () => {
    $('.navbar').addClass('hide-navbar');
    $('.menu-button').removeAttr('style');
});
// Language Select
$('#lang-select').on('change', () => {
    switch ($('#lang-select').val()) {
        case 'en':
            localStorage.setItem('language', 'en');
            // Debug data
            console.log(localStorage.getItem('language'));
            // Un-comment on full server implmentation
            window.location.href = `${window.location.origin}/en`;
            break;
        case 'id':
            localStorage.setItem('language', 'id');
            // Debug data
            console.log(localStorage.getItem('language'));
            // Un-comment on full server implmentation
            window.location.href = `${window.location.origin}/id`;
            break;
    }
});
/**
 * * This is for landing backdrop to be responsive to element above it.
 **/
 $(window).on('load', () => {
    $('.backdrop').attr('style', `height: calc(${$('.hero').innerHeight()}px + 15vh + 2.5rem + 8rem)`);
});
$(window).on('resize', () => {
    $('.backdrop').attr('style', `height: calc(${$('.hero').innerHeight()}px + 15vh + 2.5rem + 8rem)`);
});
/**
 * * This is for Navbar Behaviour
 **/
$(window).on('scroll', () => {
    if (window.innerWidth > 426) {
        if (window.pageYOffset >= 10) {
            $('.navbar').addClass('navbar-contrast');
            $('.menu-button').addClass('menu-button-contrast');
        } else if (window.pageYOffset < 10) {
            $('.navbar').removeClass('navbar-contrast');
            $('.menu-button').removeClass('menu-button-contrast');
        }
    }
    if (window.pageYOffset >= 10) {
        $('.mobile-nav').addClass('mobile-nav-contrast');
    } else if (window.pageYOffset < 10) {
        $('.mobile-nav').removeClass('mobile-nav-contrast');
    }
});
// Create dynamic href link
if (localStorage.getItem('language') === 'en') {
    $('.hero-buttons > #form').attr('href', `${window.location.origin}/en/contact`);
    $('.logo > a').attr('href', `${window.location.origin}/en`);
    $('#contact-footer').attr('href', `${window.location.origin}/en/contact`);
} else if (localStorage.getItem('language') === 'id') {
    $('.hero-buttons > #form').attr('href', `${window.location.origin}/id/contact`);
    $('.logo > a').attr('href', `${window.location.origin}/id`);
    $('#contact-footer').attr('href', `${window.location.origin}/id/contact`);
}