function expand() {
  $('.sh-input').attr("placeholder","");
  $(".sh-searchBtn").toggleClass("sh-close");
  $(".sh-input").toggleClass("sh-square");
  if ($('.sh-searchBtn').hasClass('sh-close')) {
    $('sh-input').focus();
    $('.sh-input').attr("placeholder","지역,프로그램명");
  } else {
    $('sh-input').blur();
  }
}
$('.sh-searchBtn').on('click', expand);
