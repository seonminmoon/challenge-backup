//div#header 태그에 /html/header.html 내용을 삽입한다.
$.get(serverRoot + "/challenge/html/member/mb-menu.html", (data) => {
	$("#mb-menu").html(data);
});

//회원정보 읽어오기
$(document).ready(function () {
	$('#profile-name').html(userInfo.name);
	$('#profile-photo').attr("src","../../../files/" + userInfo.userPath);
	//$("<img>").attr('src', '../../../files/'+ userInfo.userPath).css('border-radius', '50%').appendTo('#images-div');
});