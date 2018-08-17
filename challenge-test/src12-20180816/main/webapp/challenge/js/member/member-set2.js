

$("#updBtn").click(() => {
	$.ajax({
        type: 'POST',
        url: serverRoot + '/json/bodyInfo/add',
        data: {
            userNo: userInfo.userNo,
        	bdate: $('#setmdate').val(),
            weight: $('#setweight').val(),
            muscle: $('#setmuscle').val(),
            fat: $('#setfat').val()

        }
    }).done(function() {
		swal({
			  position: 'center',
			  type: 'success',
			  title: '등록완료!',
			  showConfirmButton: false,
			  timer: 1500
			})
	    var updateLocation = $('.active').attr("data-name");
		if(updateLocation == 'weightTab') {
			$.get(serverRoot + "/json/bodyInfo/list/" + userInfo.userNo, function(data) {
				for (var i = 0; i < data.length; i++) {
					weightInfo.push({
						"date" : data[i].bdate,
						"value" : data[i].weight
					})
				}
			});
		} else if(updateLocation == 'fatTab') {
			$.get(serverRoot + "/json/bodyInfo/list/" + userInfo.userNo, function(data) {
				for (var i = 0; i < data.length; i++) {
					fatInfo.push({
						"date" : data[i].bdate,
						"value" : data[i].fat
					})
				}
			});	
		} else if(updateLocation == 'muscleTab') {
			$.get(serverRoot + "/json/bodyInfo/list/" + userInfo.userNo, function(data) {
				for (var i = 0; i < data.length; i++) {
					muscleInfo.push({
						"date" : data[i].bdate,
						"value" : data[i].weight
					})
				}
			});
		}
    	$('#setmdate').val('');
    	$('#setweight').val('');
    	$('#setmuscle').val('');
    	$('#setfat').val('');
    	location.href = "member-my.html";
    });
});

$(function() {
    $("#setmdate").datepicker({
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        dateFormat: "yy-mm-dd"
    });
});
