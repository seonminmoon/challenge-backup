console.log(userInfo)
var receiveMsgTemplateSrc = $("#receiveMsg-template").html();
var templateFn = Handlebars.compile(receiveMsgTemplateSrc);
$.getJSON(serverRoot + "/json/message/list1/" + userInfo.userNo + "/" + userInfo.userType, (data) => {
    $(listbody).html(templateFn({list:data}));
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
	$.getJSON(serverRoot + "/json/message/list1/"+ userInfo.userNo + "/" + userInfo.userType + ";pageNo=1", (data) => {
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
	$.ajax({
		url: serverRoot + "/json/message/" + msgno,  
		dataType: "json",	
	    success: function(data) {
	    	console.log(data)
			 $('.view-body').html(viewtemplateFn({
				 imgPath: data.member.userPath,
				 member: data.member.name,
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



//add

var addTemplateSrc = $("#add-template").html();
var addtemplateFn = Handlebars.compile(addTemplateSrc);

$(document.body).on('click','.addModal', function(event){
	event.preventDefault();
	
	var msgno = $(this).attr("data-msgno");
	$.getJSON(serverRoot + "/json/message/" + msgno, function(data) {
		$('.add-body').html(addtemplateFn({
			 member: data.member.name,
			 //title: data.title,
			 //content: data.content,
			 msgDate: data.msgDate,
			 imgPath: userInfo.userPath,
			 trainer: userInfo.name,
			 }));
		$('#myAddModal').css("display", "block");
	}).done(function(data){
		$("#addBtn").click(() => {
			$.ajax({
			    type: 'POST',
		        url: '../../../json/message/add',
		        data:{
		            title: $(fTitle).val(),
		            content:$(fContent).val(),
		            direct: 2,
		            "trainer.userNo":userInfo.userNo,
		            "member.userNo":data.member.userNo
		        },
		        success:function(result){
		        	$('#myAddModal').css("display", "none");
		        	swal({
		        		type: 'success',
		        		  title: '전송 완료!',
		        		  showConfirmButton: false,
		        		  timer: 1500,
                        preConfirm: () => {
                        	location.href="trainer-receiveMsg.html"
                              }
                      })
		    		
		        }
			})
		});
	});
	
	$(document.body).on('click','.close', function(){
		$('#myAddModal').css("display", "none");
	})
	$(document.body).on('click','#msg-ok', function(){
		$('#myModal').css("display", "none");
	})
});

