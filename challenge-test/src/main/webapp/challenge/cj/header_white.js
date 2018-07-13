function expand() {
  $('input').attr("placeholder","");
  $(".search").toggleClass("close");
  $(".input").toggleClass("square");
  if ($('.search').hasClass('close')) {
    $('input').focus();

    $('input').attr("placeholder","지역,프로그램명");
  } else {
    $('input').blur();
  }
}
$('button').on('click', expand);
