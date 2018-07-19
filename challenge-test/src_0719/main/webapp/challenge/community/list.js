// 템플릿 엔진이 사용할 템플릿 데이터 가져오기
var trTemplateSrc = $("#tr-template").html();

//위에서 준비한 템플릿 데이터를 가지고 HTML을 생성할 템플릿 엔진 준비
var templateFn = Handlebars.compile(trTemplateSrc);

console.log();
$.getJSON(serverRoot + "/json/community/list", (data) => {
	//$tableBody.innerHTML = templateFn({list:data});
    $(listbody).html(templateFn({list:data}));
});