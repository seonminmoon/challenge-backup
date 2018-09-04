var cardBody1 = $("#cardBody1").html();
var cardBodyFn = Handlebars.compile(cardBody1);
$.getJSON(serverRoot + "/json/program/listProgram/" + userInfo.userNo, (data) => {
  $(cardWide).html(cardBodyFn({list:data}));
}).done(function(data) {
  
  $('.trainer-img').attr('src', '../../../files/'+userInfo.userPath+'.jpg');

  var i;
  for (i = 0; i < data.length; i++) {
    dday(data[i].startDate, i); //D-day
    reviewScore(data[i].no, i); //별점,리뷰 개수
    pmemberCount(data[i].no, i);
    var price = addComma($(".numberic-"+i+"").html())
    var place = ($(".card-body-local-"+i+"").html()).substring(3, 6);
    $(".numberic-"+i+"").html(price)
    $(".card-body-local-"+i+"").html(place)
  }

  $.fn.generateStars = function() {
    return this.each(function(i,e){$(e).html($('<span/>').width($(e).text()*16));});
  };

});


function pmemberCount(no, i) {
  $.get(serverRoot + "/json/programMember/pmemberCount/" + no, function(data) {
    $(".pnum-"+i+"").append(data - 1);
  })
}


function reviewScore(no, i) {
//리뷰 개수 카운트
  $.get(serverRoot + "/json/programMember/reviewCount/" + no, function(data) {
    $(".review-"+i+"").append(data);
    var count = data;
    // 리뷰  점수
    $.get(serverRoot + "/json/programMember/reviewScore/" + no, function(data) {
      var score = data;
      var cal = (score / count).toFixed(1);
      if(!(isNaN(cal))) {
        $('.score-'+i+'').html(cal)
      }
      
      if (cal >= 4) {
        //display block
        var displayNo = (cal / 5) * 100; // 백분율
        $("#card-" + i).css("display", "block");
        $("#card-" + i).append("<span>만족도 "+ displayNo+ "%</span>")
      } 
    }).done(function(data) {
      $('.score-'+i+'').generateStars();
    })
  })
  
}

//숫자를 별로 변환
$.fn.generateStars = function() {
  return this.each(function(i,e){$(e).html($('<span/>').width($(e).text()*16));});
};

//금액 콤마
function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ',');
}

//날짜 간격 구하기(D-day)
function dday(startDate, i) {
  var now = new Date();
  var start = new Date(startDate)
  var interval = now.getTime() - start.getTime();
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
  var dd = document.getElementById("dday-"+i);
  dd.append(interval)
}

//프로필 관련 이미지와 사용자 이름 불러오기
$.ajax(serverRoot + "/json/trainer/" + userInfo.userNo, {
  dataType: "json", 
    success(data) {
     $('#fPath').attr('src', '../../../files/' + data.userPath+'.jpg');
     $('#tName').html(data.name);
    },
    error() {
        window.alert("트레이너 정보 불러오기 실패!");
    } 
});