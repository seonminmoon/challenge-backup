$.ajax({
	method: "GET",
	url : serverRoot + "/challenge/html/timeline/sideMenu.html",
	async: false
}).done(function(data) {
	$("#sh-sideMenu-item").html(data);
	$("#side-user-img").attr("src","../../../files/" + userInfo.userPath)
})

  /* top 버튼*/

  $('#MOVE_TOP_BTN').click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 300);
  });


// 회원 리스트
var mlTemplateSrc = $("#ml-template").html();
var mltemplateFn = Handlebars.compile(mlTemplateSrc);

$.getJSON(serverRoot + "/json/programMember/list/" + userInfo.programs[0].no + "/" + userInfo.programs[0].trainerNo, (data) => {
	$("#style-1").append(mltemplateFn({list: data}));
}).done(function (data) {
	console.log("회원 리스트 불러옴.")
});

// 회원 리스트 Handlebars
/*
function loadCards(pageCount) {
	  var mlTemplateSrc = $("#ml-template").html();
	  var templateFn = Handlebars.compile(mlTemplateSrc);

	  $.getJSON(serverRoot + "/json/timeline/list/" + pageCount + "/6", (data) => {
	    $('#sh_tl_card_add').append(templateFn({
	      list: data
	    }));
	  }).done(function(data) {
	    var i;
	    for (i = 0; i < data.length; i++) {
	      loadComments(data[i].no);
	      timelineLikeCount(data[i].no);
	      if (data[i].picture) {
	    	  // 얘는 타임라인 카드의 이미지임.
	        $("#img" + data[i].no).append("<img src='../../../files/" + data[i].picture + "_600x600.jpg'>");
	      } 
	    }
	    $('.sh-tl-user-img-load').attr("src", "../../../files/" + userInfo.userPath);
	  });
	}
*/