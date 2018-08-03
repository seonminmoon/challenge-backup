
var sendMsgTemplateSrc = $("#sendMsg-template").html();
var sendMsgtemplateFn = Handlebars.compile(sendMsgTemplateSrc);
$.getJSON(serverRoot + "/json/message/list1/" + userInfo.userNo + "/" + userInfo.userType, (data) => {
    $(listbody).html(sendMsgtemplateFn({list:data}));
});


var $pageClick = $('.sm-pagination a');
$pageClick.on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    if ($this.hasClass('pageActive')) {
        return;
    }
    $pageClick.removeClass('pageActive');
    $this.addClass('pageActive');
});


$("#page-1").click(function() {
	$.getJSON(serverRoot + "/json/message/list1/"+ userInfo.userNo + "/" + userInfo.userType +  ";pageNo=1", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});

$("#page-2").click(function() {
	$.getJSON(serverRoot + "/json/message/list1/"+ userInfo.userNo + "/" + userInfo.userType + ";pageNo=2", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});

$("#page-3").click(function() {
	$.getJSON(serverRoot + "/json/message/list1/"+ userInfo.userNo + "/" + userInfo.userType + ";pageNo=3", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});

$("#page-4").click(function() {
	$.getJSON(serverRoot + "/json/message/list1/"+ userInfo.userNo + "/" + userInfo.userType + ";pageNo=4", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});



//view

var viewTemplateSrc = $("#view-template").html();
var viewtemplateFn = Handlebars.compile(viewTemplateSrc);

$(document.body).on('click','.viewSelect', function(event){
	event.preventDefault();

	var msgno = $(this).attr("data-msgno");
	console.log(msgno)
	$.ajax({
		url: serverRoot + "/json/message/" + msgno,  
		dataType: "json",	
	    success: function(data) {
			 $('.view-body').html(viewtemplateFn({
				 userName: userInfo.name,
				 title: data.title,
				 content: data.content,
				 msgDate: data.msgDate,
				 }));
			$('#myModal').css("display", "block");
	    },
	    error() {
	        window.alert("실행 오류!");
	    }	
	});
	
	$(document.body).on('click','.close', function(){
		$('#myModal').css("display", "none");
	})
	$(document.body).on('click','#msg-ok', function(){
		$('#myModal').css("display", "none");
	})
});