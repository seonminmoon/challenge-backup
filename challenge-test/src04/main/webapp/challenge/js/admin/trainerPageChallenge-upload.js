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
