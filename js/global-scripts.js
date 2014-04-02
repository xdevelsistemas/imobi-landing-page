/* ----------------------------------------------------------------------
  Theme Layout & Navigation Positions   
----------------------------------------------------------------------*/

var menuPosition = 1;
var menuCount = $('#nav a').size();
var nextArrow = 40;
var preArrow = 38;
var direction = 'vertical';
var navHeight = $('#header').height();
var minimumHeight = $(window).height();

// Loader
$(window).load(function(){
   $('#loader').fadeOut();
});

function layout_options () {

    // Keyboard Navigation 
    $(document).keyup(function(e){
        if (e.keyCode == nextArrow && menuPosition < menuCount) {
            menuPosition++;
            $('#nav a:nth-child(' + menuPosition + ')').click();
        };
        if (e.keyCode == preArrow && menuPosition > 0) {
              menuPosition--;
              $('#nav a:nth-child(' + menuPosition + ')').click();
        }
    });

    $('#nav a').bind('click', function () {
      menuPosition = $('#nav a').index(this) + 1;
      if (direction == 'horizontal') {
        $('#nav a').removeClass('link-active');
        $(this).addClass('link-active');

        $('#wrapper').css({'max-height': $('.ts-section[id="' + $(this).attr('href').replace('#', '')+ '"]').outerHeight() });
        $('#wrapper').css({'max-width': $('.ts-section[id="' + $(this).attr('href').replace('#', '')+ '"]').outerWidth() });
        location.hash = $(this).attr('href');
      }
    });
    $('#nav a:first-child').click();
    $('#header #nav').removeClass('open');
}
// Fixed Top Header 
function topNav() {
  minimumHeight = $(window).height() - navHeight;

  $("#nav a").mPageScroll2id({
    offset:navHeight - 1,
  });

  $('.media-container').css({
    'min-height': minimumHeight,
    'height': minimumHeight,
    'margin-top': navHeight,
  });

  $(document).scroll(function() {    
    var scroll = $(this).scrollTop();
    if (scroll >= minimumHeight) {
      $("#header").css('border-bottom', '1px solid #eee');
    }
    else {
      $('#header').css('border-bottom', 'none');
    }
  });
}
// Fixed Bottom Header
function bottomNav() {

  // Anchor Scroll
  $("#nav a").mPageScroll2id({
    offset: navHeight -1,
  });

  $('.media-container').css({
    'min-height': minimumHeight,
    'height': minimumHeight,
  });

  $('#header').css({
    'position':'relative',
  });

  // Sticky Header
  $(document).scroll(function() {    
    var scroll = $(this).scrollTop();
    if (scroll >= minimumHeight) {
      $('#header').css({
        'position': 'fixed',
        'top':'0',
        'bottom':'inherit',
      });

      $('.media-container').css({
        'margin-bottom': navHeight,
      });
    }
    else {
      $('#header').css({
        'position': 'relative',
      });

      $('.media-container').css({
        'margin-bottom': '0',
      });
    }
  });
}


function changeMenu() {
    if ($(window).width() >= 960) {
        $('#header').addClass('horizontal');
        $('#header').hover( function(){
          $('#header').toggleClass('expanded');
        });
    } else {
        $('#header').removeClass('horizontal');
    };
}

// Horizontal Header Postion Classes
function moveToLeft () { 
  changeMenu();

  $(window).resize(function() {
      changeMenu();
  })
};


// Fixed Horizontal Header
function leftNav() {
  $("#nav a").mPageScroll2id();

  $('.media-container').css({
    'min-height': minimumHeight,
    'height': minimumHeight,
  });

  moveToLeft();

}
// Fullscreen
function fullscreen() {

  direction = 'horizontal';
  preArrow = 37;
  nextArrow = 39;
  $('<link href="css/horizontal-layout.css" rel="stylesheet">').appendTo('head');

  $('.ts-section').css('min-height', minimumHeight);
  
  $container.isotope();

  $(window).on('hashchange',function(){
    $('.ts-section').removeClass('fadeInUp');
    $(location.hash).addClass('animated fadeInUp');
  });
  
  moveToLeft();
}

/* ----------------------------------------------------------------------
 Media Container   
----------------------------------------------------------------------*/

$('.media-container .slider-bg').parallax("50%", 0.2);

var setheight = $('#slider-container .text-container').outerHeight();

$('#slider-container .text-container').css("margin-top", - setheight / 2);

$('.play').click(function(){
  $('#video-container').css('display','block');
  $('#slider-container .text-container').addClass('animated fadeOutUp');
  $('#slider-container .slider-bg').addClass('animated fadeOut');
  $('#slider-container .slider-bg').addClass('animated fadeOut');
  $('#video-container .stop-layer').css('z-index','888');

  if ($("#the-video").get(0).paused) {
      $("#the-video").get(0).play();
  }
  else {
      $("#the-video").get(0).pause();
  }
});

$('.stop-layer').click(function(){
  $(this).css('z-index','777');
  $('#slider-container .text-container').removeClass('animated fadeOutUp').addClass('animated fadeInDown');
  $("#the-video").get(0).pause();
});

/* ----------------------------------------------------------------------
 About Section   
----------------------------------------------------------------------*/
// Slider Elements (Jcycle2)
$('.box-slider').cycle();
$(".embed-video").colorbox({iframe:true, innerWidth:530, innerHeight:298});

/* ----------------------------------------------------------------------
 Partner Section   
----------------------------------------------------------------------*/
// Rezising Container
$( ".ts-partner").css({
   'height': $( ".ts-partner header .front" ).outerHeight() + 240,
});

// FLip Animation Class
$( ".ts-partner  .flip-more" ).click(function(e) {
    $( ".ts-partner  header" ).toggleClass( "flip" );
});

/* ----------------------------------------------------------------------
 Showcase Section   
----------------------------------------------------------------------*/
$('.showcase-container').cycle();

/* ----------------------------------------------------------------------
  Responsive Menu Class 
----------------------------------------------------------------------*/
$('#header .small-nav, #header #nav a').click(function(){
  $('#nav').toggleClass('open');
});
$('#header #nav').removeClass('open');


/* ----------------------------------------------------------------------
 Blog Page Animations   
----------------------------------------------------------------------*/
$('#blog').waypoint(function(direction) {
  var $items = $('.blog-items');
    $items.each(function(i){
    $(this).css({
      '-webkit-animation-delay': (i*0.1)+"s",
      '-moz-animation-delay': (i*0.1)+"s",
      '-ms-animation-delay': (i*0.1)+"s", 
      '-o-animation-delay': (i*0.1)+"s",  
      'animation-delay': (i*0.1)+"s"        
    });
  });
  $items.addClass('animated fadeInUp');
},{ offset: '70%' });

/* ----------------------------------------------------------------------
 Services   
----------------------------------------------------------------------*/
// FLip Animation Class
$( ".ts-services .padder .flip-more" ).click(function() {
    $(this).closest( ".padder" ).toggleClass( "flip" );
});


/* ----------------------------------------------------------------------
 Portfolio   
----------------------------------------------------------------------*/ 
// Vertical Align Middle function
$('.item').each(function(){
  var setMiddle = $(this).height();
  var info = $(this).find('.portfolio-info');
  $(info).css("top", (setMiddle - $(info).height()) / 2);
});

// Showing Single Project Class
$('.ts-portfolio .layer .more').click(function(){
  $('.portfolio-modal').addClass('opened animated fadeInUp');
  $('body').css('overflow','hidden');
});

// Closing Single Project Class
$('.close-button').click(function(){
  $('.portfolio-modal').removeClass('opened animated fadeInUp');
  $('body').css('overflow','inherit');
});

// Portfolio Grid (ISOTOP)
var $container = $('#portfolio-grid')

$container.isotope({
  itemSelector: '.item',
  layoutMode : 'fitRows',
});

// Portfolio Filters (ISOTOP)
$('.ts-portfolio .filter span').click(function(){
  var filterValue = $(this).attr('data-filter-value');
  $container.isotope({ filter: filterValue });
  $('.ts-portfolio .filter span').removeClass('active');
  $(this).addClass('active');
});




