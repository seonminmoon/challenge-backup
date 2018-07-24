//div#header 태그에 /html/header.html 내용을 삽입한다.
$.get("/challenge-project/html7/sm/tr-menu.html", (data) => {
	$("#tr-menu").html(data);
});
