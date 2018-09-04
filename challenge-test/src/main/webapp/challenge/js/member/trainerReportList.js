var plano;
var pno;
var defaultPage;
var startDate;
var endDate;

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
         // 운동일지 default page 설정
         $.ajax(serverRoot + "/json/plan/list/" + defaultPage, {
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
			 $('#fPath').attr('src', '../../../files/' + userInfo.userPath + ".jpg");
			 $('#mName').html(userInfo.name);
	    },
	    error() {
	        window.alert("회원 정보 불러오기 실패!");
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

//원하는 회차의 운동일지 확대 해서 보기!
$(document.body).on('click', '.editIcon', function(event) {
   event.preventDefault();
   plno = $(this).find('a').attr('data-no');
   
   $('.modal').css("display", "block");
   $('#addForm').css("display", "none");
   $('#viewForm').css("display", "block");
   $('#updatePlan button').css("display", "block");
   
   $('#modalViewTitle input').attr("readonly", true);
   $('#modalViewContent textarea').attr("readonly", true);
   $.ajax(serverRoot + "/json/plan/" + plno, {
      dataType: "json",
       success(data) {
           $("#dayFont").html("Day" + data[0].planTurn);
           $("#dateFont").html("(" + data[0].planDate + ")");
           $("#modalViewTitle input").val(data[0].planTitl);
           $("#modalViewContent textarea").val(data[0].planContent);
       },
       error() {
           window.alert("report.js editIcon 실행 오류!");
       }   
   });
});


