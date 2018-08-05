$.ajax({
	method: "GET",
	url : serverRoot + "/challenge/html/timeline/sideMenu.html",
	async: false
}).done(function(data) {
	$("#sh-sideMenu-item").html(data);
	$("#side-user-img").attr("src","../../../files/" + userInfo.userPath)
})