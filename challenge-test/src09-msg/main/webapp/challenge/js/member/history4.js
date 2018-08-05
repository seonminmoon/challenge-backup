(function() {
	"use strict";
	var items = document.getElementsByTagName("li");
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
		    	  items[i].classList.add("view");
		      }
		    }
		 }
		/* $("li").addClass(function(index) { 
			return "view"+index; //li를 하나씩 가져오면서 class name을 추가 해준다.
		});*/
	
	/* var len = document.getElementsByTagName("li");
	 document.getElementsByTagName("li").className="view";*/
		  }
	/* li.className ="view";*/
	/* document.getElementByTagNames("li").className ="view";*/
	/*$("li").toggleClass("view");*/ //addClass attr prop
		/*var len = document.getElementsByTagName("li").className="view";
	 for (var i = 0; i < len.length; i++) {
      if (isElementInViewport(len[i])) {
    	  len[i].classList.add("view");*/
	 /* }
    }*/
	/*}*/

  // define variables



  // listen for events
window.addEventListener("load", callbackFunc);
window.addEventListener("resize", callbackFunc);
window.addEventListener("scroll", callbackFunc);

})();
