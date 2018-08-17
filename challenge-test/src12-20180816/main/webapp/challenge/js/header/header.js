// 현재 url 파악하여 그에 따른 header css붙여주기.


//div#header 태그에 /html/header.html 내용을 삽입한다.
var userInfo;
$.ajax({
	method: "GET",
	url : serverRoot + "/challenge/html/header/header.html",
	async: false
}).done(function(data) {
	
	// URL 저장
	var pathName = $(location).attr('pathname').split('/')[4];
	
	// main과 timeline check한 후 css 적용
	if (pathName == "main") {
		$('#header').html(data).find('#header-type').attr("href", "../../css/header/header_black.css")
	} else if (pathName == "timeline") {
		$('#header').html(data).find('#header-type').attr("href", "../../css/header/header_bg_black.css")
	} else {
		$('#header').html(data).find('#header-type').attr("href", "../../css/header/header_white.css")
		$('#sh_logo').attr("src", "../../img/header/red-logo.png");
	}

	//USER 객체 정보 저장
	$.ajax({
		method: "GET",
		dataType: "json",
		url: serverRoot + "/json/auth/loginUser",
		async: false
	})
	.done(function(data) {
		userInfo = data;
		if(userInfo != null) {
			
			// alarm hover eventListener 등록
			$("#sh-alarm").hover(function() {
				$("#sh-msg-dropdown-content").css("display", "block");
			}, function() {
				$("#sh-msg-dropdown-content").css("display", "none");
			});
			
			// userType에 따른 hover eventListener 등록
			if (userInfo.userType == 1) { // 회원
				// 회원으로 들어옴
				$("#sh_top_menu_user").hover(
						function() {
							$("#member-mypage").css("display", "block");
						}, function() {
							$("#member-mypage").css("display", "none");
						});
			} else if (userInfo.userType == 2) { // 트레이너
				$("#sh_top_menu_user").hover(
						function() {
							$("#trainer-mypage").css("display", "block");
						}, function() {
							$("#trainer-mypage").css("display", "none");
						});
			}

			// userImage
			$("#sh-user-img").attr("src","../../../files/" + userInfo.userPath);

			//로그인 여부(obj객체 유무에 따라)에 따른 헤더 Nav 메뉴 변경
			$(".login_menu_before").attr("style", "display:none");
			$("#sh-user-name").html(userInfo.name);
			$("#logoutBtn").click((e) => {
				console.log("로그아웃버튼 클릭됨")
				e.preventDefault(); // 클릭했을 때 원래 하던 일이 있는데 그것을 하지 말라!
				$.get(serverRoot + "/json/auth/logout", () => {
					location.href = serverRoot + "/challenge/html/login/login3.html";
				}); 
			});
		} 
	})
	.error(function() { // 로그인 하지 않았을 경우
		$(".login_menu_after").attr("style", "display:none")
	});
	console.log("============================userInfo 객체=======================================");
	console.log(userInfo);
	console.log("================================================================================");
});

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



function headerSearchEvent() {
	console.log("searchEvent 실행!")
	location.href = serverRoot + "/challenge/html/search/search.html?keyword=" + $('#keywordHeader').val();
}

$('#keywordHeader').keypress(function() {
	if(event.keyCode ===13) {
		console.log("엔터침!")
		event.preventDefault();
		headerSearchEvent();
	}
})

