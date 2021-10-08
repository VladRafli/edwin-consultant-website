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
$('#en-footer').on('click', (event) => {
    event.preventDefault();
    localStorage.setItem('language', 'en');
    // Debug data
    console.log(localStorage.getItem('language'));
    // Un-comment on full server implmentation
    window.location.href = `${window.location.origin}/en`;
});
$('#id-footer').on('click', (event) => {
    event.preventDefault();
    localStorage.setItem('language', 'id');
    // Debug data
    console.log(localStorage.getItem('language'));
    // Un-comment on full server implmentation
    window.location.href = `${window.location.origin}/id`;
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
// Create dynamic href link
if (localStorage.getItem('language') === 'en') {
    $('.logo-mobile > a').attr('href', `${window.location.origin}/en`);
    $('.hero-buttons > #form').attr('href', `${window.location.origin}/en/contact`);
    $('.logo > a').attr('href', `${window.location.origin}/en`);
    $('#contact-footer').attr('href', `${window.location.origin}/en/contact`);
    $('#management-form > a').attr('href', `${window.location.origin}/en/contact?pid=management`);
    $('#taxation-form > a').attr('href', `${window.location.origin}/en/contact?pid=taxation`);
    $('#accounting-form > a').attr('href', `${window.location.origin}/en/contact?pid=accounting`);
} else if (localStorage.getItem('language') === 'id') {
    $('.logo-mobile > a').attr('href', `${window.location.origin}/id`);
    $('.hero-buttons > #form').attr('href', `${window.location.origin}/id/contact`);
    $('.logo > a').attr('href', `${window.location.origin}/id`);
    $('#contact-footer').attr('href', `${window.location.origin}/id/contact`);
    $('#management-form > a').attr('href', `${window.location.origin}/id/contact?pid=management`);
    $('#taxation-form > a').attr('href', `${window.location.origin}/id/contact?pid=taxation`);
    $('#accounting-form > a').attr('href', `${window.location.origin}/id/contact?pid=accounting`);
}