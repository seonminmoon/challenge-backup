//프로그램 데이터 불러오기
if (location.href.split("?").length > 1) {
  var no = location.href.split("?")[1].split("=")[1];

  $.getJSON(serverRoot + "/json/program/" + no, function(data) {
    $(faddress).append(data.address + ' ' + data.addDetail);
    $(fName).append(data.name);
    $(fDate).append(data.startDate + ' ~ ' + data.endDate);
    //$(fminQty).append(data.minQty);
    $(fmaxQty).append(data.maxQty);
    $(fprice).append(data.price);
    $(fdescription).append(data.description);
    $(fproType).append(data.proType);
    $(fproGoal).append(data.proGoal);
    if(data.proGoal != '출석')
      $(fproGoalNum).append(data.proGoalNum + 'kg');
    $(fproTh).append(data.proTh);
    $(fproTurn).append(data.proTurn);
    $('<img/>')
    .attr('src', '../../../files/'+data.medias[0].path)
    .appendTo($(fprogramImg));

    // 참여인원 정보 가져오기
    $.get(serverRoot + "/json/programMember/pmemberCount/" + data.no, function(data) {
      $(fpmemCount).append(data - 1);
    })

    // 챌린지 정보 가져오기
    $.getJSON(serverRoot + "/json/challenge/" + data.challengeNo, function(data) {
      $(fchalName).append(data.title);
    })

    //트레이너 정보 가져오기
    $.getJSON(serverRoot + "/json/trainer/" + data.trainerNo, function(data) {
      $(ftrainerName).append(data.name);
      $(ftrainerTime).append(data.time);
      
      $(ftrainerImg).append('<a href="../trainer/trainer.html?no='
          +data.userNo+'"><img src="../../../files/'
          +data.userPath+'_100x100.jpg"></a>')
      
    }).done(function(data){ // 메시지 보내기---------------------------------------------------------
      var addTemplateSrc = $("#add-template").html();
      var addtemplateFn = Handlebars.compile(addTemplateSrc);
      $(document.body).on('click','#msgBtn', function(event){
        event.preventDefault();

        $('#myAddModal').css("display", "block");
        $('.add-body').html(addtemplateFn({
          trainer: data.name,
          member: userInfo.name
        }));
        $("#addBtn").click(() => {
          $.ajax({
            type: 'POST',
            url: '../../../json/message/add',
            data:{
              title: $(fTitle).val(),
              content:$(fContent).val(),
              direct: 1,
              "member.userNo":userInfo.userNo,
              "trainer.userNo":data.userNo
            },
            success:function(result){
              $('#myAddModal').css("display", "none");
              swal({
                type: 'success',
                title: '전송 완료!',
                showConfirmButton: false,
                timer: 1500,
                preConfirm: () => {
                  location.href="member-msg.html"
                }
              })

            }
          })
        });

        $(document.body).on('click','.close', function(){
          $('#myAddModal').css("display", "none");
        })
        $(document.body).on('click','#msg-ok', function(){
          $('#myModal').css("display", "none");
        })
      });
    }); // 메시지 끝!

  }).done(function(data) {

    programList(data.trainerNo) // 다른 프로그램
    plan(data.proDay, data.proTime) // 일정
    dayInterval(data.startDate) // D-day
    proTurn(data.trainerNo, data.name) // 기수 프로그램

    // 결제 페이지 이동
    $("#payment").click(() => {
      location.href = "../payment/payment.html?no="+data.no
    });
    $('.PriceContentSub2 > h4').click(() => {
      location.href = "../payment/payment.html?no="+data.no
    });

    no = data.no;
    loadComment(data.no); // 댓글
    //금액 콤마
    $(".numberic").each(function(){
      $(this).number(true);
    });

    map(data.address); // 지도
  })


  //리뷰 개수 카운트
  $.get(serverRoot + "/json/programMember/reviewCount/" + no, function(data) {
    $(reviewCount).append(data);
    var count = data;

    // 리뷰  점수
    $.get(serverRoot + "/json/programMember/reviewScore/" + no, function(data) {
      var score = data;
      var cal = (score / count).toFixed(1);
      if(!(isNaN(cal))) {
        $(reviewScore).append(cal);
        var scorePe = cal / 5 * 100
        $(scorePer).append(scorePe.toFixed(1));
      } else {
        $(reviewScore).append(0)
      }

      $('.star-prototype').generateStars();
      $('.star-prototype3').generateStars();
    })
  })
}

function rewviewStar(no) {
//리뷰 개수 카운트
	$.get(serverRoot + "/json/programMember/reviewCount/" + no, function(data) {
		$(reviewCount).html(data);
		var count = data;
		
		// 리뷰  점수
		$.get(serverRoot + "/json/programMember/reviewScore/" + no, function(data) {
			var score = data;
			var cal = (score / count).toFixed(1);
			if(!(isNaN(cal))) {
				$(reviewScore).html(cal);
			} else {
				$(reviewScore).html(0)
			}
			
			$('.star-prototype').generateStars();
			$('.star-prototype3').generateStars();
		})
	})
}


/*

//add

var addTemplateSrc = $("#add-template").html();
var addtemplateFn = Handlebars.compile(addTemplateSrc);

$(document.body).on('click','.addModal', function(event){
	event.preventDefault();

	var msgno = $(this).attr("data-msgno");
	$.getJSON(serverRoot + "/json/message/" + msgno, function(data) {
		$('.add-body').html(addtemplateFn({
			 trainer: data.trainer.name,
			 title: data.title,
			 content: data.content,
			 msgDate: data.msgDate,
			 member: userInfo.name,
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
		            direct: 1,
		            "member.userNo":userInfo.userNo,
		            "trainer.userNo":data.trainer.userNo
		        },
		        success:function(result){
		        	$('#myAddModal').css("display", "none");
		        	swal({
		        		type: 'success',
		        		  title: '전송 완료!',
		        		  showConfirmButton: false,
		        		  timer: 1500,
                        preConfirm: () => {
                        	location.href="member-msg.html"
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
 */

// 기수 프로그램
function proTurn(trainerNo, name) {
  var trTemplateSrc5 = $("#turn-template").html();
  var templateFn5 = Handlebars.compile(trTemplateSrc5);
  $.getJSON(serverRoot + "/json/program/listTurnProgram/" + trainerNo + "/" + name, (data) => {
    $("#turn").append(templateFn5({list: data}));
  }).done(function(data) {
    for (var i = 0; i < data.length; i++) {
      rewviewStar1(data[i].no)
    }
  })
}

// 기수 별점
function rewviewStar1(no) {
//리뷰 개수 카운트
  $.get(serverRoot + "/json/programMember/reviewCount/" + no, function(data) {
    var count = data;
    
    // 리뷰  점수
    $.get(serverRoot + "/json/programMember/reviewScore/" + no, function(data) {
      var score = data;
      var cal = (score / count).toFixed(1);
      if(!(isNaN(cal))) {
        $('.score'+no).append(cal);
      } else {
        $('.score'+no).append(0)
      }
      
    })
  })
}


//댓글리스트
function loadComment(no) {
  var trTemplateSrc3 = $("#commentList").html();
  var templateFn3 = Handlebars.compile(trTemplateSrc3);
  $.getJSON(serverRoot + "/json/programMember/reviewList/" + no, (data) => {
    $('#comment1').append(templateFn3({list: data}));
  }).done(function(data) {
    //숫자 평점을 별로 변환하도록 호출하는 함수
    $('.star-prototype2').generateStars();
    load('#cm-load', '3');
  })
}


function loadCommentAfter(no) {
  var trTemplateSrc3 = $("#commentList").html();
  var templateFn3 = Handlebars.compile(trTemplateSrc3); 
  $.getJSON(serverRoot + "/json/programMember/reviewList/" + no, (data) => {
    $('#comment1').html(templateFn3({list: data}));
  }).done(function(data) {
    //숫자 평점을 별로 변환하도록 호출하는 함수
    $('.star-prototype2').generateStars();
    load('#cm-load', '3');
  })
}




$(document).ready(function() {
  // 댓글에 필요한 사용자 정보 가져오기

  if (userInfo != undefined) {
    $('<img/>')
    .attr('src', '../../../files/'+userInfo.userPath+'_50x50.jpg')
    .appendTo($('.userNameCircle'));
    $(uName).append(userInfo.name);
  }

  starRating();
  //댓글달기
  $(updBtn).click(() => {
    $.post(serverRoot + "/json/programMember/updateReview", {
      grade: starRating(),
      review: $(fContent).val(),
      programNo: no,
      userNo: userInfo.userNo
    }, () => {
      loadCommentAfter(no);
      rewviewStar(no);
      $(fContent).val('');
    })
  });

})


//상세 이미지 가져오기
var trTemplateSrc = $("#detail-image").html();
var templateFn = Handlebars.compile(trTemplateSrc);
$.getJSON(serverRoot + "/json/programMedia/list?no=" + no, (data) => {
  $(detailImg).html(templateFn({list:data}));
  $(slideLen).append(data.length);
  showSlides(1);
}).done(function(data) {
  var i;
  for (i = 0; i < data.length; i++) {
    slideOrder(i)
  }
})
function slideOrder(i) { // 슬라이드 순번
  var dd = document.getElementById("slideOr-"+i);
  dd.append(i+1)
}
/*이미지 슬라이드 이벤트*/ 
$('.prev').click(function() {
  plusSlides(-1);
});
$('.next').click(function() {
  plusSlides(1);
});

var slideIndex = 1;
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}


//다른 프로그램 가져오기
function programList(trainerNo) {

  var trTemplateSrc1 = $("#lectList").html();
  var templateF1 = Handlebars.compile(trTemplateSrc1);
  $.getJSON(serverRoot + "/json/program/listProgram/" + trainerNo, (data) => {
    $(lectBox).html(templateF1({list:data}));
  }).done(function(data) {
    $(fproCount).append(data.length);
    $(".numberic").each(function(){
      $(this).number(true);
    });
    for(var i = 0; i < data.length; i++) {
      programListScore(data[i].no, i);
    }
  })
}

function programListScore(no, i){
//리뷰 개수 카운트
  $.get(serverRoot + "/json/programMember/reviewCount/" + no, function(data) {
    var count = data;
//  리뷰  점수
    $.get(serverRoot + "/json/programMember/reviewScore/" + no, function(data) {
      var score = data;
      var cal = (score / count).toFixed(1);
      if(!(isNaN(cal))) {
        $('.score-'+i+'').append(cal + '점')
      }
    })
  })
}



//댓글 더보기
$(moreBtn).on("click", function () {
  load('#cm-load', '3', '#cm-btn-wrap');
})
function load(id, cnt, btn) {
  var comment_list = id + " .cm-load:not(.active)";
  var comment_length = $(comment_list).length;
  var comment_total_cnt;
  if (cnt < comment_length) {
    comment_total_cnt = cnt;
  } else {
    comment_total_cnt = comment_length;
    $(moreBtn).hide();
  }
  $(comment_list + ":lt(" + comment_total_cnt + ")").addClass("active");
}


//숫자를 별로 변환
$.fn.generateStars = function() {
  return this.each(function(i,e){$(e).html($('<span/>').width($(e).text()*16));});
};

//댓글 입력 별점 카운팅
function starRating(){
  var $star = $(".star-input"),
  $result = $star.find("output>b");

  $(document)
  .on("focusin", ".star-input>.input",
      function(){
    $(this).addClass("focus");
  })

  .on("focusout", ".star-input>.input", function(){
    var $this = $(this);
    setTimeout(function(){
      if($this.find(":focus").length === 0){
        $this.removeClass("focus");
      }
    }, 100);
  })

  .on("change", ".star-input :radio", function(){
    $result.text($(this).next().text());
  })
  .on("mouseover", ".star-input label", function(){
    $result.text($(this).text());
  })
  .on("mouseleave", ".star-input>.input", function(){
    var $checked = $star.find(":checked");
    if($checked.length === 0){
      $result.text("0");
    } else {
      $result.text($checked.next().text());
    }
  });
  return $result.text()
} 



