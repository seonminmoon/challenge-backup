//div#header 태그에 /html/header.html 내용을 삽입한다.
$.get(serverRoot + "/html7/footer/html/footer.html", (data) => {
	$("#footer").html(data);
});