$(".close").click(function() {
	location.href= serverRoot + "/challenge/html/member/member-msg.html";
});
$("#sm-btn-1").click(function() {
	location.href= serverRoot + "/challenge/html/member/member-msg.html";
});


if (location.href.split("?").length > 1) {
	var pno = location.href.split("?")[1].split("&")[0].split("=")[1];
	var uno = location.href.split("&")[1].split("=")[1];
	

	$.getJSON(serverRoot + "/json/programMember/" + pno + "/" + uno, function(data) {
		$("#mName").append(data[0].users.name);
        $("#mTel").append(data[0].users.userPhone);
        $("#mTitl").append(data[0].users.userPhone);
        $("#mCont").append(data[0].users.userPhone);
	});

}
