
setTimeout(function(){
    $(document).ready(function(){
        $('.subSlideWrapper').slick({
            infinite:true,
            arrows:false,
        });
    });
},700);

function cursorMove(){
    var mouseX = event.pageX;
    var mouseY = event.pageY;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var x = event.clientX;
    var y = event.clientY;
    $('.cursor').css({
        'left' : x + 'px',
        'top' : y + 'px' 
    });

    if(mouseX<(width/2)){

        $('#cursor-switch').removeClass('right')
        $('#cursor-switch').addClass('left')
        $('#cursor-switch').attr('data-arrow', 'left');

    }else{
        $('#cursor-switch').removeClass('left')
        $('#cursor-switch').addClass('right')
        $('#cursor-switch').attr('data-arrow', 'right');
    }
}

$('body').on('mousemove', cursorMove);

//when mouse leaves browser hide cursor
$('body').mouseenter(function(){
    $('.cursor').css('display', 'block');
}).mouseleave(function(){
    $('.cursor').css('display', 'none');
});

//if clicked move to either next or previous slide
$('body').click(function(){
    if($('.cursor').attr('data-arrow')=='left'){
        $('.subSlideWrapper').slick('slickPrev');
    }else{
        $('.subSlideWrapper').slick('slickNext');
    }
})

//when hovering click events should stop
$('a').mouseenter(function(){
    $('body').off('click');
    $('.cursor').css('display', 'none');
}).mouseleave(function(){
    $('body').click(function(){
        if($('.cursor').attr('data-arrow')=='left'){
            $('.subSlideWrapper').slick('slickPrev');
        }else{
            $('.subSlideWrapper').slick('slickNext');
        }
    })
    $('.cursor').css('display', 'block');

})

// paging 
var $status = $('.status');
var $slickElement = $('.subSlideWrapper');

$slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + '/' + slick.slideCount);
});

//redirecting with parameter index
function redirectHome(url){
    window.location.href = url
}