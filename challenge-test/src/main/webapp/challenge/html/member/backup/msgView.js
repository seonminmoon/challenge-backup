/*
$(".close").click(function() {
	location.href= serverRoot + "/challenge/html/member/member-msg.html";
});
$("#msg-ok").click(function() {
	location.href= serverRoot + "/challenge/html/member/member-msg.html";
});
$("#msg-re").click(function() {
	location.href= serverRoot + "/challenge/html/member/member-msgRe.html";
});

if (location.href.split("?").length > 1) {
	var msgno = location.href.split("?")[1];
	

	$.getJSON(serverRoot + "/json/message/" + msgno, function(data) {
		console.log(data);
		$("#mName").append(data.trainer.name);
        $("#mDate").append(data.msgDate);
        $("#mTitl").append(data.title);
        $("#mCont").append(data.content);
	});

}
*/



var viewTemplateSrc = $("#view-template").html();
var viewtemplateFn = Handlebars.compile(viewTemplateSrc);

$(document.body).on('click','.viewSelect', function(event){
	event.preventDefault();

	var msgno = $(this).attr("data-msgno");
	console.log(msgno)
	$.ajax(serverRoot + "/json/message/" + msgno, {
		dataType: "json",	
	    success(data) {
			$('#myModal').css("display", "block");
			console.log(data)
			 $('.view-body').html(viewtemplateFn({
				 title: data.title,
				 content: data.content,
				 msgDate: data.msgDate,
				 "trainer.name": data.trainer.name}));
	    },
	    error() {
	        window.alert("실행 오류!");
	    }	
	});
	
	$(document.body).on('click','.close', function(){
		$('#myModal').css("display", "none");
	})
});












