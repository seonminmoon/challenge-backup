var plano;
var pno;
var defaultPage;
var startDate;
var endDate;
var ptover;
var pageNum = 1;
var pageSize = 12;

//var pageTemplateSrc = $("#pagenationList").html();
//var pagetemplateFn = Handlebars.compile(pageTemplateSrc);

// li-template 트레이너가 관리하는 프로그램 이름 목록
var liTemplateSrc = $("#li-template").html();
var templateFn = Handlebars.compile(liTemplateSrc);
$(document).ready(function() {	
	$.ajax(serverRoot + "/json/plan/pList/" + userInfo.userNo, {
		dataType: "json",
	    success(data) {
			$('#programList').html(templateFn({list:data}));
			defaultPage = $('.active').find('a').attr('data-last');
			startDate = $('.active').find('a').attr('data-sdt');
			endDate = $('.active').find('a').attr('data-edt');
			ptover = $('.active').find('a').attr('data-ptover');
			// 운동일지 default page 설정
			$.ajax(serverRoot + "/json/plan/list/" + defaultPage, {
				dataType: "json",	
			    success(data) {
					 console.log(userInfo);
					 if(data.length == 0) {
						 $('#programBox').append('<h4>기간: <span id="sdt">' +
								 startDate + '</span> ~ <span id="edt">' +
								 endDate + '</span></h4>');
						 $('#programBox').append('<div id="noPlan">작성된 운동일지가 없습니다.</div>');
					 } else {
						 $('#programBox').html(programTemplateFn({
							 name: data[0].program.name,
							 startDate: data[0].program.startDate,
							 endDate: data[0].program.endDate,
							 list:data}));
					 }
			    },
			    error() {
					swal({
						  position: 'center',
						  type: 'error',
						  title: '실행 오류!',
						  showConfirmButton: false,
						  timer: 1500
						})
			    }	
			});
		},
	    error() {
			swal({
				  position: 'center',
				  type: 'error',
				  title: '실행 오류!',
				  showConfirmButton: false,
				  timer: 1500
				})
	    }
	});
	
	// 프로필 관련 이미지와 사용자 이름 불러오기
	$.ajax(serverRoot + "/json/trainer/" + userInfo.userNo, {
		dataType: "json",	
	    success(data) {
			 $('#fPath').attr('src', '../../../files/' + data.userPath);
			 $('#tName').html(data.name);
	    },
	    error() {
			swal({
				  position: 'center',
				  type: 'error',
				  title: '실행 오류!',
				  showConfirmButton: false,
				  timer: 1500
				})
	    }	
	});
});

// 운동일지 리스트 보기
var programTemplateSrc = $("#program-template").html();
var programTemplateFn = Handlebars.compile(programTemplateSrc);

$(document.body).on('click', '.programTab', function(event) {
	event.preventDefault();
	pno = $(this).find('a').attr('data-no');
	
	// 탭 메뉴 활성화 이벤트
	if ($('.programTab').find(".active")) {
		$('.programTab').removeClass("active");
		$('.programTab').css("color", "#777");
	} 
    $(this).addClass("active");
    
	startDate = $('.active').find('a').attr('data-sdt');
	endDate = $('.active').find('a').attr('data-edt');
    // 운동일지 리스트 보기
	$.ajax(serverRoot + "/json/plan/list/" + pno, {
		dataType: "json",	
	    success(data) {
			if(data.length == 0) {
				 // 클릭할 때마다 생기는 문제를 제거 하기 위해 만든 코드
				 $('#programBox h4').remove();
				 $('#programBox div').remove();
				 $('#planList').remove();
			
				 $('#programBox').append('<h4>기간: <span id="sdt">' +
						 startDate + '</span> ~ <span id="edt">' +
						 endDate + '</span></h4>');
				 $('#programBox').append('<div id="noPlan">작성된 운동일지가 없습니다.</div>');
			 } else {
				 $('#programBox').html(programTemplateFn({
					 name: data[0].program.name,
					 startDate: data[0].program.startDate,
					 endDate: data[0].program.endDate,
					 list:data}));
			 }
	    },
	    error() {
			swal({
				  position: 'center',
				  type: 'error',
				  title: '실행 오류!',
				  showConfirmButton: false,
				  timer: 1500
				})
	    }	
	});
	
//	// 페이징 처리 pageActive
//	$.ajax(serverRoot + "/json/plan/count/" + pno, {
//		dataType: "json",	
//	    success(data) {
//			 //var lastPage = parseInt(data[data.length-1].planTurn/12) + 1;
//			 //console.log(lastPage);
//			 $('#pagination').html(pagetemplateFn({
//				 list: data}));
//			 
//			 for(var i = 0; i < data.length; i++) {
//				 if($('.selectedPage').attr('data-num') == i) {
//					 console.log(i);
//					 console.log(data.length);
//				 }
//			 }
//	    },
//	    error() {
//	        window.alert("페이징 실패!");
//	    }	
//	});
});

// 모달 관련 이벤트
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 새글 관련 이벤트
var count;
var turn;
$("#addPlan").click(() => {
    console.log(startDate, endDate);
	pno = $('.active').find('a').attr('data-no');
    // 프로그램 회차 관련
    $.ajax(serverRoot + "/json/plan/list/" + pno, {
    	dataType: "json",
	    success(data) {
    	   $("option").remove();
    	   $("#mDate").val('');
    	   $("#mTitle").val('');
    	   $("#mContent").val('');

    	   var index;
    	   if(data.length == 0) { // 프로그램에 운동일지 하나도 없을 경우
    		   turn = 1;
    		   count = 1;
    		   turn = ptover;
    	   } else { // 프로그램에 운동일지 한 개 이상 있을 경우
    		   index = data.length - 1;
    		   count = data[index].planTurn + 1;
    		   turn = data[0].program.proTurn;
    	   }
	       
    	   for (count; count <= turn; count++) {
	     	  $('#mTurn').append("<option>" + count +"</option>");
	       }
	    },
	    error() {
			swal({
				  position: 'center',
				  type: 'error',
				  title: '실행 오류!',
				  showConfirmButton: false,
				  timer: 1500
				})
	    }
    });
    
    $('.modal').css("display", "block");
    $('#viewForm').css("display", "none");
    $('#addForm').css("display", "block");
});

//원하는 회차의 운동일지 확대 해서 보기!
$(document.body).on('click', '.editIcon', function(event) {
	event.preventDefault();
	plno = $(this).find('a').attr('data-no');
	pno = $(this).find('a').attr('data-pno');
	
	$('.modal').css("display", "block");
	$('#addForm').css("display", "none");
	$('#viewForm').css("display", "block");
	$('#updatePlan button').css("display", "block");
    
	$.ajax(serverRoot + "/json/plan/" + plno, {
		dataType: "json",
	    success(data) {
			console.log(data[0].planDate);
			$("#dayFont").html("Day" + data[0].planTurn);
	        $("#dateFont").html("(" + data[0].planDate + ")");
	        $("#modalViewTitle input").val(data[0].planTitl);
	        $("#modalViewContent textarea").val(data[0].planContent);
	    },
	    error() {
			swal({
				  position: 'center',
				  type: 'error',
				  title: '실행 오류!',
				  showConfirmButton: false,
				  timer: 1500
				})
	    }	
	});
});

// 수정 버튼 눌렀을 경우 쿼리
$("#updatePlanButton").click(() => {
	$.post(serverRoot + "/json/plan/update/", {
		planTitl: $("#modalViewTitle input").val(),
		planContent: $("#modalViewContent textarea").val(),
		"no": plno
	}, () => {
		swal({
			  position: 'center',
			  type: 'success',
			  title: '수정완료!',
			  showConfirmButton: false,
			  timer: 1500
			})
		modal.style.display = "none";
		
		/* 업데이트한 상태에서 이전 화면으로 돌아가기 위한 코드임... 뭔가 이상 */
		$.ajax(serverRoot + "/json/plan/list/" + pno, {
			dataType: "json",	
		    success(data) {
				 $('#programBox').html(programTemplateFn({
					 name: data[0].program.name,
					 startDate: data[0].program.startDate,
					 endDate: data[0].program.endDate,
					 list:data}));
		    },
		    error() {
				swal({
					  position: 'center',
					  type: 'error',
					  title: '실행 오류!',
					  showConfirmButton: false,
					  timer: 1500
					})
		    }	
		});
		
	});
});

// 등록 버튼 눌렀을 시
$("#registerPlan").click(() => {	
	$.post(serverRoot + "/json/plan/add", {
		planTurn: $("#mTurn").val(),
		planDate: $("#mDate").val(),
		planTitl: $("#mTitle").val(),
		planContent: $("#mContent").val(),
		"program.no": pno
	}, () => {
		swal({
			  position: 'center',
			  type: 'success',
			  title: '등록완료!',
			  showConfirmButton: false,
			  timer: 1500
			})
		modal.style.display = "none";
		/* 업데이트한 상태에서 이전 화면으로 돌아가기 위한 코드임... 뭔가 이상 */
		$.ajax(serverRoot + "/json/plan/list/" + pno, {
			dataType: "json",	
		    success(data) {
				 $('#programBox').html(programTemplateFn({
					 name: data[0].program.name,
					 startDate: data[0].program.startDate,
					 endDate: data[0].program.endDate,
					 list:data}));
		    },
		    error() {
				swal({
					  position: 'center',
					  type: 'error',
					  title: '실행 오류!',
					  showConfirmButton: false,
					  timer: 1500
					})
		    }	
		});
	});
});

// 페이징 처리
$(document.body).on('click', '.selectedPage', function(event) {
	event.preventDefault();
	pageNum = $(this).attr('data-num');
	if($(".selectedPage").hasClass("pageActive").toString()) {
		$(".selectedPage").removeClass("pageActive")
	}
	$(this).addClass("pageActive");
	if(typeof pno == "undefined") {
		$.ajax(serverRoot + "/json/plan/list/" + defaultPage, {
			dataType: "json",	
		    success(data) {
				 $('#programBox').html(programTemplateFn({
					 name: data[0].program.name,
					 startDate: data[0].program.startDate,
					 endDate: data[0].program.endDate,
					 list:data}));
		    },
		    error() {
				swal({
					  position: 'center',
					  type: 'error',
					  title: '실행 오류!',
					  showConfirmButton: false,
					  timer: 1500
					})
		    }	
		});
	} else {
		$.ajax(serverRoot + "/json/plan/list/" + pno, {
			dataType: "json",	
		    success(data) {
				 $('#programBox').html(programTemplateFn({
					 name: data[0].program.name,
					 startDate: data[0].program.startDate,
					 endDate: data[0].program.endDate,
					 list:data}));
		    },
		    error() {
				swal({
					  position: 'center',
					  type: 'error',
					  title: '실행 오류!',
					  showConfirmButton: false,
					  timer: 1500
					})
		    }	
		});
	}
});

// DatePicker
$(function() {
    $("#mDate").datepicker({
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        minDate: startDate,
        maxDate: endDate,
        dateFormat: "yy-mm-dd"
    });
});

