if (location.href.split("?").length > 1) {
	var pno = location.href.split("?")[1].split("&")[0].split("=")[1];
	var uno = location.href.split("&")[1].split("=")[1];

	$.getJSON(serverRoot + "/json/programMember/" + pno + "/" + uno, function(data) {
		$("#mName").append(data[0].users.name);
        $("#mSex").append(data[0].users.sex);
        $("#mTel").append(data[0].users.userPhone);
        $("#mProgram").append(data[0].name);
				$("#mDate1").append(data[0].startDate);
				$("#mDate2").append(data[0].endDate);
        $("#mTarget").append(data[0].proGoal);
        $("#mAttend").append(data[0].diarys.dcheck);
        $("#mTargetPer").append(data[0].proGoalNum);
	});

	$(".close").click(function() {
		location.href= serverRoot + "/challenge/html/trainer/memberList.html";
		});

}
