if (location.href.split("?").length > 1) {
  var no = location.href.split("?")[1].split("=")[1];

  //챌린지 정보 가져오기
  $.getJSON(serverRoot + "/json/challenge/" + no, (data) => {
    $(ftitle).append(data.title);
    $(fcontent).append(data.content);
    $(fpath).attr('src', '../../../files/' + data.path);
  });
  
  //프로그램 리스트 가져오기
  var cardBody1 = $("#cardBody1").html();
  var cardBodyFn = Handlebars.compile(cardBody1);
  $.getJSON(serverRoot + "/json/program/listCard/" + no + "/1/8", (data) => {
    $(program).html(cardBodyFn({list:data}));
  }).done(function(data) {
    
    var i;
    for (i = 0; i < data.length; i++) {
      dday(data[i].startDate, i); //D-day
      reviewScore(data[i].no, i); //별점,리뷰 개수
      trImg(data[i].trainerNo, i);
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
}

function trImg(no, i) {
  $.getJSON(serverRoot + "/json/trainer/" + no, (data) => {
    $("<img/>").attr('src', '../../../files/'+data.userPath)
    .appendTo('.tr-'+i+'').addClass('trainer-img');
  })
}

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
  dd.append(interval);
}

