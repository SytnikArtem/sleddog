$(document).ready(function() {
    var linkItem = $('.link-item');
    var listDrop = $('.list-drop');
    var btnDrop = $('.drop-btn');
    var slickSlider = $('.sixth-slider');
    var dropLine = $('.drop-line');
    var dropHide = $('.drop-hide');
    var commentItem = $('.seventh-comment');
    var commentBlock = $('.seventh-review-container');
    var videoItem = $('.fourth-item');
    var videoBlock = $('.fourth-block');
    var searchBtn = $('.fixed-header-img');
    var cartPopup = $('.cart-popup');
    var cartBtn = $('.line-like-img');
    linkItem.hover(function(){
        $(this).parent().siblings().find(listDrop).removeClass('active');
        $(this).parent().find(listDrop).eq(0).addClass('active');
        $(this).parent().siblings().find(linkItem).removeClass('active');
        $(this).addClass('active');
    });
    linkItem.click(function(e){
        e.preventDefault();
        $(this).parent().siblings().find(listDrop).removeClass('active');
        $(this).parent().find(listDrop).eq(0).addClass('active');
        $(this).parent().siblings().find(linkItem).removeClass('active');
        $(this).addClass('active');

    });
    btnDrop.click(function(){
        $(this).closest(dropLine).find(dropHide).toggleClass('active');
        $(this).closest(dropLine).toggleClass('active');
        $(listDrop).removeClass('active')
    });
    cartBtn.click(function(){
        var thisPopup = $(this).parent().find(cartPopup);
        if (thisPopup.hasClass('active')) {
            thisPopup.removeClass('active')
        }
        else {
            $('.cart-popup').removeClass('active');
            thisPopup.addClass('active');
        }

    });
    slickSlider.slick({
        slidesToShow: 4
    });
    var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       100,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null // optional scroll container selector, otherwise use window
        }
    );
    wow.init();
    function showComment(){
        var commentHeight = commentItem.outerHeight();
        commentBlock.height(commentHeight * 4);
        var commentsNumber = commentItem.length;
        console.log(commentsNumber);
        $('.show-comments').click(function(){
            $(this).toggleClass('active');
            if($(this).hasClass('active')) {
                commentBlock.height(commentHeight * commentsNumber);
            }
            else {
                commentBlock.height(commentHeight * 4);
            }
        });
    }
    function showVideo(){
        var videoHeight = videoItem.outerHeight() + 20;
        videoBlock.height(videoHeight);
        var commentsNumber = commentItem.length / 3;
        console.log(commentsNumber);
        $('.show-videos').click(function(e){
            e.preventDefault();
            $(this).toggleClass('active');
            if($(this).hasClass('active')) {
                videoBlock.height(videoHeight * Math.ceil(commentsNumber));
            }
            else {
                videoBlock.height(videoHeight);
            }
        });
    }
    showVideo();
    showComment();
    searchBtn.click(function(){
       $('.fixed-header-search').addClass('active');
    });
});
$(window).scroll(function(){
    var fixedHeader = $('.fixed-header');
    var header = $('.header');
    var listDrop = $('.list-drop');
    if ($(this).scrollTop() > header.height()) {
        fixedHeader.addClass('active');
    } else {
        fixedHeader.removeClass('active');
        $('.fixed-header-flex').removeClass('active');
        fixedHeader.find('.drop-hide').removeClass('active');
        listDrop.removeClass('active');
        $('.cart-popup').removeClass('active')
    }
});