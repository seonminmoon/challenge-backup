var dno;
var pno;
var defaultPage;
var startDate;
var endDate;
var plno;
var onOff;

// li-template 트레이너가 관리하는 프로그램 이름 목록
var liTemplateSrc = $("#li-template").html();
var templateFn = Handlebars.compile(liTemplateSrc);
$(document).ready(function() {
   $.ajax(serverRoot + "/json/programMember/lList/" + userInfo.userNo, {
      dataType: "json",
       success(data) {
         $('#programList').html(templateFn({list:data}));
         defaultPage = $('.active').find('a').attr('data-no');
         startDate = $('.active').find('a').attr('data-sdt');
         endDate = $('.active').find('a').attr('data-edt');
         // 운동계획서 default page 설정
         $.ajax(serverRoot + "/json/diary/list/" + defaultPage + "/" + userInfo.userNo, {
            dataType: "json",   
             success(data) {
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
                   // 출결여부 0인지 1인지를 알아내기 위한 로직
                   var checkInOut = $.makeArray($(".checkInOut").map(function(){
                	   // 이렇게 배열로 받아와야 함 attr만 쓰면 그 속성의 첫번째 값만 들고온다! 
                	   return $(this).attr("data-dno"); 
                   }));
                   for(var i = 0; i < data.length; i++) {
                	   if(data[i].dcheck == 0) {
                		   for(j = 0; j < checkInOut.length; j++) {
                			   if(checkInOut[j] == data[i].dno) {
                				   $("#planList li").eq(i).find('#viewCheck').attr('data-ch', 0);
                				   $("[data-ch=0]").css("display", "none");
                				   // 그에 해당하는 data-ch를 0으로 바꿔서
                				   // data-ch가 0인 아이만 display none을 한다.
                				   //$('.viewNum').css("display", "none");
                			   }
                		   }
                	   }
                	   continue;
                   }
                }
             },
             error() {
                 window.alert("프로그램 등록 후 이용해 주세요!");
             }   
         });
      },
       error() {
           window.alert("report.js li-template list 실행 오류!");
       }
   });
   
	// 프로필 관련 이미지와 사용자 이름 불러오기
	$.ajax(serverRoot + "/json/programMember/lList/" + userInfo.userNo, {
		dataType: "json",	
	    success() {
			 $('#fPath').attr('src', '../../../files/' + userInfo.userPath);
			 $('#mName').html(userInfo.name);
	    },
	    error() {
	        window.alert("회원 정보 불러오기 실패!");
	    }	
	});
});


// 운동계획서 리스트 보기
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
    // 운동계획서 리스트 보기
   $.ajax(serverRoot + "/json/diary/list/" + pno + "/" + userInfo.userNo, {
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
             
             // 출결여부 0인지 1인지를 알아내기 위한 로직
             var checkInOut = $.makeArray($(".checkInOut").map(function(){
          	   // 이렇게 배열로 받아와야 함 attr만 쓰면 그 속성의 첫번째 값만 들고온다! 
          	   return $(this).attr("data-dno"); 
             }));
             for(var i = 0; i < data.length; i++) {
          	   if(data[i].dcheck == 0) {
          		   for(j = 0; j < checkInOut.length; j++) {
          			   if(checkInOut[j] == data[i].dno) {
          				   $("#planList li").eq(i).find('#viewCheck').attr('data-ch', 0);
          				   $("[data-ch=0]").css("display", "none");
          				   // 그에 해당하는 data-ch를 0으로 바꿔서
          				   // data-ch가 0인 아이만 display none을 한다.
          				   //$('.viewNum').css("display", "none");
          			   }
          		   }
          	   }
          	   continue;
             }
          }
       },
       error() {
           window.alert("report.js programTab list 실행 오류!");
       }   
   });
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

//원하는 회차의 운동계획서 확대 해서 보기! ********** 수정봐야됨 출석체크 여부
$(document.body).on('click', '.editIcon', function(event) {
   event.preventDefault();
   dno = $(this).find('a').attr('data-dno');
   pno = $(this).find('a').attr('data-pno');
   
   $('.modal').css("display", "block");
   $('#addForm').css("display", "none");
   $('#viewForm').css("display", "block");
   $('#modalViewTitle input').attr("readonly", true);

   $.ajax(serverRoot + "/json/diary/" + dno, {
      dataType: "json",
       success(data) {
    	 // 출결여부 보여주기
         if(data[0].dcheck == 1) { // add 클래스 사용
        	 $('.checkIconBox').find('input').prop("checked", true);
        	 onOff = 1;
         } else {
        	 $('.checkIconBox').find('input').prop("checked", false);
        	 onOff = 0;
         }
         
    	 $("#dayFont").html("Day" + data[0].planTurn);
         $("#dateFont").html("(" + data[0].planDate + ")");
         $("#modalViewTitle input").val(data[0].planTitl);
         $("#modalViewContent textarea").val(data[0].content);
       },
       error() {
           window.alert("report.js editIcon 실행 오류!");
       }   
   });
});

//수정 버튼 눌렀을 경우 쿼리 
$("#updatePlanButton").click(() => {
    console.log(onOff);
    
	$.post(serverRoot + "/json/diary/update/", {
		content: $("#modalViewContent textarea").val(),
		dcheck: onOff,
		"dno": dno
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
		$.ajax(serverRoot + "/json/diary/list/" + pno + "/" + userInfo.userNo, {
			dataType: "json",	
		    success(data) {
				 $('#programBox').html(programTemplateFn({
					 name: data[0].program.name,
					 startDate: data[0].program.startDate,
					 endDate: data[0].program.endDate,
					 list:data}));
				 
	             // 출결여부 0인지 1인지를 알아내기 위한 로직
	             var checkInOut = $.makeArray($(".checkInOut").map(function(){
	          	   // 이렇게 배열로 받아와야 함 attr만 쓰면 그 속성의 첫번째 값만 들고온다! 
	          	   return $(this).attr("data-dno"); 
	             }));
	             for(var i = 0; i < data.length; i++) {
	          	   if(data[i].dcheck == 0) {
	          		   for(j = 0; j < checkInOut.length; j++) {
	          			   if(checkInOut[j] == data[i].dno) {
	          				   $("#planList li").eq(i).find('#viewCheck').attr('data-ch', 0);
	          				   $("[data-ch=0]").css("display", "none");
	          				   // 그에 해당하는 data-ch를 0으로 바꿔서
	          				   // data-ch가 0인 아이만 display none을 한다.
	          				   //$('.viewNum').css("display", "none");
	          			   }
	          		   }
	          	   }
	          	   continue;
	             }
		    },
		    error() {
		        window.alert("report.js view list 실행 오류!");
		    }	
		});
		
	});
});

//새글 관련 이벤트  ********* 출석체크 이전에 남는 데이터 지우기
$("#addPlan").click(() => {
	pno = $('.active').find('a').attr('data-no');
    // 프로그램 회차 관련
    $.ajax(serverRoot + "/json/diary/list/" + pno + "/" + userInfo.userNo, {
    	dataType: "json",
	    success(data) {
    	   $("option").remove();
    	   var count = data.length + 1;
    	   var turn;
    	   if(data.length == 0) { // 프로그램에 운동일지 하나도 없을 경우
    		   turn = 1;
    	   } else { // 프로그램에 운동일지 한 개 이상 있을 경우
    		   turn = data[0].program.proTurn;
    	   }
	       for (count; count <= turn; count++) {
	     	  $('#mTurn').append("<option>" + count +"</option>");
	       }
	       
	       var index = data.length;
	       // plan에서 mDate와 mTitle, mContent을 불러 오기 위함!
	       $.ajax(serverRoot + "/json/plan/list/" + pno, {
	          dataType: "json",   
	           success(data) {
	        	  console.log(data);
	        	  if(data.length == 0) {
	        			swal({
	        				  position: 'center',
	        				  type: 'warning',
	        				  html: '<h3 class="swalFont">작성할 수 있는 운동계획서가 없습니다.</h3>',
	        				  timer: 2000,
	        				  showConfirmButton: false,
	        				})
	        		  return;
	        	  }
	        	  if(data.length <= index) {
	        			swal({
	        				  position: 'center',
	        				  type: 'warning',
	        				  html: '<h3 class="swalFont">더 이상 운동계획서를 등록 할 수 없습니다!</h3>',
	        				  timer: 2000,
	        				  showConfirmButton: false,
	        				})
	        		  return;
	        	  }
	        	  console.log(index);
	        	  plno = data[index].no;
	   	       	  $("#mDate").val(data[index].planDate);
		          $("#mTitle").val(data[index].planTitl);
		          $("#mContent").val(data[index].planContent 
		        		  + "\n오늘 수행한 운동들만 기록해 주세요^^"
		        		  + "\n현재 내용을 클릭하면 수정이 가능합니다.");
		          $("#mDate").attr("readonly", true);
		          $("#mTitle").attr("readonly", true);
		          
		          $('.modal').css("display", "block");
		          $('#viewForm').css("display", "none");
		          $('#addForm').css("display", "block");
	           },
	           error() {
	               window.alert("plan에서 mDate와 mTitle을 불러 오기 실행 오류!");
	           }   
	       });
	       
	       $("#mContent").val('');
	       //plno = data[index-1].no;
	    },
	    error() {
	        window.alert("addPlan 실행 오류!");
	    }
    });
});

// 출석체크 여부 조절
$("#checkType").click(() => {
	if($("#checkType").attr("data-check") == 1) {
		$("#checkType").attr("data-check", "0");
		$("#checkType").removeAttr("checked");
	} else {
		$("#checkType").attr("data-check", "1");
		$("#checkType").attr("checked", true);
	}
});

$("#checkUpdateType").click(() => {
	if($("#checkUpdateType").attr("data-check") == 1) {
		$("#checkUpdateType").attr("data-check", "0");
		$("#checkUpdateType").removeAttr("checked");
		onOff = 0;
	} else {
		$("#checkUpdateType").attr("data-check", "1");
		$("#checkUpdateType").attr("checked", true);
		onOff = 1;
	}
});
// 등록 버튼 눌렀을 시
$("#registerPlan").click(() => {
	if($("#checkType").attr("data-check") == 1) {
		onOff = 1;
	} else {
		onOff = 0;
	}
	$.post(serverRoot + "/json/diary/add", {
		content: $("#mContent").val(),
		dcheck: onOff,
		"no": plno,
		"program.no": pno,
		"uno": userInfo.userNo
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
		$.ajax(serverRoot + "/json/diary/list/" + pno + "/" + userInfo.userNo, {
			dataType: "json",	
		    success(data) {
				 $('#programBox').html(programTemplateFn({
					 name: data[0].program.name,
					 startDate: data[0].program.startDate,
					 endDate: data[0].program.endDate,
					 list:data}));
				 
	             // 출결여부 0인지 1인지를 알아내기 위한 로직
	             var checkInOut = $.makeArray($(".checkInOut").map(function(){
	          	   // 이렇게 배열로 받아와야 함 attr만 쓰면 그 속성의 첫번째 값만 들고온다! 
	          	   return $(this).attr("data-dno"); 
	             }));
	             for(var i = 0; i < data.length; i++) {
	          	   if(data[i].dcheck == 0) {
	          		   for(j = 0; j < checkInOut.length; j++) {
	          			   if(checkInOut[j] == data[i].dno) {
	          				   $("#planList li").eq(i).find('#viewCheck').attr('data-ch', 0);
	          				   $("[data-ch=0]").css("display", "none");
	          				   // 그에 해당하는 data-ch를 0으로 바꿔서
	          				   // data-ch가 0인 아이만 display none을 한다.
	          			   }
	          		   }
	          	   }
	          	   continue;
	             }
		    },
		    error() {
		        window.alert("registerPlan 실행 오류!");
		    }	
		});
	});
});

/* 수정 제대로 반영 안되는 부분 처리*/
