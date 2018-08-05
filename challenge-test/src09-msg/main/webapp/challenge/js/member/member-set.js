//회원정보 읽어오기
$(document).ready(function () {
	
	$('#email').val(userInfo.email);
	$('#phone').val(userInfo.userPhone);
	$("<img>").attr('src', '../../../files/'+ userInfo.userPath).css('border-radius', '50%').appendTo('#images-div');



});

"use strict"

var dbimg;

$('#fileupload').fileupload({
	url: serverRoot +'/json/fileupload/upload02',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.

	disableImageResize: /Android(?!.*Chrome)|Opera/
		.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
		previewMaxWidth: 120,   // 미리보기 이미지 너비
		previewMaxHeight: 120,  // 미리보기 이미지 높이 
		previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
		processalways: function(e, data) {
	

			var imagesDiv = $('#images-div');
			imagesDiv.html("");
			for (var i = 0; i < data.files.length; i++) {
				try {
					if (data.files[i].preview.toDataURL) {
						$("<img>").attr('src', data.files[i].preview.toDataURL()).css('border-radius', '50%').appendTo(imagesDiv);
					}
				} catch (err) {}
			}

		}, 
		submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
			


		}, 
		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.


			
			dbimg = data.result.files[0].filename;





		}
});





$("#upload-btn").click(() => {
	if(dbimg !=null) { //이미지 수정을 했을때

		$.ajax({
			type: 'POST',
			async: false,
			traditional : true,
			url: serverRoot + '/json/user/update2' ,
			data: {

				email: $('#email').val(),
				userPhone: $('#phone').val(),
				userPath: dbimg,
				userNo: userInfo.userNo

			}, 
		}).done(function() {

			alert('회원님 정보가 수정되었습니다');
			location.href = "http://localhost:8888/challenge-project/challenge/html/member/member-set.html";
		});
	}else{ //이미지 수정을 안하고 다른것만 수정했을때
		$.ajax({
			type: 'POST',
			async: false,
			traditional : true,
			url: serverRoot + '/json/user/updateNotimg' ,
			data: {

				email: $('#email').val(),
				userPhone: $('#phone').val(),
				userNo: userInfo.userNo

			}, 
		}).done(function() {

			alert('회원님 정보가 수정되었습니다');
			location.href = "http://localhost:8888/challenge-project/challenge/html/member/member-set.html";
		});
	}
});

//비밀번호 갱신시 실행되는 조건문

$(document).ready(function () {
	$("#upload-btn").click(() => {
		if ($('.pwd').val() != "") {
			$.ajax({
				type: 'POST',
				async: false,
				traditional : true,
				url: serverRoot + '/json/user/update3' ,
				data: {

					email: $('#email').val(),
					userPhone: $('#phone').val(),
					password: $('.pwd').val(),

					userNo: userInfo.userNo

				}, 
			}).done(function() {

				alert('비밀번호 변경 완료');
				location.href = "http://localhost:8888/challenge-project/challenge/html/member/member-set.html";
			});

		}
	});
});
