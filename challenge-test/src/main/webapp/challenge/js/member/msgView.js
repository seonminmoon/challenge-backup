$(".close").click(function() {
	location.href= serverRoot + "/challenge/html/member/member-msg.html";
});
$("#sm-btn-1").click(function() {
	location.href= serverRoot + "/challenge/html/member/member-msg.html";
});


if (location.href.split("?").length > 1) {
	// var msgno = location.href.split("?")[1].split("&")[0].split("=")[1];
	var msgno = location.href.split("?")[1];
	

	$.getJSON(serverRoot + "/json/message/" + msgno, function(data) {
		// console.log(data);
		$("#mName").append(data.trainer.name);
        $("#mDate").append(data.msgDate);
        $("#mTitl").append(data.title);
        $("#mCont").append(data.content);
	});

}
