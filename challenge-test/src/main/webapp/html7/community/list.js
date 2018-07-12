// 템플릿 엔진이 사용할 템플릿 데이터 가져오기
var trTemplateSrc = $("#tr-template").html();
var trTemplateSrc2 = $("#tr-template2").html();

//위에서 준비한 템플릿 데이터를 가지고 HTML을 생성할 템플릿 엔진 준비
var templateFn = Handlebars.compile(trTemplateSrc);
var templateFn2 = Handlebars.compile(trTemplateSrc2);

console.log();
$.getJSON(serverRoot + "/json/community/list", (data) => {
	//$tableBody.innerHTML = templateFn({list:data});
    $(listbody).html(templateFn({list:data}));
});

console.log();
$.getJSON(serverRoot + "/json/community/noticeList", (data) => {
	//$tableBody.innerHTML = templateFn2({list:data});
    $(noticeListbody).html(templateFn2({list:data}));
});