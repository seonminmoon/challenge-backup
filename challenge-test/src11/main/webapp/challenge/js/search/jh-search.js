// range slide




var cardBody1 = $("#cardBody2").html();
var cardBodyFn = Handlebars.compile(cardBody1);
$.getJSON(serverRoot + "/json/program/listCard", (data) => {
  $(aaa).html(cardBodyFn({list:data}));
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

function trImg(no, i) {
  $.getJSON(serverRoot + "/json/trainer/" + no, (data) => {
    $("<img/>").attr('src', '../../../files/'+data.userPath+'_50x50.jpg')
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



