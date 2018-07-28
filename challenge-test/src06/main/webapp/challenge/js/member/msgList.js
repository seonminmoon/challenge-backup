// 템플릿 엔진이 사용할 템플릿 데이터 가져오기
var msgTemplateSrc = $("#msg-template").html();

//위에서 준비한 템플릿 데이터를 가지고 HTML을 생성할 템플릿 엔진 준비
var templateFn = Handlebars.compile(msgTemplateSrc);

$.getJSON(serverRoot + "/json/message/list", (data) => {
	//$tableBody.innerHTML = templateFn({list:data});
    $(listbody).html(templateFn({list:data}));
});



var $pageClick = $('.sm-pagination a');
$pageClick.on('click', function (evt) {
    evt.preventDefault();
    var $this = $(this);
    if ($this.hasClass('pageActive')) {
        return;
    }
    $pageClick.removeClass('pageActive');
    $this.addClass('pageActive');
});


$("#page-1").click(function() {
	$.getJSON(serverRoot + "/json/message/list;pageNo=1", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});

$("#page-2").click(function() {
	$.getJSON(serverRoot + "/json/message/list;pageNo=2", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});

$("#page-3").click(function() {
	$.getJSON(serverRoot + "/json/message/list;pageNo=3", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});

$("#page-4").click(function() {
	$.getJSON(serverRoot + "/json/message/list;pageNo=4", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});