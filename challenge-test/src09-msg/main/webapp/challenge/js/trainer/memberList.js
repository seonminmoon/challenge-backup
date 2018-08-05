var trainerNum;
var programNum;


//li-template 트레이너가 관리하는 프로그램 이름 목록
var liTemplateSrc = $("#li-template").html();
var templateFn = Handlebars.compile(liTemplateSrc);
/* userInfo로 수정할것!! */
$.ajax(serverRoot + "/json/programMember/pList/" + userInfo.userNo, {
	dataType: "json",
    success(data) {
		$('#programList').html(templateFn({list:data}));
		trainerNum = $(".tabSelect").find("a").attr("data-trnNo");
		console.log("a뭥밍"+ trainerNum);
		// 담당 트레이너 회원 전체리스트 보여주기(default page)
		$.ajax(serverRoot + "/json/programMember/list/" + trainerNum, {
			dataType: "json",	
		    success(data) {
				 $('#memberList').html(membTemplateFn({
					 list:data}));
		    },
		    error() {
		        window.alert("프로그램 등록 후 이용해 주세요!");
		    }	
		});
	},
    error() {
        window.alert("memberList.js li-template default list 실행 오류!");
    }
});

var membTemplateSrc = $("#member-template").html();
var membTemplateFn = Handlebars.compile(membTemplateSrc);
/* 탭 메뉴 이벤트 */
$(document.body).on('click','.tabSelect', function(event){
	event.preventDefault();
	if ($(".tabSelect").find(".active")) {
		$(".tabSelect").removeClass("active");
	}
	$(this).addClass("active");
	
	trainerNum = $(".tabSelect").find("a").attr("data-trnNo");
	programNum = $(this).find("a").attr("data-pno");
	// 전체 프로그램 리스트 뽑아오기(탭으로 선택시)
	if(typeof programNum == "undefined") {
		$.ajax(serverRoot + "/json/programMember/list/" + trainerNum, {
			dataType: "json",	
		    success(data) {
				 $('#memberList').html(membTemplateFn({
					 list:data}));
		    },
		    error() {
		        window.alert("report.js programTab AllList 실행 오류!");
		    }	
		});
		return;
	}

	// 항목별로 프로그램 리스트 뽑아오기
	$.ajax(serverRoot + "/json/programMember/list/" + programNum + "/" + trainerNum, {
		dataType: "json",	
	    success(data) {
			 $('#memberList').html(membTemplateFn({
				 list:data}));
	    },
	    error() {
	        window.alert("report.js programTab 항목별 AllList 실행 오류!");
	    }	
	});
});

// 회원정보 보기 
var viewTemplateSrc = $("#view-template").html();
var viewtemplateFn = Handlebars.compile(viewTemplateSrc);
var addTemplateSrc = $("#add-template").html();
var addtemplateFn = Handlebars.compile(addTemplateSrc);

$(document.body).on('click','.trSelect', function(event){
	event.preventDefault();

	var userNo = $(this).attr("data-uno");
	programNum = $(this).attr("data-pno");
	/* 전체는 못보고 탭에 있는 애들만 선택해서 볼 수 있다.*/
	$.ajax(serverRoot + "/json/programMember/" + userNo + "/" + programNum, {
		dataType: "json",	
	    success(data) {
			 $('.modal-body').html(viewtemplateFn({
				 usersName: data[0].user.name,
				 usersSex: data[0].user.sex,
				 usersphon: data[0].user.userPhone,
				 name: data[0].program.name, 
				 startDate: data[0].program.startDate,
				 endDate: data[0].program.endDate}));
			 $('#myModal').css("display", "block");
	    },
	    error() {
	        window.alert("report.js programTab AllList 실행 오류!");
	    }	
	});
	$(document.body).on('click','.close', function(){
		$('#myModal').css("display", "none");
	})
	$(document.body).on('click','.msgSend', function(){
		$('#myModal').css("display", "none"); // 원래 있던 모달 창 지우기
		
		event.preventDefault();
		$.ajax(serverRoot + "/json/programMember/" + userNo + "/" + programNum, {
			dataType: "json",	
			success(data) {
				$('.add-body').html(addtemplateFn({
				 member:  data[0].user.name,
				 /*
				 title: data.title,
				 content: data.content,
				 msgDate: data.msgDate,
				 */
				 trainer: userInfo.name,
				 }));
				$('#myAddModal').css("display", "block");
			}
		}).done(function(data){
			$("#addBtn").click(() => {
				console.log(data)
				$.ajax({
				    type: 'POST',
			        url: '../../../json/message/add',
			        data:{
			            title: $(fTitle).val(),
			            content:$(fContent).val(),
			            direct: 2,
			            "trainer.userNo":userInfo.userNo,
			            "member.userNo":data[0].user.userNo,
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
		$(document.body).on('click','.addClose', function(){
			$('#myAddModal').css("display", "none");
		});
		$(document.body).on('click','#resetBtn', function(){
			$('#myAddModal').css("display", "none");
		});
	});
	

});

// 회원정보 보기
//if (location.href.split("?").length > 1 && location.href.split("&").length > 1) {
//	var pno = location.href.split("?")[1].split("&")[0].split("=")[1];
//	var uno = location.href.split("&")[1].split("=")[1];
//
//	$.getJSON(serverRoot + "/json/programMember/" + pno + "/" + uno, function(data) {
//		$("#mName").append(data[0].users.name);
//        $("#mSex").append(data[0].users.sex);
//        $("#mTel").append(data[0].users.userPhone);
//        $("#mProgram").append(data[0].name);
//				$("#mDate1").append(data[0].startDate);
//				$("#mDate2").append(data[0].endDate);
//        $("#mTarget").append(data[0].proGoal);
//        $("#mAttend").append(data[0].diarys.dcheck);
//        $("#mTargetPer").append(data[0].proGoalNum);
//	});
//	
//	$('.modal').css("display", "block");
//
//	$(".close").click(function() {
//		location.href=  "memberList.html";
//		});
//
//} else if (location.href.split("?").length > 1) { // 프로그램별로 회원 리스트 보기
//	var pno = location.href.split("?")[1].split("=")[1];
//	$('#memberList tr').css('display','none');
//	$.ajax(serverRoot + "/json/programMember/list/" + pno, {
//		dataType: "json",	
//	    success(data) {
//	        for (var item of data) {
//	        	var tr = document.createElement("tr");
//	        	tr.innerHTML = "<td><a href='memberList.html?pno=" + item.no + 
//	        	"&uno=" + item.users.userNo +"'>"
//	        	+ item.users.email + "</a></td>" +
//	        	"<td><a href='memberList.html?pno=" + item.no + 
//	        	"&uno=" + item.users.userNo +"'>"
//	        	+ item.users.name + "</a></td>" +
//	        	"<td><a href='memberList.html?pno=" + item.no + 
//	        	"&uno=" + item.users.userNo +"'>"
//	        	+ item.users.sex + "</a></td>" +
//	        	"<td><a href='memberList.html?pno=" + item.no + 
//	        	"&uno=" + item.users.userNo +"'>"
//	        	+ item.name +"</a></td>" +
//	        	"<td><a href='memberList.html?pno=" + item.no + 
//	        	"&uno=" + item.users.userNo +"'>"
//	        	+ item.diarys.dcheck +"</a></td>";  
//	        	memberList.appendChild(tr);
//	        }
//	    },
//	    error() {
//	        window.alert("member.js view list 실행 오류!");
//	    }	
//	});
//} else if (serverRoot + "/challenge/html/trainer/memberList.html") { // 프로그램별로 회원 리스트 보기
//	$.ajax(serverRoot + "/json/programMember/list", {
//		dataType: "json",	
//	    success(data) {
//	        for (var item of data) {
//	        	var tr = document.createElement("tr");
//	        	tr.innerHTML = "<td><a href='memberList.html?pno=" + item.no + 
//	        	"&uno=" + item.users.userNo +"'>"
//	        	+ item.users.email + "</a></td>" +
//	        	"<td><a href='memberList.html?pno=" + item.no + 
//	        	"&uno=" + item.users.userNo +"'>"
//	        	+ item.users.name + "</a></td>" +
//	        	"<td><a href='memberList.html?pno=" + item.no + 
//	        	"&uno=" + item.users.userNo +"'>"
//	        	+ item.users.sex + "</a></td>" +
//	        	"<td><a href='memberList.html?pno=" + item.no + 
//	        	"&uno=" + item.users.userNo +"'>"
//	        	+ item.name +"</a></td>" +
//	        	"<td><a href='memberList.html?pno=" + item.no + 
//	        	"&uno=" + item.users.userNo +"'>"
//	        	+ item.diarys.dcheck +"</a></td>";  
//	        	memberList.appendChild(tr);
//	        }
//	    },
//	    error() {
//	        window.alert("member.js view list 실행 오류!");
//	    }	
//	});
//}
