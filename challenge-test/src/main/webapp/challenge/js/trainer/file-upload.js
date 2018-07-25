/*// 상세미디어
var imgFiles;
var subImglen;
var subImg;
$('#fileupload2').fileupload({
  url: '../../../json/fileupload2/upload02',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
  autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
  disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기

  imageMaxWidth: 800,
  imageMaxHeight: 800,
  imageCrop: true, // Force cropped images
        
  previewMaxWidth: 100,   // 미리보기 이미지 너비
  previewMaxHeight: 100,  // 미리보기 이미지 높이 
  previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
  processalways: function(e, data) {
      console.log('fileuploadprocessalways()...');
      console.log(data.files);
      imgFiles = data.files;
      var imagesDiv = $('#ad-images-div');
      imagesDiv.html("");
      for (var i = 0; i < data.files.length; i++) {
        try {
          if (data.files[i].preview.toDataURL) {
            var imgWrapper = $('<div>')
            .attr("data-file-index", i)
            .addClass('ad-adImgs-wrapper')
            .click(delImg)
            .appendTo(imagesDiv);
    var imgContent = $('<div>')
            .addClass('ad-adImgs-content')
            .appendTo(imgWrapper);
    var imgCover = $('<div>')
            .addClass('ad-adImgs-cover')
            .appendTo(imgWrapper);
    $("<img/>").attr('src', data.files[i].preview.toDataURL()).appendTo(imgContent).addClass('ad-adImgs');
          }
        } catch (err) {}
      }
      //$('#addBtn').unbind("click");
      $('#addBtn').click(function() {
          data.submit();
      });
  }, 
  submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
    console.log('submit2()...');
  }, 
  done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    console.log('done2()...');
    console.log(data.result);
    subImglen = data.result.files.length
    subImg = data.result.files
    console.log(data.result.files[0].filename)
    
    
    $.each(data.result.files, function(index, file) {
      $('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
    });
  }
});
function delImg(event){
  var wrapperDiv = $(event.currentTarget);
  wrapperDiv.remove();
    var fileIndex =wrapperDiv.attr('data-file-index');
    imgFiles.splice(fileIndex, 1);
}*/