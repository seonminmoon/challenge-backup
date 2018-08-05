/* 본문 따라다니는 navbar 이벤트*/
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

$('.navLink').click(function() {
  openNav(event)
})

function openNav(evt) {
  var navLinks;
  navLinks = document.getElementsByClassName("navLink");
  for (i = 0; i < navLinks.length; i++) {
    navLinks[i].className = navLinks[i].className.replace(" active", "");
  }
  evt.currentTarget.className += " active";
}



function showCmtMenu(e) {
  var userNoOfComment = $(e).attr("data-userNo");
  if (userNoOfComment == userInfo.userNo) {
    $(e).children('.cmt-edit').css("display", "block");
    $(e).children('.cmt-delete').css("display", "block");
  }
}

function hideCmtMenu(e) {
  var userNoOfComment = $(e).attr("data-userNo");

  if (userNoOfComment == userInfo.userNo) {
    $(e).children('.cmt-edit').css("display", "none");
    $(e).children('.cmt-delete').css("display", "none");
  }
}

function cmtEdit(e) {
  $(e).parent().attr("onmouseover", "");
  $(e).parent().attr("onmouseout", "");

  $(e).one().siblings('.cmt-delete').css("display", "none");
  $(e).one().css("display", "none");

  $(e).parent().append('<textarea class="sh-tl-cmt' 
      + $(e).attr("name") 
      + ' sh-tl-review-title  sh_tl_reply_textarea">' 
      + $(e).siblings('.commentContent').last().html() 
      + '</textarea><button onclick=cmtEditClick(' 
      + $(e).attr("name") 
      + ') class="sh-tl-cmt-edit-btn" type="submit">수정</button>');
  $(e).siblings('.commentContent').remove();

}

var cmtEditNo;

function cmtEditClick(no) {
  cmtEditNo = no;
  $.post({
    url: "../../../json/programMember/updateReview",
    data: {
      no: no,
      content: $('.sh-tl-cmt' + no).val()
    }
  }).done(function() {
    $.getJSON(serverRoot + "/json/comment/" + cmtEditNo).done(function(data) {
      $('.sh-tl-cmt' + cmtEditNo)
      .parent().first()
      .prepend(' <div readonly class="sh-tl-review-content  sh-tl-reply-content"><span class="sh-cmt-name" >' 
          + data.progMemb.user.name 
          + '</span><span>' + data.content + '</span></div>');
      $('.sh-tl-cmt' + cmtEditNo).parent().attr("onmouseover", "showCmtMenu(this)");
      $('.sh-tl-cmt' + cmtEditNo).parent().attr("onmouseout", "hideCmtMenu(this)");


      $('.sh-tl-cmt-edit-btn').remove();
      $('.sh-tl-cmt' + cmtEditNo).remove();
    })
  });
}





