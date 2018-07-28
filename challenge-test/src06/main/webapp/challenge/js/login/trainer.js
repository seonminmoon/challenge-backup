$("#addBtn").click(() => {	
	
    $.post(serverRoot + "/json/trainer/add", {
      name: $("#fName").val(),
      sex: $('input[name]:checked').val(),
      email: $("#fId").val() + '@' + $("#fid2 option:selected").val(),
      password: $("#fPassword").val(),
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
