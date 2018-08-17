//프로그램 이미지
$('#fileupload').fileupload({
  url: serverRoot + '/json/challenge/add',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
  autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
  disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
  previewMaxWidth: 400,   // 미리보기 이미지 너비
  previewMaxHeight: 400,  // 미리보기 이미지 높이 
  previewCrop: false,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
  processalways: function(e, data) {
      console.log('fileuploadprocessalways()...');
      console.log(data.files);
      for (var i = 0; i < data.files.length; i++) {
        try {
          if (data.files[i].preview.toDataURL) {
            $("<img>").attr('src', data.files[i].preview.toDataURL()).appendTo(chalImg);
          }
        } catch (err) {}
      }
      $('#addBtn').unbind("click");
      $('#addBtn').click(function() {
          data.submit();
          console.log(data.files)
      });
  }, 
  submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
    console.log(data.files)
    console.log('submit()...');
    data.formData = {
        title: $(aTitle).val(),
        content: $(content).val()
    };
    console.log(data.files)
    console.log(data)
  }, 
  done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    console.log(data.files)
    console.log(data)
    console.log('done()...');
    console.log(data.result);
  }
});

