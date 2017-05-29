var $sub_headers = $('.sub-header');
var $window = $(window);


$("#dynamic-nav").on( 'click', 'a', function(event) {
    event.preventDefault();
    var element_to_scroll_to = "#" + "sh-" + $( this ).text().replace(/ /g, "").replace(/\./g, "-");
    $('html, body').animate({
        scrollTop: parseInt($(element_to_scroll_to).offset().top)
    }, 500);
});


function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($sub_headers, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    var nav_element_to_update = "#" + "dnl-" + $element.text().replace(/ /g, "").replace(/\./g, "-");

    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {

        $('#dynamic-nav').children().each(function () {
          $(this).removeClass('active');
        });

        $(nav_element_to_update).addClass('active');
    }
  });
}

$(window).on('DOMContentLoaded load resize scroll', check_if_in_view);