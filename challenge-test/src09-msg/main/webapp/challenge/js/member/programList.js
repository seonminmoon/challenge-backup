$(document).ready(function() {
  var cardBody1 = $("#cardBody1").html();
  var cardBodyFn = Handlebars.compile(cardBody1);
  $.getJSON(serverRoot + "/json/programMember/lList/" + userInfo.userNo, (data) => {
    $(cardWide).html(cardBodyFn({list:data}));
  }).done(function(data) {
    var i;
    for (i = 0; i < data.length; i++) {
      console.log(data[i].programNo)
      $.getJSON(serverRoot + "/json/programMedia/" + data[i].programNo, (data) => {
        /*console.log(data.path)
        var cardImg = document.getElementById("cardImg-"+i)
        console.log(cardImg)
        cardImg.attr('src', '../../../files/'+data.path+'_200x200.jpg');*/
      })
      dday(data[i].program.startDate, i);
    }
  });
});

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
