(function() {
  var current = 0;
  var max = 0;
  var cont;
  var interval;

  function init() {
    cont = jQuery(".slide ul");
    max = cont.children().length;

    events();
    interval = setInterval(next, 3000);
  }
  function events() {
    jQuery("button.prev").on("click", prev);
    jQuery("button.next").on("click", next);

    jQuery(window).on("keydown", keydown);
  }
  function prev(e) {
    current--;
    if (current < 0) current = max - 1;
    animate();
  }
  function next(e) {
    current++;
    if (current > max - 1) current = 0;
    animate();
  }
  function animate() {
    var moveX = current * 600;
    TweenMax.to(cont, 0.8, {marginLeft: -moveX, ease: Expo.easeOut});

    clearInterval(interval);
    interval = setInterval(next, 3000);
  }
  function keydown(e) {
    if (e.which == 39) {
      next();
    } else if (e.which == 37) {
      prev();
    }
  }
  jQuery(document).ready(init);
})();




<!-- DC Flickr Slider Start -->
<div id="dc_jflickr_slider_container">
  <ul id="dc_flickr_slider"></ul>
  <div class="flickr_slider_nav"><a id="flickr_slider_prev" href="#"><<</a> <a id="flickr_slider_next" href="#">>></a></div>
</div>
<!-- DC Flickr Slider End -->
<div class="dc_clear"></div> <!-- line break/clear line -->

<!-- DC Flickr Slider Settings -->
<script type="text/javascript">
	$('#dc_flickr_slider').jflickrfeed({
		limit: 14, // number of images to show
		qstrings: {
			id: '13547802@N05' // id of flickr gallery (use idgettr.com to get flickr gallery id)
		},
		// Small images: {{image_s}}
		// Medium images: {{image}}
		// Large images: {{image_b}}
		itemTemplate: '<li><a href="{{image_b}}" title="{{title}}" target="_blank"><img src="{{image}}" title="{{title}}" /><div>{{title}}</div></a></li>'
	}, function(data) {
		$('#dc_flickr_slider div').hide();
		$('#dc_flickr_slider').cycle({
			timeout: 3000, // ms before next slide  (3000 = 3 seconds)
	  		   fx: 'scrollHorz', // scrollHorz, scrollVert, fade, shuffle, turnDown, zoom, wipe, fadeZoom, toss, uncover, curtainX, curtainY
  	  	 prev: '#flickr_slider_prev',
    		 next: '#flickr_slider_next'
		});
		$('#dc_flickr_slider li').hover(function(){
			$(this).children('div').show();
		},function(){
			$(this).children('div').hide();
		});
	});
</script>
