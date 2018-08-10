var trTemplateSrc = $("#tr-template").html();

//위에서 준비한 템플릿 데이터를 가지고 HTML을 생성할 템플릿 엔진 준비
var templateFn = Handlebars.compile(trTemplateSrc);
if (location.href.split("?").length > 1) {
	var userInfo = location.href.split("?")[1].split("=")[1];

$.getJSON(serverRoot + "/json/programMember/lList/" + userInfo, (data) => {
	console.log(data);
	//$tableBody.innerHTML = templateFn({list:data});
	$("#aaaa").html(templateFn({list:data}));
});
}