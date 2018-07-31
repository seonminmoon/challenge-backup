//챌린지 가져오기
var chalBody = $("#proInsert").html();

var chalBodyFn = Handlebars.compile(chalBody);

$.getJSON(serverRoot + "/json/challenge/list", (data) => {
  $(chalTab).html(chalBodyFn({list:data}));
});



//탭 메뉴
document.getElementById("next1").onclick = function() {
  openCity(event, 'sm-tab1')
}
document.getElementById("next2").onclick = function() {
  openCity(event, 'sm-tab2')
}
document.getElementById("next3").onclick = function() {
  openCity(event, 'sm-tab3')
}
document.getElementById("next4").onclick = function() {
  openCity(event, 'sm-tab2')
  document.getElementById("next2").style.backgroundColor = "#1B3453";
}
document.getElementById("next5").onclick = function() {
  openCity(event, 'sm-tab1')
}
document.getElementById("next6").onclick = function() {
  openCity(event, 'sm-tab3')
}
document.getElementById("next7").onclick = function() {
  openCity(event, 'sm-tab2')
}

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("sm-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("sm-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}



//주소검색
var postSearch = document.getElementById("postSearch");
postSearch.onclick = function() {
  sample6_execDaumPostcode()
}

function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function(data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var fullAddr = ''; // 최종 주소 변수
      var extraAddr = ''; // 조합형 주소 변수

      // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
        fullAddr = data.roadAddress;

      } else { // 사용자가 지번 주소를 선택했을 경우(J)
        fullAddr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
      if(data.userSelectedType === 'R'){
        //법정동명이 있을 경우 추가한다.
        if(data.bname !== ''){
          extraAddr += data.bname;
        }
        // 건물명이 있을 경우 추가한다.
        if(data.buildingName !== ''){
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
        fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample6_postcode').value = data.zonecode; //5자리 새우편번호 사용
      document.getElementById('sample6_address').value = fullAddr;

      // 커서를 상세주소 필드로 이동한다.
      document.getElementById('sample6_address2').focus();
    }
  }).open();
}


// 금액 콤마
$(".numberic").each(function(){
  $(this).number(true);
});



/* 더보기 임시 */
function moreFunction() {
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("moreBtn");

  if (moreText.style.display === "none") {
    moreText.style.display = "inline-block";
  } else {
    moreText.style.display = "inline-block";
  }
}
var moreBtn = document.getElementById("moreBtn");
moreBtn.onclick = function() {
  moreFunction()
}
var lessBtn = document.getElementById("lessBtn");
lessBtn.onclick = function() {
  lessFunction()
}
/* 줄이기 임시 */
function lessFunction() {
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("lessBtn");

  if (moreText.style.display === "inline-block") {
    moreText.style.display = "none";
  } else {
    moreText.style.display = "inline-block";
  }
}


// 프로그램 이미지
var imgFiles;
$('#fileupload2').fileupload({
  url: serverRoot + '/json/programMedia/add',        // 서버에 요청할 URL
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
      // 요일, 시간
      var selectTime = ['','','','','','',''];
      $(".time-slot[data-selected]").each(function(i, tag) {
        var e = $(tag);
        for(i = 0; i < selectTime.length; i++) {
          if (e.attr('data-day') == i) {
            selectTime[i] += e.attr('data-time') + ',';
          }
        }
      });
      var proDay = '';
      var proTime = '';
      for (i = 0; i < selectTime.length; i++) {
        if (selectTime[i] !== '') {
          proDay += i + ' ';
          proTime += selectTime[i] + ' ';
        }
      }

      $('#addBtn').unbind("click");
      $('#addBtn').click(function() {

        // 데이터 입력
        data.formData = {
            postNo: $(sample6_postcode).val(),
            address: $(sample6_address).val(),
            addDetail: $(sample6_address2).val(),
            name: $(fname).val(),
            startDate: $(fStartDate).val(),
            endDate: $(fEndDate).val(),
            minQty: $(fminQty).val(),
            maxQty: $(fmaxQty).val(),
            price: $(fprice).val(),
            description: $(fdescription).val(),
            proType: $(ftype).val(),
            proGoal: $(fprgoal).val(),
            proGoalNum: $(fprogoalnum).val(),
            proTh: $(fth).val(),
            proTurn: $(fptover).val(),
            proDay: proDay,
            proTime: proTime,
            challengeNo: $(chalTab).val(),
            "trainerNo.userNo": obj.userNo
        }
        data.submit();
      });
    }, 
    submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
      console.log('submit2()...');
    }, 
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
      console.log('done2()...');
//      location.href = 'programList.html';
    }
});
function delImg(event){
  var wrapperDiv = $(event.currentTarget);
  wrapperDiv.remove();
  var fileIndex =wrapperDiv.attr('data-file-index');
  imgFiles.splice(fileIndex, 1);
}
