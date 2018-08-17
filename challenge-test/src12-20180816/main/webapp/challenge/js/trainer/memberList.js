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
		
		// 프로필 관련 이미지와 사용자 이름 불러오기
		$.ajax(serverRoot + "/json/trainer/" + userInfo.userNo, {
			dataType: "json",	
		    success(data) {
				 $('#fPath').attr('src', '../../../files/' + data.userPath);
				 $('#tName').html(data.name);
		    },
		    error() {
		        window.alert("트레이너 정보 불러오기 실패!");
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

//회원정보 보기 
var viewTemplateSrc = $("#view-template").html();
var viewtemplateFn = Handlebars.compile(viewTemplateSrc);
var addTemplateSrc = $("#add-template").html();
var addtemplateFn = Handlebars.compile(addTemplateSrc);

$(document.body).on('click','.trSelect', function(event){
	event.preventDefault();
	
	var proTurn;
	var proGoal;
	var proGoalNum;
	var userNo = $(this).attr("data-uno");
	programNum = $(this).attr("data-pno");
		
	/* 전체는 못보고 탭에 있는 애들만 선택해서 볼 수 있다.*/
	$.ajax(serverRoot + "/json/programMember/" + userNo + "/" + programNum, {
		dataType: "json",	
	    success(data) {
			 console.log(data);
			 $('.modal-body').html(viewtemplateFn({
				 usersPath: data[0].user.userPath,
				 usersName: data[0].user.name,
				 usersSex: data[0].user.sex,
				 usersphon: data[0].user.userPhone,
				 name: data[0].program.name, 
				 startDate: data[0].program.startDate,
				 endDate: data[0].program.endDate,
				 proGoal: data[0].program.proGoal}));
			 	 userNo = data[0].userNo;
			 	 proTurn = data[0].program.proTurn;
			 	 proGoal = data[0].program.proGoal;
			 	 proGoalNum = data[0].program.proGoalNum;
			 	
	    },
	    error() {
	        window.alert("meberList.js 회원정보 보기 관련 실행 오류!");
	    }	
	});
	
	// 회원 출석률 관련               
	var dSum = 0;
	var dAver = 0;
	$.ajax(serverRoot + "/json/diary/dList/" + userNo + "/" + programNum, {
		dataType: "json",	
	    success(data) {
			console.log(data);
			for(var i = 0; i < data.length; i++) {
				if(data[i].dcheck == 1) {
					dSum += parseInt(data[i].dcheck);
				}
			}
			dAver = (dSum/proTurn)*100;
			console.log(dAver);
			
			$('#mAttend').append(Math.floor(dAver) + '%');
			if(Math.floor(dAver) == 100 || Math.floor(dAver) > 100) {
				$('#mTargetPer').append('100%');
				$('.target').css("width", "95.5%"); // 패딩값으로 인해 100%가 120%되는 것을 방지
			} else {
				$('.attend').css("width", Math.floor(dAver) + "%");
			}
	    },
	    error() {
	        window.alert("meberList.js 출석률 관련 실행 오류!");
	    }	
	});
	
	// 회원 목표달성률 관련               
	$.ajax(serverRoot + "/json/bodyInfo/list/" + userNo, {
		dataType: "json",	
	    success(data) {
			console.log(data);
			var first;
			var last;
			var diff;
			var lastIndex = data.length - 1;
			var targetNum;
			var targetResult;
			
			if(proGoal == '출석') {
				$('#mTargetPer').append(Math.floor(dAver) + '%');
				$('.target').css("width", Math.floor(dAver) + "%");
				if(Math.floor(targetResult) == 100 || Math.floor(targetResult) > 100) {
					$('.target').css("width", "95.5%"); // 패딩값으로 인해 100%가 120%되는 것을 방지
				}
			} else {
				if(proGoal == '체중') {
					if(data.length == 0) {
						first = 0;
						last = 0;
					} else {
						first = data[0].weight;
						last = data[lastIndex].weight;
					}
				} else if(proGoal == '근력') {
					if(data.length == 0) {
						first = 0;
						last = 0;
					} else {
						first = data[0].muscle;
						last = data[lastIndex].muscle;
					}
				} else if(proGoal == '체지방') {
					if(data.length == 0) {
						first = 0;
						last = 0;
					} else {
						first = data[0].fat;
						last = data[lastIndex].fat;
					}
				}
				
				// proGoalNum이 -냐 +냐를 구분해서
				// -이면 diff는 first - last --> 근데 diff의 결과가 -이면 달성률을 0으로 만든다
				// +이면 diff는 last - first --> 근데 diff의 결과가 -이면 달성률을 0으로 만든다
				if(proGoalNum.split('-').length == 2) {
					targetNum = parseInt(proGoalNum.split('-')[1]);
					diff = first - last;
					
				} else {
					targetNum = parseInt(proGoalNum);
					diff = last - first;
				}
				
				if(proGoalNum.split('-')[0] == '-') {
					targetResult = 0;
					$('#mTargetPer').append(targetResult + '%');
					$('.target').css("width", targetResult + "%");
				} else {
					targetResult = (diff/targetNum)*100;
					if(Math.floor(targetResult) == 100 || Math.floor(targetResult) > 100) {
						$('#mTargetPer').append('100%');
						$('.target').css("width", "95.5%"); // 패딩값으로 인해 100%가 120%되는 것을 방지
					} else if (Math.floor(targetResult) == 0 || Math.floor(targetResult) < 100){
						$('#mTargetPer').append('0%');
						$('.target').css("width", "0%"); // 패딩값으로 인해 100%가 120%되는 것을 방지
					} else {
						$('#mTargetPer').append(Math.floor(targetResult) + '%');
						$('.target').css("width", Math.floor(targetResult) + "%");
					}
				}
			}
			
			$('#myModal').css("display", "block");
			
	    },
	    error() {
	        window.alert("meberList.js 목표달성률 관련 실행 오류!");
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

// 회원명으로 검색
var uName;
$(document.body).on('click','#searchButton', function(event){
	uName = $('#userName').val();
	if(typeof programNum == "undefined") {
		$.ajax(serverRoot + "/json/programMember/sList/" + userInfo.userNo + "/" 
				+ uName, {
			dataType: "json",	
		    success(data) {
				 $('#memberList').html(membTemplateFn({
					 list:data}));
		    },
		    error() {
		        window.alert("전체 : 회원목록 검색 오류!");
		    }	
		});
	} else {
		$.ajax(serverRoot + "/json/programMember/sList/" + programNum + "/" 
				+ userInfo.userNo + "/" + uName, {
			dataType: "json",	
		    success(data) {
				 $('#memberList').html(membTemplateFn({
					 list:data}));
		    },
		    error() {
		        window.alert("회원목록 검색 오류!");
		    }	
		});
	}
});

