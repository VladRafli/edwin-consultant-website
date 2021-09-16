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
            // window.location.href = '/en';
            break;
        case 'id':
            localStorage.setItem('language', 'id');
            // Debug data
            console.log(localStorage.getItem('language'));
            // Un-comment on full server implmentation
            // window.location.href = '/id';
            break;
    }
});