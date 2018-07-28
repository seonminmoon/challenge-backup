// 운동일지 보기
if (location.href.split("?").length > 1) {
	var pno = location.href.split("?")[1].split("=")[1];
		
	$.ajax(serverRoot + "/json/plan/list/" + pno, {
		dataType: "json",	
	    success(data) {
			$("#programName").append(data[0].program.name);
	        $("#sdt").append("기간: " + data[0].program.startDate + " ~ ");
	        $("#edt").append(data[0].program.endDate);
	        
	        for (var item of data) {
	        	var li = document.createElement("li");
	        	li.innerHTML = "<div class='dayContent'>" + 
	        		"<h4 class='time'>" + "Day"+ item.planTurn + "</h4>" +
	        		"<p>" + item.planContent + "</p>" + "</div>" +
	        		"<div class='editIcon'>" + 
	        		"<i class='fas fa-plus-circle'>" + "</i>" +
	        		"<i class='far fa-edit'>" + "</i>" + "</div>";
	        	planList.appendChild(li);
	        }
	    },
	    error() {
	        window.alert("report.js 실행 오류!");
	    }	
	});
}

//li-template
var liTemplateSrc = $("#li-template").html();
var templateFn = Handlebars.compile(liTemplateSrc);
$.getJSON(serverRoot + "/json/plan/list/", (data) => {
 $('#programList').html(templateFn({list:data}));
});

/* 탭 메뉴 이벤트 */
$(document).on('click','.tabSelect', function(){
	if ($(".tabSelect").find(".active")) {
		$(".tabSelect").removeClass("active");
		$(".tabSelect a").css("color", "#777");
	}
	$(this).addClass("active");
	$(".active a").css("color", "#fff");
});

// 모달 관련 이벤트
var modal = document.getElementById('myModal');
var btn = document.getElementById("addPlan");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
    // 프로그램 회차 관련
    var programNo = location.href.split("?")[1].split("=")[1];
    $.getJSON(serverRoot + "/json/plan/list/" + programNo, (data) => {
     for (var count = data.length + 1; count <= data[0].program.proTurn; count++) {
     	var option = $("<option>" + count +"</option>");
     	$('#mTurn').append(option);
     }
    });
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$("#registerPlan").click(() => {
	var programNo = location.href.split("?")[1].split("=")[1];
	$.post(serverRoot + "/json/plan/add", {
		planTurn: $("#mTurn").val(),
		planDate: $("#mDate").val(),
		planTitl: $("#mTitle").val(),
		planContent: $("#mContent").val(),
		"program.no": programNo
	}, () => {
		location.href = "reportList.html?no=" +programNo;
	});
});
