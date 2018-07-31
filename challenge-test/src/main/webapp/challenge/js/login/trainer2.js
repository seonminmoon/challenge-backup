$(function() {
                $("#signupForm").validate({
                    rules : {
                    	fName : "required",
                        
                    	sex: {
                        	required: true,
                        	minlength : 1
                        },
                        pwd : {
                            required : true,
                            minlength : 4,
                            maxlength : 8
                        },
                        pwd_re : {
                            required : true,
                            equalTo : "#pwd"
                        },
                        
                        /*tel1 : "required",*/
                        tel2 : "required",
                        
                        email : {
                            required : true,
                            email : true
                        },
                        fTrnint : "required",
                        
                        fTrancar : "required",
                        
                        fTrntime : "required",
                        
                        fTrnacnt : "required",
                        
                        fTrnbank : "required",
                        
                        agree : "required"
                    },
                    messages : {
                    	fName : "이름은 필수 입력 항목 입니다.",
                       
                    	sex: {
                            required : "성별 선택은 필수입니다..",
                            minlength : " 최소 {0}개 입니다."
                        },
                        pwd : {
                            required : "비밀번호를 입력해 주세요.",
                            minlength : "비밀번호는 최소 {0}글자 입니다.",
                            maxlength : "비밀번호는 최대 {0}글자 입니다.",
                        },
                        pwd_re : {
                            required : "비밀번호 확인값을 입력해 주세요.",
                            equalTo : "비밀번호 확인이 잘못되었습니다."
                        },
                        
/*                        tel1 : "전화번호는 필수 입력 항목입니다.",*/
                        tel2 : "전화번호는 필수 입력 항목입니다.",
                          
                        email : {
                            required : "이메일을 입력해 주세요.",
                            email : "이메일이 형식에 맞지 않습니다."
                        },
                        
                        fTrnint : "자기소개는 필수 입력 항목 입니다.",
                        
                        fTrancar : "경력사항은 필수 입력 항목 입니다.",
                        
                        fTrntime : "상담시간은 필수 입력 항목 입니다.",
                        
                        fTrnacnt : "계좌번호는 필수 입력 항목 입니다.",
                        
                        fTrnbank : "은행명은 필수 입력 항목 입니다.",
                       
                       
                        agree : "약관 동의에 체크해 주세요."
                    },
                    
                });
            });


$("#addBtn").click(() => {	
	
    $.post(serverRoot + "/json/trainer/add", {
      name: $("#fName").val(),
      sex: $('input[name]:checked').val(),
      email: $("#fId").val() + '@' + $("#fid2 option:selected").val(),
      password: $("#pwd").val(),
      userPhone: $("#fPhone1").val() + '-' + $("#fPhone2").val() + '-' + $("#fPhone3").val(),
      userPath: $("#fPath").val(),
      userType: '2',
      
      introduce: $("#fTrnint").val(),
      career: $("#fTrancar").val(),
      time: $("#fTrntime").val(),
      account: $("#fTrnacnt").val(),
      bank: $("#fTrnbank").val(),
      coin: 0
    })
    .done(() => {
    	alert("회원 등록 완료!");
        location.href = "../login/login.html";
    })
});
