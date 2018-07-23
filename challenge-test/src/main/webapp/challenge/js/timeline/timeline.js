// 로그인 한 사람만 쓸 수 있는 페이지에 넣어줄 function.header에 이 function 저장되어있음
loadLoginUser();

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


/* 슬라이드 더보기 */
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("sh-mySlides");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
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

/* 좋아요 카운트 */
var Clicks = 0;

function TlAddClick() {
  Clicks = Clicks + 1;
  document.getElementById('sh-tl-CountedClicks').innerHTML = '회원님 외' + Clicks + ' 명이 좋아합니다.';
}


/* 무한 스크롤 */
//무한 스크롤 부분
$(document).ready(function() {
  // 스크롤 이벤트 발생시
  $(window).scroll(function() {
    // 필요한 변수 구하기
    var scrollHeight = $(window).scrollTop() + $(window).height();
    var documentHeight = $(document).height();
    //		console.log(scrollHeight);
    //		console.log(documentHeight);



    // 스크롤한 높이와 문서의 높이가 같을 때
    if (scrollHeight == documentHeight) {
      for (var i = 0; i < 5; i++) {
        $(' <div class="sh-tl-card sh-card" style="border: 2px solid blue;"><section class="sh-tl-card-primary"><div class="sh-tl-user"><i class="sh-tl-user-circle fas fa-user-circle"></i><h1 class="sh-tl-user-name">무한스크롤</h1></div></section><div class="sh-tl-card-content"><p>졸려죽겠네? 아니야 할 수 있다! 북극곰 짱</p></div><section class="sh-tl-card-actions"><div class="sh-tl-like-count"><a href="#!"><i class="far fa-thumbs-up"></i></a><a id="sh-tl-CountedClicks" href="#!">0 명이 좋아합니다.</a><a href="#!"></a></div><div class="sh-tl-card-bottom"><div class="sh-tl-like sh-tl-card-bottom-items" style="border: 1px solid black;"><a onclick="TlAddClick()" href="#!"><i class="far fa-thumbs-up"></i>좋아요</a></div><div class="sh-tl-comment sh-tl-card-bottom-items" style="border: 1px solid black;"><a href="#!"><i class="far fa-comments"></i>댓글달기</a></div></div></section><section class="sh-tl-card-reply"><div class="sh-tl-reply-user"><i class="sh-tl-reply-user-circle fas fa-user-circle"></i><h1 class="sh-tl-reply-write">댓글을 입력하세요</h1></div></section><div style="clear:both;"></div></div>').appendTo('.sh-infinite-scroll');
      }
    }
  });
});

/* modal event */
// Get the modal
var modal = document.getElementById('sh-tl-myModal');

// Get the button that opens the modal
var btn = document.getElementById("sh-tl-myModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("sh-tl-modal-close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// 타임라인 글 게시
$("#sh-tl-post-btn").click(() => {

  $.ajax({
    type: 'POST',
    url: '../../../json/timeline/add',
    data: {
      picture: $('#sh_tl_upload').val(),
      content: $('#sh_tl_post_write').val()
    },
  }).done(function() {
    console.log("입력됨.");
    location.href = "timeline.html"
  });
});


// 댓글 달기
function cmtFunction(no) {
  console.log("댓글 버튼 눌렸습니다.")
  console.log(no); // 카드 번호 가져오기
  console.log($('#' + no).val());
  
  $.ajax({
    type: 'POST',
    url: '../../../json/comment/add',
    data: {
      content: $('#' + no).val(),
      timelineNo: no
    }
  }).done(function() {
    console.log("댓글 입력됨");
    location.href = "timeline.html"
  });

}
