$("#addBtn").click(() => {
	$.post(serverRoot + "/json/user/add", {
		name: $("#fName").val(),
		sex: $('input[name]:checked').val(),
//		sex: $('input[value]:checked').val(),
		id: $("#fid").val() + '@' + $("#fid2").val(),
//		email: $(fEmail2).val(),
		password: $("#fPassword").val(),
//		password: $(fPassword2).val(), 
		userPhone: $("#fPhone1").val() + '-' + $("#fPhone2").val() + '-' + $("#fPhone3").val(),
		userPath: $("#fPath").val(),
		userType: '1'
	}, () => {
		location.href="../auth/login.html";
	});
});

/*$("#addBtn").click(() => {
	$.post(serverRoot + "/json/user/add", {
		name: '김김',
		sex: '여',
		id: 'user11@test.com',
		password: '1111',
		userPhone: '010-1234-5678',
		userPath: 'jj.png',
		userType: '1'
	}, () => {
		console.log("시바");
	});
});*/




/*$("#addBtn").click(() => {
	$.post(serverRoot + "/json/user/add", {
		name: $(fName).val(),
		email: $(fEmail1).val() + '@' + $(fEmail2).val(),
		password: $(fPassword1).val()
	}, () => {
		location.href="../auth/login.html";
	});
});*/




/*$("#addBtn").click(() => {
	$.ajax({
		type: "POST",
		url: serverRoot + '/json/user/add',
		dataType: 'json',
		async: false,
		data:{
			name: $(fName).val(),
			sex: $(fGen).val(),
			email: $(fEmail).val(),
			password: $(fPassword).val(),
			userPhone: $(fPhone).val(),
			userPath: $(fPath).val(),
			userType: $(fType).val()
		}
	}).done(function(){
		console.error("성공???");
	});
});
 */