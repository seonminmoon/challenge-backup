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
  dd.append(interval)
}

// 운동종목 Search Event
// checkbox가 체크되어 있으면 운동항목리스트에 저장
// 운동항목 리스트에 저장하기 전에 내가 현재 클릭한 항목이
// 이미 존재 하는지의 여부를 체크한다.
// 이미 존재한다면 운동항목 리스트에 추가하지 말고
// 존재하지 않는다면 운동항목 리스트에 추가한다.
// 그 후에 들어있는 운동항목 리스트를 불러온다.
var checked = new Array;
$(document.body).on('click', 'input:checkbox', function() {
	$(this).toggleClass("checked"); // 토글 클래스는 해결
	if($(this).hasClass('checked')) {
		checked.push($(this).val());
		console.log("push");
	} else {
		checked.pop($(this).val());
		console.log("pop");
	}

	for(var i = 0; i < checked.length; i++) {
		for(var j = 0; j < i; j++) {
			if(checked[i] == checked[j]) {
				checked.pop($(this).val());
			}
		}
	}
	
	var pType = checked;
	$.ajax({
		url: serverRoot + "/json/program/typeList",
		data: {"pType": pType}
	}).done(function(data) {
		console.log(data);
		console.log(data.length);
		for(var i = 0; i < data.length; i++) {
			$('#aaa').html(cardBodyFn({list:data}));
		}
		
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

});

// 가격순 Search
$('#priceList').on('click', function() {
$.getJSON(serverRoot + "/json/program/priceList", (data) => {
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
});

// 최신순 Search
$('#popularList').on('click', function() {
$.getJSON(serverRoot + "/json/program/dateList", (data) => {
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
});

