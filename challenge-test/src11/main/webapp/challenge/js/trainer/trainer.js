if (location.href.split("?").length > 1) {
  var no = location.href.split("?")[1].split("=")[1];

  $.getJSON(serverRoot + "/json/trainer/" + no, function(data) {
    $(fname).append(data.name);
    $('<img/>')
    .attr('src', '../../../files/'+data.userPath+'_100x100.jpg')
    .attr('class', 'tr1-img')
    .appendTo($(fuserPath));
    $(fintroduce).append(data.introduce);
    $(fcareer).append(data.career);
    $(ftime).append(data.time);
  }).done(function() {
    console.log('트레이너')
  })

  //숫자를 별로 변환
  $.fn.generateStars = function() {
    return this.each(function(i,e){$(e).html($('<span/>').width($(e).text()*16));});
  };

  $.getJSON(serverRoot + "/json/programMember/trainerReviewCount/" + no, function(data) {
    $(freviewCount).append(data);
    var count = data;
    $.getJSON(serverRoot + "/json/programMember/trainerReviewScore/" + no, function(data) {
      $('.star-prototype').append(data / count);
    }).done(function() {
      $('.star-prototype').generateStars(); 
      console.log('평점')
      
    })
  })

  loadComment(no);
}


//댓글리스트
function loadComment(no) {
  var trTemplateSrc3 = $("#commentList").html();
  var templateFn3 = Handlebars.compile(trTemplateSrc3);
  $.getJSON(serverRoot + "/json/programMember/trainerReviewList/" + no, (data) => {
    $('#tr3-ul').append(templateFn3({list: data}));
  }).done(function(data) {
    //숫자 평점을 별로 변환하도록 호출하는 함수
    $('.star-prototype2').generateStars();
    load('#tr3-eval', '3');
    console.log('댓글가져오기')
  })
}


//댓글 더보기
$(moreBtn).on("click", function () {
  load('#tr3-eval', '5', '#tr-plus-btn');
})
function load(id, cnt, btn) {
  var comment_list = id + " .tr3-li:not(.active)";
  var comment_length = $(comment_list).length;
  var comment_total_cnt;
  if (cnt < comment_length) {
    comment_total_cnt = cnt;
  } else {
    comment_total_cnt = comment_length;
    $('#tr-plus-btn').hide();
  }
  $(comment_list + ":lt(" + comment_total_cnt + ")").addClass("active");
}

// 프로그램 가져오기
var cardBody1 = $("#cardBody1").html();
var cardBodyFn = Handlebars.compile(cardBody1);
$.getJSON(serverRoot + "/json/program/listProgram/" + no, (data) => {
  $(program).html(cardBodyFn({list:data}));
}).done(function(data) {
  console.log('프로그램')
  var i;
  $(fproCount).append(data.length + '개');
  $(fproType).append(data[0].proType);
  for (i = 0; i < data.length; i++) {
    trImg(i); // 트레이너 이미지
    dday(data[i].startDate, i); //D-day
    reviewScore(data[i].no, i); //별점,리뷰 개수
    pmemberCount(data[i].no, i);
    var price = addComma($(".numberic-"+i+"").html())
    var place = ($(".card-body-local-"+i+"").html()).substring(3, 6);
    $(".numberic-"+i+"").html(price)
    $(".card-body-local-"+i+"").html(place)
  }

  function trImg(i) {
    $.getJSON(serverRoot + "/json/trainer/" + no, (data) => {
      $("<img/>").attr('src', '../../../files/'+data.userPath+'_50x50.jpg')
      .appendTo('.tr-'+i+'').addClass('trainer-img');
    })
  }

  $.fn.generateStars = function() {
    return this.each(function(i,e){$(e).html($('<span/>').width($(e).text()*16));});
  };
 
});

function als() {
  $("#lista1").als({
    visible_items: 2,
    scrolling_items: 1,
    orientation: "horizontal",
    circular: "yes",
    autoscroll: "yes",
    interval: 5000,
    speed: 10000,
    easing: "linear",
    direction: "left",
    start_from: 0
    });
    console.log('als')
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


