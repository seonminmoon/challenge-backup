if (location.href.split("?").length > 1) {
	var no = location.href.split("?")[1].split("=")[1];
	
	console.log($.getJSON(serverRoot + "/json/plan/2"));

	console.log(
			$.getJSON(serverRoot + "/json/plan/2")
			
			.done(function (data) {
				console.log("불러옴")
			})
			.fail(function (data){
				console.log("실ㅠㅐ!!")
			})
	);
	
	
//	$.getJSON(serverRoot + "/json/plan/" + no, function(data) {
//		$("#planSdt").append(data.program.startDate);
//		$("#planEdt").append(data.program.endDate);
//        $("#planName").append(data.program.name);
//	});
}