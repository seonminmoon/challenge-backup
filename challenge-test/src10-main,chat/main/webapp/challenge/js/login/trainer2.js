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
      fTrntime2 : "required",

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
      fTrntime2 : "상담시간은 필수 입력 항목 입니다.",

      fTrnacnt : "계좌번호는 필수 입력 항목 입니다.",

      fTrnbank : "은행명은 필수 입력 항목 입니다.",


      agree : "약관 동의에 체크해 주세요."
    },

  });
});

/* 파일 업로드 관련  이미지 추가했을 경우 */
$('#fPath').fileupload({
  url: serverRoot + '/json/trainer/add',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
  autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
  disableImageResize: /Android(?!.*Chrome)|Opera/
    .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    imageMaxWidth: 500,
    imageMaxHeight: 500,
    imageCrop: true,
    previewMaxWidth: 200,   // 미리보기 이미지 너비
    previewMaxHeight: 200,  // 미리보기 이미지 높이 
    previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
    processalways: function(e, data) {
      imgFiles = data.files;
      var imagesTd = $('#images-Td');
      imagesTd.html("");
      for (var i = 0; i < data.files.length; i++) {
        try { // css 적용
          if (data.files[i].preview.toDataURL) {
            $("<img>").attr('src', data.files[i].preview.toDataURL()).css('width', '200px').appendTo(imagesTd);
            console.log(imgFiles);
          }
        } catch (err) {
          console.log(err);
        }
      }
      $('#addBtn').unbind("click");
      $('#addBtn').click(function() {
        data.formData = {   
            name: $("#fName").val(),
            sex: $('input[name]:checked').val(),
            email: $("#fId").val(),
            password: $("#pwd").val(),
            userPhone: $("#fPhone1").val() + '-' + $("#fPhone2").val() + '-' + $("#fPhone3").val(),
            userType: '2',

            introduce: $("#fTrnint").val(),
            career: $("#fTrancar").val(),
            time: $("#fTrntime").val() + ' ~ ' + $("#fTrntime2").val(),
            account: $("#fTrnacnt").val(),
            bank: $("#fTrnbank").val(),
            coin: 0
        }
        data.submit();
      });
    }, 
    submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
      console.log('submit()...');
      console.log(data);
    }, 
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
      console.log('done()...');
      console.log(data.result);
    }
});

/* 파일 업로드 관련  default이미지 적용할 경우*/
$("#addBtn").click(() => {
  if(typeof imgFiles == "undefined") {
    $.post(serverRoot + "/json/trainer/add02", {
      name: $("#fName").val(),
      sex: $('input[name]:checked').val(),
      email: $("#fId").val(),
      password: $("#pwd").val(),
      userPhone: $("#fPhone1").val() + '-' + $("#fPhone2").val() + '-' + $("#fPhone3").val(),
      userPath: 'default.jpg',
      userType: '2',

      introduce: $("#fTrnint").val(),
      career: $("#fTrancar").val(),
      time: $("#fTrntime").val() + '~' + $("#fTrntime2").val(),
      account: $("#fTrnacnt").val(),
      bank: $("#fTrnbank").val(),
      coin: 0
    })
  }
});
