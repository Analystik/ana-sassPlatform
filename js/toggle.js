$('.burger').click(function(e){
        $('.menu-mobile').addClass('open')
        e.stopPropagation();
    });

$('.enbref h2').click(function() {
        $('.enbref').toggleClass('open')
    });

$('html').click(function() {
if($('.menu-mobile').hasClass('open')){
    $('.menu-mobile').removeClass('open')
} else {
    return
}

})
