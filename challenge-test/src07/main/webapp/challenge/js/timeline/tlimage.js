
/*
// 타임라인 카드에서 이미지 추가
//이미지
$('#sh_tl_upload').fileupload({
  url: '../../../fileupload/upload',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
//  maxNumberOfFiles : 1,
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: true, // 한 요청에 여러 개의 파일을 전송시키기.
  autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
  disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
  previewMaxWidth: 633,   // 미리보기 이미지 너비
  previewMaxHeight: 300,  // 미리보기 이미지 높이 
  previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
  processalways: function(e, data) {
      console.log('fileuploadprocessalways()...');
      console.log(data.file);
      var imagesDiv = $('#images-div');
      imagesDiv.html("");
      for (var i = 0; i < data.files.length; i++) {
        try {
          if (data.files[i].preview.toDataURL) {
            $("<img>").attr('src', data.files[i].preview.toDataURL()).css('width', '300px').appendTo(imagesDiv);
          }
        } catch (err) {}
      }
    $('#sh-tl-post-btn').unbind("click");
    $('#sh-tl-post-btn').click(function() {
        data.submit();
    });
  }, 
  submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
    console.log('submit()...');
    console.log(data.result)
  }, 
  done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    console.log('done()...');
    console.log(data.result);
    $.each(data.result.files, function(index, file) {
        $('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
        $('#sh-tl-post-btn').unbind("click");    
    $('#sh-tl-post-btn').click(function() {
        $.ajax({
      	    type: 'POST',
      	    url: '../../../json/timeline/add',
      	    data: {
      	      picture: file.filename,
      	      content: $('#sh_tl_post_write').val(),
      	      "progMemb.no" : objPmemb[0].no,
      	      "progMemb.users.userNo" : obj.userNo
      	      
      	    },
      	    async: false
      	  }).done(function() {
      	    console.log("입력됨.");
      	  });
        data.submit();
    });
    });
    location.href = "timeline.html"
    
    $('<p/>').text("name : " + data.result.name).appendTo(document.body);
    $('<p/>').text("age : " + data.result.age).appendTo(document.body);
    $.each(data.result.files, function(index, file) {
      $('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
    });
    $("<img>").attr('src', data.files[0].preview.toDataURL()).css('width', '100px').appendTo($('#images-div-load'));
  
  }
});
*/