//preparing slick slide
$(document).ready(function(){
    //if phone size, then disable projectLists
    if ($(window).width() < 700) {
        $(".projectLists").css('display', 'block');
        $(".clickList").removeAttr('onclick');
        $('#lists > a').replaceWith(function() {
            return $('<div/>', {
                html: this.innerHTML
            });
        });
    }

    $('.slideWrapper').css('height', $(window).innerHeight() + 'px');

    $('.eachSlide').css('height', $(window).innerHeight() + 'px');

    var slide = parseInt(sessionStorage.getItem('index'));

    if(!slide){
        slide = 0;
    }

    $('.slideWrapper').slick({
        arrows:false,
        initialSlide: slide
    });


    sessionStorage.clear();
    //when initializing checking class name black to change cursor and text color
    var cur = document.getElementsByClassName('slick-current')[0].children[0];
    if(cur.classList.contains('black')){
        $('#cursor-switch').addClass('white');
        $(cur.children).addClass('white');
        $("a").hover(function(){
            $(this).css("color", "#22ffbe");
            }, function(){
            $(this).css("color", "white");
        });
    }else{
        $('#cursor-switch').removeClass('white');
        $(cur.children).removeClass('white');
        $("a").hover(function(){
            $(this).css("color", "#22ffbe");
            }, function(){
            $(this).css("color", "black");
        });
    }
});


// cursor image following cursor and changing image depending on position of mouse
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

$('.container').on('mousemove', cursorMove);

$(window).resize(function () {
    $('.slideWrapper').css('height', $(window).innerHeight() + 'px');
    $('.eachSlide').css('height', $(window).innerHeight() + 'px');
});

//when mouse leaves browser hide cursor
$('.container').mouseenter(function(){
    $('.cursor').css('display', 'block');
}).mouseleave(function(){
    $('.cursor').css('display', 'none');
});


//if clicked move to either next or previous slide
$('.container').click(function(){
    if($('.cursor').attr('data-arrow')=='left'){
        $('.slideWrapper').slick('slickPrev');
    }else{
        $('.slideWrapper').slick('slickNext');

    }
})

//when hovering click events should stop
$('a').mouseenter(function(){
    $('.container').off('click');
    $('.cursor').css('display', 'none');
}).mouseleave(function(){
    $('.container').click(function(){
        if($('.cursor').attr('data-arrow')=='left'){
            $('.slideWrapper').slick('slickPrev');
        }else{
            $('.slideWrapper').slick('slickNext');
        }
    })
    $('.cursor').css('display', 'block');

})



//changing text color and cursor color if nextslide has black background
$('.slideWrapper').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var elt = slick.$slides.get(nextSlide);
    var next = elt.children[0];
    if(next.classList.contains('black')){
        $('#cursor-switch').addClass('white');
        $(next.children).addClass('white');
        $("a").hover(function(){
            $(this).css("color", "#22ffbe");
            }, function(){
            $(this).css("color", "white");
        });
    }else{
        $('#cursor-switch').removeClass('white');
        $(next.children).removeClass('white');
        $("a").hover(function(){
            $(this).css("color", "#22ffbe");
            }, function(){
            $(this).css("color", "black");
        });
    }
});




//project lists show
function showLists(){
    if($(".projectLists").css("display") == "none"){
        $('.projectLists').slideDown();
        $('.clickList').addClass('clicked');
    }else{
        $('.projectLists').slideUp();
        $('.clickList').removeClass('clicked');
    }
}

//redirecting with parameter index
function redirect(url){
    //remembering current slide index
    var index;
    
    index = $('.slideWrapper').slick('slickCurrentSlide')

    sessionStorage.setItem('index',index);
    console.log(sessionStorage.getItem('index'));
    window.location.href = url

}
