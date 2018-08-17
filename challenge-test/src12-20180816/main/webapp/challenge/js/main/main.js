(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".sm-timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();

// 챌린지 카드
var trTemplateSrc = $("#tr-template").html();
var templateFn = Handlebars.compile(trTemplateSrc);
$.getJSON(serverRoot + "/json/challenge/list", (data) => {
    $("#new-challenge").html(templateFn({list:data}));
});



var prTemplateSrc = $("#pr-template").html();
var prtemplateFn = Handlebars.compile(prTemplateSrc);
$.getJSON(serverRoot + "/json/program/mainList", (data) => {
    $("#program-list").html(prtemplateFn({list:data}));
});

$(document).ready(function() {
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop : $(hash).offset().top
            }, 900, function() {

                window.location.hash = hash;
            });
        } // End if
    });

    $(window).scroll(function() {
        $(".slideanim").each(function() {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
})
