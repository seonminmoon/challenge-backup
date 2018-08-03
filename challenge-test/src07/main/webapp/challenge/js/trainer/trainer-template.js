//div#header 태그에 /html/header.html 내용을 삽입한다.
$.get(serverRoot + "/challenge/html/trainer/trainerPageTemplate.html", (data) => {
	$("#subMenu").html(data);
});