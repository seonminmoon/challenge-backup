$.ajax({
	method: "GET",
	url : serverRoot + "/challenge/html/timeline/sideMenu.html",
	async: false
}).done(function(data) {
	$("#sh-sideMenu-item").html(data);
	$("#side-user-img").attr("src","../../../files/" + userInfo.userPath + ".jpg")
//	$("#side-user-img").attr("src","../../../files/" + userInfo.userPath)
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
