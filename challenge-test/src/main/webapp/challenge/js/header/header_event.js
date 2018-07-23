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

//로그인 한 사람만 쓸 수 있는 페이지에 넣어줄 function.header에 이 function 저장되어있음
//loadLoginUser();

 
//로그인 여부에 따른 헤더 Nav 메뉴 변경
(function () {
	$.getJSON(serverRoot + "/json/auth/loginUser")
	.done(function(data) { // 로그인 O
		console.log(data)
		$(".login_menu_before").attr("style", "display:none")
		$("#logoutBtn").click((e) => {
			e.preventDefault(); // 클릭했을 때 원래 하던 일이 있는데 그것을 하지 말라!
			$.get(serverRoot + "/json/auth/logout", () => {
				location.href = serverRoot + "/challenge/html/login/login.html";
			});
		});
	})
	.fail(function(data) { // 로그인 X
		$(".login_menu_after").attr("style", "display:none")
	})
})();


