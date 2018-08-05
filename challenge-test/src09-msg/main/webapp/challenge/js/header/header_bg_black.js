//div#header 태그에 /html/header.html 내용을 삽입한다.

var userInfo;

$.ajax({
	method: "GET",
	url : serverRoot + "/challenge/html/header/header_bg_black.html",
	async: false
}).done(function(data) {
	$("#header").html(data);	
	
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
			  
			  	if (userInfo.userType == 1) { // 회원
			  		
			  	} else if (userInfo.userType == 2) { // 트레이너
			  		
			  	}
			  
			  
			  	$("#sh-user-img").attr("src","../../../files/" + userInfo.userPath);
				$(".login_menu_before").attr("style", "display:none")
				$("#sh-user-name").html(userInfo.name)
				$("#logoutBtn").click((e) => {
					e.preventDefault(); // 클릭했을 때 원래 하던 일이 있는데 그것을 하지 말라!
					$.get(serverRoot + "/json/auth/logout", () => {
						location.href = serverRoot + "/challenge/html/login/login.html";
					}); 
				});
			} else {
				$(".login_menu_after").attr("style", "display:none")
			}


	  });
	console.log("============================userInfo 객체=======================================");
	console.log(userInfo);
	console.log("================================================================================");

	//로그인 여부(obj객체 유무에 따라)에 따른 헤더 Nav 메뉴 변경
	
	if(userInfo != null) {
		$(".login_menu_before").attr("style", "display:none")
		$("#sh-user-name").html(userInfo.name)
		$("#logoutBtn").click((e) => {
			e.preventDefault(); // 클릭했을 때 원래 하던 일이 있는데 그것을 하지 말라!
			$.get(serverRoot + "/json/auth/logout", () => {
				location.href = serverRoot + "/challenge/html/login/login.html";
			}); 
		});
	} else {
		$(".login_menu_after").attr("style", "display:none")
	}

	
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