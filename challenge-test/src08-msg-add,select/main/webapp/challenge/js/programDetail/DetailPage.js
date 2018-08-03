//프로그램 데이터 불러오기
if (location.href.split("?").length > 1) {
  var no = location.href.split("?")[1].split("=")[1];

  $.getJSON(serverRoot + "/json/program/" + no, function(data) {
    /*$(fNo).append(data.no);
    $(fpostNo).val(data.postNo);
    $(faddDetail).val(data.addDetail);*/
    $(faddress).append(data.address + ' ' + data.addDetail);
    $(fName).append(data.name);
    $(fStartDate).append(data.startDate);
    //$(fendDate).append(data.endDate);
    $(fminQty).append(data.minQty);
    $(fmaxQty).append(data.maxQty);
    $(fprice).append(data.price);
    $(fdescription).append(data.description);
    $(fproType).append(data.proType);
    /*$(fproGoal).val(data.proGoal);
    $(fproGoalNum).val(data.proGoalNum);*/
    $(fproTh).append(data.proTh);
    /*$(fproTurn).val(data.proTurn);
    $(fproDay).val(data.proDay);
    $(fproTime).val(data.proTime);
    $(fchallengeNo).val(data.challengeNo);
    $(fmainImg).val(data.mainImg);*/
    //$(ftrainerNo).val(data.trainerNo.userNo);
    $('<img/>')
    .attr('src', '../../../files/'+data.medias[0].path+'_600x600.jpg')
    .appendTo($(fprogramImg));
  }).done(function(data) {
    programList(data.trainerNo) // 다른 프로그램
    plan(data.proDay, data.proTime) // 일정

    // 날짜 간격 구하기(D-day)
    var interval = new Date().getTime() - new Date(data.startDate).getTime();
    interval = Math.floor(interval / (1000 * 60 * 60 * 24));
    if (interval == 0) {
      interval = "-day"
    } else {
      var str = Number(interval)
      if (str) {
        if (0 < str) {
          interval = "+" + interval;
        } 
      }
    }
    $(Dday).append(interval);

    // 결제 페이지 이동
    $("#payment").click(() => {
      location.href = "../payment/payment.html?no="+data.no
    });
    $('.PriceContentSub2 > h4').click(() => {
      location.href = "../payment/payment.html?no="+data.no
    });


    // 트레이너 정보 가져오기
    $.getJSON(serverRoot + "/json/trainer/" + data.trainerNo, function(data) {
      $(ftrainerName).append(data.name);
      $(ftrainerTime).append(data.time);
      $('<img/>')
      .attr('src', '../../../files/'+data.userPath+'_100x100.jpg')
      .appendTo($(ftrainerImg));
    })
  })
}





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

  })
}


//일정 데이터 가져오기
function plan(proDay, proTime) {

  var inputTimeString='';
  var mo, tu, we, th, fr, sa, su;
  var pDay = proDay.split(" ");
  var dayTime = proTime.split(" ");

  for (var i = 0; i < pDay.length - 1; i++) {
    switch (pDay[i]) {
    case '0': 
      timeCal(dayTime[i])
      mo = inputTimeString
      inputTimeString='';
      break;
    case '1': 
      timeCal(dayTime[i])
      tu = inputTimeString
      inputTimeString='';
      break;
    case '2': 
      timeCal(dayTime[i])
      we = inputTimeString
      inputTimeString='';
      break;
    case '3': 
      timeCal(dayTime[i])
      th = inputTimeString
      inputTimeString='';
      break;
    case '4': 
      timeCal(dayTime[i])
      console.log(inputTimeString)
      fr = inputTimeString
      inputTimeString='';
      break;
    case '5': 
      timeCal(dayTime[i])
      sa = inputTimeString
      inputTimeString='';
      break;
    case '6': 
      timeCal(dayTime[i])
      su = inputTimeString
      inputTimeString='';
      break;
    default: 
      console.log('에러')
    }
  }

  function timeCal(dayTime) {

    var dayTime= dayTime.split(",");
    var calculated =  new Array();
    for (var i = 0; i < dayTime.length - 1; i++) {
      calculated[i] = ((parseInt(dayTime[i].split(":")[0]) * 60) + parseInt(dayTime[i].split(":")[1]));
    }
    var count = 0;
    var temp = 0;
    for (var i = 0; i < calculated.length; i++) {
      if ((calculated[i + 1] - calculated[i]) > 30 && count == 0) {
        inputTimeString = dayTime[0] + " ~ " + timePlus(dayTime[i]);
        temp = i;
        count++;
      } else if ((calculated[i + 1] - calculated[i]) > 30 && count > 0 ) {
        inputTimeString += (", " + dayTime[temp + 1] + " ~ " + timePlus(dayTime[i]));
        temp = i;
      } else if (i == calculated.length - 1 && count == 0) {
        inputTimeString += (dayTime[0] + " ~ " + timePlus(dayTime[dayTime.length - 2]))
      } else if (i == calculated.length - 1) {
        inputTimeString += (", " + dayTime[temp + 1] + " ~ " + timePlus(dayTime[dayTime.length - 2]))
      } 
    }

    function timePlus(time) {
      var time1 = time.split(":")
      if (Number(time1[1]) == 30) {
        time1[1] = '00'
          time1[0] = (parseInt(time1[0]) + 1)
          if (time1[0] < 10) {
            time1[0] = '0' + time1[0]
          }
        time = time1[0] + ":" + time1[1]
        return time
      } else {
        time1[1] = '30'
          time = time1[0] + ":" + time1[1]
        return time
      }
    }
    return inputTimeString;
  }

  var trTemplateSrc2 = $('#dayday').html();
  var templateF2 = Handlebars.compile(trTemplateSrc2);
  var data = {
      list: [
        {time: mo},
        {time: tu},
        {time: we},
        {time: th},
        {time: fr},
        {time: sa},
        {time: su}
        ]
  }
  $(day).html(templateF2(data));

  openDay(event, 'day-0')
} 
/* 일정 div 이벤트 */
$('.day0').click(function() {
  openDay(event, 'day-0')
});
$('.day1').click(function() {
  openDay(event, 'day-1')
});
$('.day2').click(function() {
  openDay(event, 'day-2')
});
$('.day3').click(function() {
  openDay(event, 'day-3')
});
$('.day4').click(function() {
  openDay(event, 'day-4')
});
$('.day5').click(function() {
  openDay(event, 'day-5')
});
$('.day6').click(function() {
  openDay(event, 'day-6')
});
function openDay(evt, dayName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent2");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks2");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(dayName).style.display = "block";
  evt.currentTarget.className += " active";
}


$(document).ready(function() {
  // 댓글에 필요한 사용자 정보 가져오기
  $('<img/>')
  .attr('src', '../../../files/'+userInfo.userPath+'_50x50.jpg')
  .appendTo($('.userNameCircle'));
  $(uName).append(userInfo.name);

  starRating();
  //댓글달기
  $(updBtn).click(() => {
    $.post(serverRoot + "/json/programMember/updateReview", {
      grade: starRating(),
      review: $(fContent).val(),
      programNo: no,
      userNo: userInfo.userNo
    }, () => {
      console.log('댓글등록')
    });
  });

  //댓글리스트
  var trTemplateSrc3 = $("#commentList").html();
  var templateFn3 = Handlebars.compile(trTemplateSrc3);

  $.getJSON(serverRoot + "/json/programMember/reviewList/" + no, (data) => {
    $('#comment1').append(templateFn3({list: data}));
  }).done(function(data) {
    //숫자 평점을 별로 변환하도록 호출하는 함수
    $('.star-prototype').generateStars();
  })


  //리뷰 개수 카운트
  $.get(serverRoot + "/json/programMember/reviewCount/" + no, function(data) {
    $(reviewCount).append(data);
    var count = data;

    // 리뷰  점수
    $.get(serverRoot + "/json/programMember/reviewScore/" + no, function(data) {
      var score = data;
      var cal = (score / count).toFixed(1);
      $(reviewScore).append(cal);
      $('.star-prototype').generateStars2();
    })
  }).done(function() {
    
  })

})

//숫자를 별로 변환
$.fn.generateStars = function() {
  return this.each(function(i,e){$(e).html($('<span/>').width($(e).text()*16));});
};
//숫자를 별로 변환 2
$.fn.generateStars2 = function() {
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



