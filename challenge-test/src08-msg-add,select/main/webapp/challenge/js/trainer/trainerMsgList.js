console.log(userInfo)
var receiveMsgTemplateSrc = $("#receiveMsg-template").html();
var templateFn = Handlebars.compile(receiveMsgTemplateSrc);
$.getJSON(serverRoot + "/json/message/list1/" + userInfo.userNo + "/" + userInfo.userType, (data) => {
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
	$.getJSON(serverRoot + "/json/message/list1/"+ userInfo.userNo + "/" + userInfo.userType + ";pageNo=1", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});

$("#page-2").click(function() {
	$.getJSON(serverRoot + "/json/message/list1/"+ userInfo.userNo + "/" + userInfo.userType + ";pageNo=2", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});

$("#page-3").click(function() {
	$.getJSON(serverRoot + "/json/message/list1/"+ userInfo.userNo + "/" + userInfo.userType + ";pageNo=3", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});

$("#page-4").click(function() {
	$.getJSON(serverRoot + "/json/message/list1/"+ userInfo.userNo + "/" + userInfo.userType + ";pageNo=4", (data) => {
	    $(listbody).html(templateFn({list:data}));
	});
});