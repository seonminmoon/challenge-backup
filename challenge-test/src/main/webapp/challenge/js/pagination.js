//div#pagination 태그에 /html/pagination.html 내용을 삽입한다.
$.get(serverRoot + "/challenge/html/pagination.html", (data) => {
	$(".pagination").html(data);
});