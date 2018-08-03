
window.onscroll = function() {
  myFunction()
};

var sh_Class_Daily = document.getElementById("sh-Class-Daily");
var diff = document.getElementById("sh-mainContainer");
var sticky = (diff.offsetTop + 27 + 76);
/*
1. offsetTop => sh-mainContainer부터 top까지 거리
2.sh-contentCol의 padding값(27)만큼 더함
*/
function myFunction() {
  if (window.pageYOffset >= sticky) {
    sh_Class_Daily.classList.add("sh_class_daily_sticky")
  } else {
    sh_Class_Daily.classList.remove("sh_class_daily_sticky");
  }
}

/* 강의계획서 더보기 */
function shClassFunction() {
  var dots = document.getElementById("sh-class-dots");
  var moreText = document.getElementById("sh-class-more");
  var divText = document.getElementById("shClassDiv");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    divText.innerHTML = "운동일정 보기";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    divText.innerHTML = "닫기";
    moreText.style.display = "inline";
  }
}

/* 타임라인 글 작성 textarea auto-growing / self-resizing */
function resizeFunction() {
	$('.sh-tl-reply-content').css('height', 'auto');
	$('.sh-tl-reply-content').height(this.scrollHeight);
}

/* 댓글 auto-growing / self-resizing */
function resize(obj) {
	  obj.style.height = "1px";
	  obj.style.height = (obj.scrollHeight)+"px";
	}


/* modal event javascript -> jQuery for using timeline edit and delete event*/
// Get the modal
//var modal = document.getElementById('sh-tl-myModal');
var modal = $('#sh-tl-myModal');

// Get the button that opens the modal
//var btn = document.getElementById("sh-tl-myModalBtn");
var btn = $('#sh-tl-myModalBtn');

// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("sh-tl-modal-close")[0];
var span = $(".sh-tl-modal-close");

// When the user clicks on the button, open the modal
btn.on("click", function() {
//  modal.style.display = "block";
  modal.attr("style","display:block;");
});

// When the user clicks on <span> (x), close the modal

span.on("click", function() {
//	  modal.style.display = "none";
	modal.attr("style","display:none;");
  $('#sh_tl_post_write').val('');
  $('#images-div').children().remove();
})
/*
span.onclick = function() {
  modal.style.display = "none";
  $('#sh_tl_post_write').val('');
  $('#images-div').children().remove();
}
*/

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
	  $('#sh_tl_post_write').val('');
	  $('#images-div').children().remove();
  }
}

$(document).on("click", function(e) {
	if (e.target == modal[0]) { // js객체로 만들어서 동등비교
		modal.attr("style","display:none;");
		  $('#sh_tl_post_write').val('');
		  $('#images-div').children().remove();
	}
})

//-----------------타임라인 글 게시 (img 있는 경우 / 없는 경우)------------------------------
//이미지
$('#sh_tl_upload').fileupload({
url: '../../../json/fileupload27/upload',        // 서버에 요청할 URL
dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
autoUpload: true,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
disableImageResize: /Android(?!.*Chrome)|Opera/
      .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
previewMaxWidth: 633,   // 미리보기 이미지 너비
previewMaxHeight: 300,  // 미리보기 이미지 높이 
previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
processalways: function(e, data) {
    console.log('fileuploadprocessalways()...');
    console.log(data.files);
    imgFiles = data.files;
    var imagesDiv = $('#images-div');
    imagesDiv.html("");
    for (var i = 0; i < data.files.length; i++) {
      try {
        if (data.files[i].preview.toDataURL) {
          $("<img>").attr('src', data.files[i].preview.toDataURL()).css('width', '500px').appendTo(imagesDiv);
        }
      } catch (err) {}
    }
  $('#sh-tl-post-btn').attr("disabled", true);
  $('#sh-tl-post-btn').html("업로드 중...");
//  data.submit();
}, 
submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
  console.log('submit()...');
}, 
done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
  console.log('done()...');
  $('#sh_tl_post_photo').val(data.result.filename);
  $('#sh-tl-post-btn').attr("disabled", false);
  $('#sh-tl-post-btn').html("게시");
  imgName = data.result.filename
  //location.href = "timeline.html"
}
});


// 게시 버튼 눌렀을 때 함수 - 이름있는 함수로

var imgName;

function postBtnClicked(picData) {
	$.ajax({
		type: 'POST',
		url: '../../../json/timeline/add',
	    data: {
	      picture: imgName,
	      content: $('#sh_tl_post_write').val(),
	      "progMemb.no" : objPmemb[0].no,
	      "progMemb.users.userNo" : obj.userNo
	    }
	}).done(function() { 
		modal.attr("style","display:none;");
		  $('#sh_tl_post_write').val('');
		  $('#images-div').children().remove();
		  reloadCard(1)
			})
};
//-----------------타임라인 글 게시 (img 있는 경우 / 없는 경우)------------------------------

var d = 1;

// 글 올린 것만 카드 끼우기!
function reloadCard(pageCount) {
	var trTemplateSrc = $("#tr-template").html();
	var templateFn = Handlebars.compile(trTemplateSrc);

	$.getJSON(serverRoot + "/json/timeline/list/" + pageCount + "/1", (data) => {
		$('#sh_tl_card_add').prepend(templateFn({list: data}));
	}).done(function(data) {
		var i;
		for (i = 0; i < data.length; i++) {
			loadComments(data[i].no)
			timelineLikeCount(data[i].no)
			if (data[i].picture) {
				$("#img" + data[i].no).append("<img src='../../../files/" + data[i].picture + "_600x600.jpg'>");
			}
		}
	});
}


// 댓글 달기
var cmtNo;
function cmtFunction(no) {
  cmtNo = no;
  $.ajax({
    type: 'POST',
    url: '../../../json/comment/add',
    data: {
      content: $('#' + no).val(),
      timelineNo: no,
      "progMemb.no" : objPmemb[0].no,
      "progMemb.users.userNo" : obj.userNo
    }
  }).done(function() {
    loadComments(cmtNo);
    $('.sh-tl-cmt' + cmtNo).val('');
    $('.sh-tl-cmt' + cmtNo).attr("style","");
//    location.href = "timeline.html";
  });

}

/* 좋아요 카운트 */
function TlAddClick(postNo) {
	// 포스트 넘버를 일단 받아와야함.
	$.ajax({
		type: "POST",
		url: "../../../json/timeline/timelineLike",
		data: {
			pno: objPmemb[0].no,
			pono: postNo,
			uno: obj.userNo
		}
		
		// 성공시 좋아요 갯수 불러오기
	}).done(function (result) {
			$.get(serverRoot + "/json/timeline/timelineLikeCount/" + postNo, (data) => {
				
				if (result == 0) {
				$('.lk' + postNo).html(data).attr("style", "color:#000;");
				$('.lk-thumbs' + postNo).attr("style", "color:000;")
				$('.lk-clicked' + postNo).attr("style", "color:#000;");
				} else {
					$('.lk' + postNo).html("회원님 외 " + data).attr("style", "color:#DD1F26;");
					$('.lk-thumbs' + postNo).attr("style", "color:#DD1F26;");
					$('.lk-clicked' + postNo).attr("style", "color:#DD1F26;");
				}
			});
		})
}

// 댓글 mouseover 이벤트 - 수정, 삭제
function showCmtMenu(e) {
	$(e).children('.sh-tl-cmt-edit').attr("style","display:inline-block;");
	$(e).children('.sh-tl-cmt-delete').attr("style","display:inline-block;");
}

function hideCmtMenu(e) {
	$(e).children('.sh-tl-cmt-edit').attr("style","display:none;");
	$(e).children('.sh-tl-cmt-delete').attr("style","display:none;");
}

function cmtEdit(e) {
	$(e).parent().attr("onmouseover","");
	$(e).parent().attr("onmouseout","");
	
	$(e).one().siblings('.sh-tl-cmt-delete').attr("style","display:none;");
	$(e).one().attr("style","display:none;");
	
	$(e).parent().append('<textarea class="sh-tl-cmt' +$(e).attr("name") + ' sh-tl-review-title  sh_tl_reply_textarea" onkeydown="resize(this)" onkeyup="resize(this)">' + $(e).siblings('.sh-tl-review-content').children().last().html() + '</textarea><button onclick=cmtEditClick('+ $(e).attr("name") + ') class="sh-tl-cmt-edit-btn" type="submit">수정</button>');
	$(e).siblings('.sh-tl-review-content').remove();
	
}

var cmtEditNo;
function cmtEditClick(no) {
	cmtEditNo = no;
	$.post({
		url: "../../../json/comment/update",
		data: {
			no: no,
			content: $('.sh-tl-cmt' + no).val()
		} 
	}).done(function() {
		$.getJSON(serverRoot + "/json/comment/" + cmtEditNo).done(function(data) {
			$('.sh-tl-cmt' + cmtEditNo).parent().first().prepend(' <div readonly class="sh-tl-review-content  sh-tl-reply-content"><span class="sh-cmt-name" >' + data.progMemb.users.name + '</span><span>' + data.content + '</span></div>');
			$('.sh-tl-cmt' + cmtEditNo).parent().attr("onmouseover","showCmtMenu(this)");
			$('.sh-tl-cmt' + cmtEditNo).parent().attr("onmouseout","hideCmtMenu(this)");
			
			
			$('.sh-tl-cmt-edit-btn').remove();
			$('.sh-tl-cmt' + cmtEditNo).remove();
		})
	});
}

var cmtNo;
function cmtDelete(e) {
	console.log("cmtDelete 이벤트 발생! 번호 : " + $(e).attr("name") )
	cmtNo = $(e).attr("name");
	$.post({
		url: serverRoot + "/json/comment/delete",
		data: {
			no: $(e).attr("name")
		}
	}).done(function() {
		$('.sh-tl-cmt-section' + cmtNo).remove();
	})
}



//카드 mouseover 이벤트 - 수정, 삭제
function showPostMenu(e) {
	$(e).children('.sh-tl-post-edit').attr("style","display:inline-block;");
	$(e).children('.sh-tl-post-delete').attr("style","display:inline-block;");
}

function hidePostMenu(e) {
	$(e).children('.sh-tl-post-edit').attr("style","display:none;");
	$(e).children('.sh-tl-post-delete').attr("style","display:none;");
}




function postEdit(e) {
	console.log("postEdit 이벤트 발생")
	console.log($(e).attr("name"));
	console.log($('.sh-tl-card-modal' + $(e).attr("name")))
	
	console.log("글내용은 : " + $('.sh-tl-card-modal' + $(e).attr("name")).children('.sh-tl-card-content').text());
	console.log("글사진은 : " + $('.sh-tl-card-modal' + $(e).attr("name")).children('#img' + $(e).attr("name")).children().attr("src"));
	var content = $('.sh-tl-card-modal' + $(e).attr("name")).children('.sh-tl-card-content-inside').text();
	var picPath =$('.sh-tl-card-modal' + $(e).attr("name")).children('#img' + $(e).attr("name")).children().attr("src"); 
//	console.log(modal)
//	console.log($('#sh_tl_post_write').removeAttr("placeholder").val(content));
//	console.log(modal.children('#sh_tl_post_write').html(content).attr("placeholder","none"));
	
	console.log($('#sh_tl_post_write'))
	$('#sh_tl_post_write').val(content); // 글 끌어오기
	
	if (picPath != null) {
		$('#images-div').html("<img src=" + picPath + ">");
	}
	
	modal.attr("style", "display:block;");
	
	
	
	
	
//	var modal = $('.sh-tl-card-modal' + $(e).attr("name")).clone();
	
	/*
	// post Modal event
var modal = document.getElementById('sh-tl-myModal');

//Get the button that opens the modal
var btn = document.getElementById("sh-tl-myModalBtn");

//Get the <span> element that closes the modal
var span = document.getElementsByClassName("sh-tl-modal-close")[0];

//When the user clicks on the button, open the modal
btn.onclick = function() {
modal.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
 modal.style.display = "none";
}
}
*/
	
//	$(e).parent().attr("onmouseover","");
//	$(e).parent().attr("onmouseout","");
	
//	$(e).one().siblings('.sh-tl-post-delete').attr("style","display:none;");
//	$(e).one().attr("style","display:none;");
	
	
	//$(e).parent().append('<textarea class="sh-tl-cmt' +$(e).attr("name") + ' sh-tl-review-title  sh_tl_reply_textarea" onkeydown="resize(this)" onkeyup="resize(this)">' + $(e).siblings('.sh-tl-review-content').children().last().html() + '</textarea><button onclick=cmtEditClick('+ $(e).attr("name") + ') class="sh-tl-cmt-edit-btn" type="submit">수정</button>');
//	$(e).siblings('.sh-tl-review-content').remove();
	
}

var postEditNo;
function postEditClick(no) {
	cmtEditNo = no;
	$.post({
		url: "../../../json/comment/update",
		data: {
			no: no,
			content: $('.sh-tl-cmt' + no).val()
		} 
	}).done(function() {
		$.getJSON(serverRoot + "/json/comment/" + cmtEditNo).done(function(data) {
			$('.sh-tl-cmt' + cmtEditNo).parent().first().prepend(' <div readonly class="sh-tl-review-content  sh-tl-reply-content"><span class="sh-cmt-name" >' + data.progMemb.users.name + '</span><span>' + data.content + '</span></div>');
			$('.sh-tl-cmt' + cmtEditNo).parent().attr("onmouseover","showCmtMenu(this)");
			$('.sh-tl-cmt' + cmtEditNo).parent().attr("onmouseout","hideCmtMenu(this)");
			
			
			$('.sh-tl-cmt-edit-btn').remove();
			$('.sh-tl-cmt' + cmtEditNo).remove();
		})
	});
}

var postNo;
function cmtDelete(e) {
	console.log("cmtDelete 이벤트 발생! 번호 : " + $(e).attr("name") )
	cmtNo = $(e).attr("name");
	$.post({
		url: serverRoot + "/json/comment/delete",
		data: {
			no: $(e).attr("name")
		}
	}).done(function() {
		$('.sh-tl-cmt-section' + cmtNo).remove();
	})
}

