$(".close").click(function() {
	location.href= serverRoot + "/challenge/html/member/member-msg.html";
});


	
if (location.href.split("?").length > 1) {
	var msgno = location.href.split("?")[1];
	var receiver
	$.getJSON(serverRoot + "/json/message/" + msgno, function(data) {
		console.log(data);
		console.log(data.trainer.uesrNo);
		$("#mName").append(userInfo.name);
        $("#mName-send").append(data.trainer.name);
	}).done(function(data){
		$("#addBtn").click(() => {
			$.ajax({
			    type: 'POST',
		        url: '../../../json/message/add',
		        data:{
		            title: $(fTitle).val(),
		            content:$(fContent).val(),
		            direct: 1,
		            "member.userNo":userInfo.userNo,
		            "trainer.userNo":data.trainer.userNo
		        },
		        success:function(result){
		    		alert("답장이 전송되었습니다.");
		    		location.href="member-msg.html"
		        }
			})
		});
	});
}






/*
 $(".close").click(function() {
	location.href= serverRoot + "/challenge/html/member/member-msg.html";
});


if (location.href.split("?").length > 1) {
	var msgno = location.href.split("?")[1];
	var receiver
	$.getJSON(serverRoot + "/json/message/" + msgno, function(data) {
		console.log(data);
		console.log(data.trainer.uesrNo);
		$("#mName").append(userInfo.name);
        $("#mName-send").append(data.trainer.name);
	}).done(function(data){
		$("#addBtn").click(() => {
			$.ajax({
			    type: 'POST',
		        url: '../../../json/message/add',
		        data:{
		            title: $(fTitle).val(),
		            content:$(fContent).val(),
		            direct:userInfo.userType,
		            "member.userNo":userInfo.userNo,
		            "trainer.userNo":data.trainer.userNo
		        },
		        success:function(result){
		    		alert("okok");
		    		location.href="member-msg.html"
		        }
			})
		});
	});
}

 */
