$(function () {
var trTemplateSrc = $("#tr-template").html();

//위에서 준비한 템플릿 데이터를 가지고 HTML을 생성할 템플릿 엔진 준비
var templateFn = Handlebars.compile(trTemplateSrc);
if (location.href.split("?").length > 1) {
	var userInfo = location.href.split("?")[1].split("=")[1];

$.getJSON(serverRoot + "/json/programMember/lList/" + userInfo, (data) => {
	console.log(data);
	//$tableBody.innerHTML = templateFn({list:data});
	$("#cccc").html(templateFn({list:data}));
});
}

var trTemplateSrc2 = $("#tr-template2").html();

//위에서 준비한 템플릿 데이터를 가지고 HTML을 생성할 템플릿 엔진 준비
var templateFn2 = Handlebars.compile(trTemplateSrc2);

$.getJSON(serverRoot + "/json/program/list", (data) => {
	console.log(data);
	//$tableBody.innerHTML = templateFn({list:data});
	$("#dddd").html(templateFn2({list2:data}));
});
});
/*$(function () {
	$("#toryBtn").ready(function () {
		$.getJSON("test.js", function(data) {
			$(data).each(function(index,entry){
				$(aaaa).append(entry.address);
				$(bbbb).append(entry.address);
				$(bbbb).append(entry.address);
				if(entry["no"] == 3){
					alert(data.address);
				}
				}
			});
			console.log(data.address);
			$(fTitle).append(data.title);
			$(fUser).append(data.user.name);
			$(fCreatedDate).append(data.createdDate);
			$(fCnt).append(data.cnt);
			//$(fLike).append(data.like);
		});
		});
	});*/

		/*$.ajax({
			type: 'GET',
			url: 'http://challenge.java106.com:8888/challenge-project/json/program/list',
			async: false,
			dataType:"json",
			success:function(data){
				JSON.parse(result);
				$(abcd).append(data.name);
				alert(data);
				console.log("JSON : " + JSON.stringify(data.endDate));
			},
			error : function(a, b,c) {
					//XMLHttpRequest 객체 , error가 발생한 원인에 대한 설명 , exception 객체
			alert(a + "," + b + "," + c );
			}
		});
	});
});*/
				/*if(name.state == 'success'){
					($("#abcd").append(name) == "true");
					
				}	
				else{
					$("#abcd").append(name);
				}
			}
		});
			return false;
	});
});*/
/*if (location.href.split("?").length > 1) {
	var no = location.href.split("?")[1].split("=")[1];*/

	/*$.getJSON("../../../json/program/" + no, function(data) {
		$(fContent).val(data.content);
		$(fTitle).append(data.title);
		$(fUser).append(data.user.name);
		$(fCreatedDate).append(data.createdDate);
		$(fCnt).append(data.cnt);
		$(abcd).append(data.name);
	});
	}}
});*/