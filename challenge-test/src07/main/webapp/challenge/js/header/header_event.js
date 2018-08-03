function expand() {
  $('.sh-input').attr("placeholder","");
  $(".sh-searchBtn").toggleClass("sh-close");
  $(".sh-input").toggleClass("sh-square");
  if ($('.sh-searchBtn').hasClass('sh-close')) {
    $('sh-input').focus();
    $('.sh-input').attr("placeholder","지역,프로그램명");
  } else {
    $('sh-input').blur();
  }
}
$('.sh-searchBtn').on('click', expand);


// USER 객체 정보 저장
var obj;
$.ajax({
    method: "GET",
    dataType: "json",
    url: serverRoot + "/json/auth/loginUser",
    async: false
  })
  .done(function(data) {
    obj = data;
    pmembLoader()
  });
console.log(obj);

//로그인 여부(obj객체 유무에 따라)에 따른 헤더 Nav 메뉴 변경
if(obj != null) {
	$(".login_menu_before").attr("style", "display:none")
	$("#sh-user-name").html(obj.name)
	$("#logoutBtn").click((e) => {
		e.preventDefault(); // 클릭했을 때 원래 하던 일이 있는데 그것을 하지 말라!
		$.get(serverRoot + "/json/auth/logout", () => {
			location.href = serverRoot + "/challenge/html/login/login.html";
		});
	});
	
	console.log("OKOK!")
} else {
	$(".login_menu_after").attr("style", "display:none")
}

// PMEMB 객체 정보 저장 (복수 허용)
var objPmemb
function pmembLoader() {
	console.log("pmembLoader 불려짐")
$.ajax({
	method: "GET",
	dataType: "json",
	url : serverRoot + "/json/programMember/" + obj.userNo,
    async: false
}).done(function(data) {
	objPmemb = data;
});
}

console.log(objPmemb)

