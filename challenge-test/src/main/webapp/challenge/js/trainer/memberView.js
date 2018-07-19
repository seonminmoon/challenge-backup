if (location.href.split("?").length > 1) {    
	var no = location.href.split("?")[1].split("=")[1];
	
	$.getJSON(serverRoot + "/json/programMember/" + no, function(data) {
        $("#mName").append(data.members.name);
        $("#mSex").append(data.members.sex);
        $("#mTel").append(data.members.userPhone);
        $("#mProgram").append(data.name);
        $("#mTarget").append(data.proGoal);
        $("#mAttend").append(data.diary.dcheck);
        $("#mTargetPer").append(data.proGoalNum);
	});
	
	$(".close").click(function() {
		location.href= serverRoot + "/challenge/html/trainer/memberList.html";
		});
	
}