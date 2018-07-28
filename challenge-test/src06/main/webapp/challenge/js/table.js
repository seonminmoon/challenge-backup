//div#header 태그에 /html/table.html 내용을 삽입한다.
$.get(serverRoot + "/challenge/html/table.html", (data) => {
	$("#common-table").html(data);
});