var trainerNum;
var programNum;


//li-template 트레이너가 관리하는 프로그램 이름 목록
var liTemplateSrc = $("#li-template").html();
var templateFn = Handlebars.compile(liTemplateSrc);
$(document).ready(function() {
	/* obj.userNo로 수정할것!! */
	$.ajax(serverRoot + "/json/programMember/pList/3", {
		dataType: "json",
	    success(data) {
			$('#programList').html(templateFn({list:data}));
			trainerNum = $(".tabSelect").find("a").attr("data-trnNo");
			
			// 운동일지 전체리스트 보여주기(default page)
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
	        window.alert("report.js programTab AllList 실행 오류!");
	    }	
	});
	
	console.log("얍 " + trainerNum, programNum);
});

// 회원정보 보기 
var viewTemplateSrc = $("#view-template").html();
var viewtemplateFn = Handlebars.compile(viewTemplateSrc);

$(document.body).on('click','.trSelect', function(event){
	event.preventDefault();

	var userNo = $(this).attr("data-uno");
	/* 전체는 못보고 탭에 있는 애들만 선택해서 볼 수 있다.*/
	$.ajax(serverRoot + "/json/programMember/" + userNo + "/" + programNum, {
		dataType: "json",	
	    success(data) {
			console.log(data);
			 $('.modal-body').html(viewtemplateFn({
				 usersName: data[0].users.name,
				 usersSex: data[0].users.sex,
				 usersphon: data[0].users.userPhone,
				 name: data[0].name, 
				 startDate: data[0].startDate,
				 endDate: data[0].endDate}));
			 $('#myModal').css("display", "block");
	    },
	    error() {
	        window.alert("report.js programTab AllList 실행 오류!");
	    }	
	});
	
	$(document.body).on('click','.close', function(){
		$('#myModal').css("display", "none");
	})
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
