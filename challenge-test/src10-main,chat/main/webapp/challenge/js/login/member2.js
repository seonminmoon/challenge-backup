/*$("#addBtn").click(() => {

    $.post(serverRoot + "/json/member/add", {
      name: $("#fName").val(),
      sex: $('input[name]:checked').val(),
      email: $("#fId").val() + '@' + $("#fid2 option:selected").val(),
      password: $("#fPassword").val(),
      userPhone: $("#fPhone1").val() + '-' + $("#fPhone2").val() + '-' + $("#fPhone3").val(),
      userPath: $("#fPath").val(),
      userType: '1'
    })
    .done(() => {
    	alert("회원 등록 완료!");
        location.href = "../login/login.html";
    })
    .fail(() => {
    	alert("회원 등록 실패!")
    });
});*/


//추가항목
	$(function() {
		$("#signupForm").validate({
			rules : {
				fName : "required",
				fGen : {
					required : "checked",
					minlength : 1
				},
				email : "required",
				fPassword : {
					required : true,
					minlength : 4,
					maxlength : 8
				},
				pwd_re : {
					required : true,
					equalTo : "#pwd"
				},
				
				agree : "required"
			},
			messages : {
				fName : "이름은 필수 입력 항목 입니다.",
				fGen : {		
					minlength : "최소 {0}개 이상 체크해 주세요."
				},
				email : {
					required : "이메일을 입력해 주세요.",
					email : "이메일이 형식에 맞지 않습니다."
				},
				fPassword : {
					required : "비밀번호를 입력해 주세요.",
					minlength : "비밀번호는 최소 {0}글자 입니다.",
					maxlength : "비밀번호는 최대 {0}글자 입니다.",
				},
				pwd_re : {
					required : "비밀번호 확인값을 입력해 주세요.",
					equalTo : "비밀번호 확인이 잘못되었습니다."
				},
				agree : "약관 동의에 체크해 주세요."
			},
			// 키보드에 의한 검사 해제
			onkeyup : false,
			// 체크박스나 라디오 버튼은 클릭시마다 검사 해제
			onclick : false,
			// 포커스가 빠져나올 경우의 검사 해제
			onfocusout : false,
			// 에러 발생시 이벤트를 가로 챔
			showErrors : function(errorMap, errorList) {
				// 에러메시지 출력
				alert(errorList[0].message);
			}
		});
	});