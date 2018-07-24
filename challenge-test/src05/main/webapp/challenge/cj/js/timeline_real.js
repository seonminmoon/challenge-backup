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
    divText.innerHTML = "더보기";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    divText.innerHTML = "닫기";
    moreText.style.display = "inline";
  }
}

/* 타임라인 글 작성 textarea auto-growing / self-resizing */
