// 프로그램 데이터 불러오기
if (location.href.split("?").length > 1) {
  var no = location.href.split("?")[1].split("=")[1];

  $.getJSON(serverRoot + "/json/program/" + no, function(data) {
    /*$(fNo).append(data.no);
    $(fpostNo).val(data.postNo);
    $(faddDetail).val(data.addDetail);*/
    $(faddress).append(data.address);
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
    $(ftrainerName).append(data.trainerNo.name);
    $(ftrainerTime).append(data.trainerNo.time);
    $('<img/>')
    .attr('src', '../../../files/'+data.trainerNo.userPath+'_100x100.jpg')
    .appendTo($(ftrainerImg));
    $('<img/>')
    .attr('src', '../../../files/'+data.medias[0].path+'_600x600.jpg')
    .appendTo($(fprogramImg));
  }).done(function(data) {
    programList(data.trainerNo.userNo)
    plan(data.proDay, data.proTime)
    
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
    
    
    $("#payment").click(() => {
      location.href = "../payment/payment.html?no="+data.no
    });
  })
}


// 상세 이미지 가져오기
var trTemplateSrc = $("#detail-image").html();
var templateFn = Handlebars.compile(trTemplateSrc);
$.getJSON(serverRoot + "/json/programMedia/list?no=" + no, (data) => {
  $(detailImg).html(templateFn({list:data}));
})
/*이미지 슬라이드 이벤트*/ 
var prev = document.getElementsByClassName("prev");
var next = document.getElementsByClassName("next");
prev.onclick = function() {
  plusSlides(-1);
}
next.onclick = function() {
  plusSlides(1);
}
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  console.log(slides)
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  //slides[slideIndex-1].style.display = "block";
}
  

// 다른 프로그램 가져오기
function programList(trainerNo) {
  var trTemplateSrc1 = $("#lectList").html();
  var templateF1 = Handlebars.compile(trTemplateSrc1);
  $.getJSON(serverRoot + "/json/program/listProgram/" + trainerNo, (data) => {
    $(lectBox).html(templateF1({list:data}));
  })
}



function plan(proDay, proTime) {
  var dayd = proDay.split(",")
  for (var i in dayd) {
    console.log(dayd[i]);
  }
  var timed = proTime.split(" ")
  for (var i in timed) {
    console.log(timed[i]);
  }
  
  
  var trTemplateSrc2 = $('#dayday').html();
  var templateF2 = Handlebars.compile(trTemplateSrc2);
  var data = {
      list: [
        {proday: proDay},
        {proday: proDay},
        {proday: proDay},
        {proday: proDay},
        {proday: proDay},
        {proday: proDay},
        {proday: proDay}
      ]
  }
  $(day).html(templateF2(data));
}





