 $(function() {
    	  var $node = $('.slider').css({'width': 300, margin: 20});

    	  var $input = $node.find('input');
    	  var min, max;

    	  $input.keyup(_.debounce(function(e) {
    	    $(e.target).change(); 
    	  }, 100));

    	  // update event for case when user need to change the values from R - he call js code that
    	  // will change values and/or data attributes and call node.trigger('update');
    	  $node.on('update', function() {
    	    updateBoundaries();
    	    $slider.slider('option', 'max', max);
    	    $slider.slider('option', 'min', min);
    	    // handle out if range values
    	    if ($input.length == 1) {
    	      var value = +$input.val();
    	      if (value < min) {
    	        $input.val(min);
    	      } else if (value > max) {
    	        $input.val(max);
    	      }
    	    } else {
    	      var $from = $input.eq(0);
    	      var $to = $input.eq(1);
    	      var range = [+$from.val(), +$to.val()];
    	      if (range[0] < min || range[0] > max) {
    	        $from.val(min);
    	      }
    	      if (range[1] < min || range[1] > max) {
    	        $to.val(max);
    	      }
    	    }
    	    // we trigger change on first input because both inputs have the same event and
    	    // it will also work when there is one input
    	    $input.eq(0).change();
    	  });

    	  function updateBoundaries() {
    	    min = +$node.data('min');
    	    max = +$node.data('max');

    	    if (isNaN(min)) {
    	      min = 0;
    	    }
    	    if (isNaN(max)) {
    	      max = 100;
    	    }
    	  }

    	  updateBoundaries();

    	  var $slider;
    	  if ($input.length == 1) {
    	    $input.change(function() {
    	      var value = +$input.val();
    	      $slider.slider('option', 'value', value);
    	      setProps(value);
    	      $node.trigger('change');
    	    });
    	    var value = +$input.val();
    	    $slider = $node.find('.ui').slider({
    	      min: min,
    	      max: max,
    	      step: 1000,
    	      value: value,
    	      slide: function(event, ui) {
    	        $input.val(ui.value);
    	        setProps(ui.value);
    	        $node.trigger('change');
    	      }
    	    });
    	    setProps(value);
    	  } else {
    	    $node.addClass('range');
    	    var $from = $node.find('.from input');
    	    var $to = $node.find('.to input');
    	    var range = [+$from.val(), +$to.val()];
    	    $input.change(function() {
    	      var range = [+$from.val(), +$to.val()];
    	      $slider.slider('option', 'values', range);
    	      setProps(range);
    	      $node.trigger('change');
    	    });

    	    $slider = $node.find('.ui').slider({
    	      min: min,
    	      max: max,
    	      step: 1000,
    	      values: range,
    	      slide: function(event, ui) {
    	        $from.val(ui.values[0]);
    	        $to.val(ui.values[1]);
    	        setProps(ui.values);
    	        $node.trigger('change');
    	      }
    	    });
    	    setProps(range);
    	  }

    	  function percent(value) {
    	    return ((value - min) * 100) / (max - min);
    	  }
    	  function setProps(value) {
    	    if (value instanceof Array) {
    	      var from = Math.min.apply(Math, value);
    	      var to = Math.max.apply(Math, value);
    	      // css variables aka custom properties are used to render background
    	      // between slider handlers
    	      $slider[0].style.setProperty("--from", percent(from));
    	      $slider[0].style.setProperty("--to", percent(to));
    	      var minRange = +$node.data('min-range');
    	      if (isNaN(minRange)) {
    	        $node.toggleClass('error', value[1] <= value[0]);
    	      } else {
    	        $node.toggleClass('error', value[1] - value[0] <= minRange);
    	      }
    	    } else {
    	      $slider[0].style.setProperty("--to", (value / max) * 100);
    	    }
    	  }
    	  updateSlider('foo', {values: [0, 99000], max: 100000})
    	});

    	function updateSlider(id, data) {
    	  var node = $('#' + id);
    	  if (data.max != undefined) {
    	    node.attr('data-max', data.max);
    	  }
    	  if (data.min != undefined) {
    	    node.attr('data-min', data.min);
    	  }
    	  if (data.values != undefined && data.values.length) {
    	    var inputs = node.find('input');
    	    
    	    data.values.forEach(function(value, i) {
    	      inputs.eq(i).val(value);
    	    }); 
    	  }
    	  if (data.boundaryLabels != undefined) {
    	    node.find('.min').text(data.boundaryLabels[0]);
    	    node.find('.max').text(data.boundaryLabels[1]);
    	  } else {
    	    if (data.max != undefined) {
    	      node.find('.max').text(data.max);
    	    }
    	    if (data.min != undefined) {
    	      node.find('.min').text(data.min);
    	    }
    	  }
    	  node.trigger('update');
    	}