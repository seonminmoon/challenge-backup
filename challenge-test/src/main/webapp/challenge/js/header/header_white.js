//div#header 태그에 /html/header.html 내용을 삽입한다.
$.get(serverRoot + "/challenge/html/header/header_white.html", (data) => {
	$("#header").html(data);
});

//로그인 한 유저 정보 받아오기
function loadLoginUser() {

	$.getJSON(serverRoot + "/json/auth/loginUser", (data) => {
		console.log(data)
	}).fail(() => {
		location.href = serverRoot + "/challenge/html/login/login.html";
	});

}