$('#priceSearch').click(() => {
	$.ajax({
		dataType : 'json',
		type: 'POST',
		async: false,
		traditional : true,
		url: serverRoot + '/json/program/pList',
		data: {
			minPrice : $('#from_id').val(),
			maxPrice : $('#to_id').val()
		}
	}).done(function(data){
		
		
		
		var totalPage = data.length;
		var onePage = Math.ceil(totalPage / 9) ;
		console.log(totalPage);
		$.ajax({
			dataType : 'json',
			type: 'POST',
			async: false,
			traditional : true,
			url: serverRoot + '/json/program/pList/1/9',
			data: {
				minPrice : $('#from_id').val(),
				maxPrice : $('#to_id').val()
			}
		}).done(function(data){
			$("#paging").empty();
			var pageCount = 1 ;
			
			for(var i = 0; i < data.length; i++) {
				$('#aaa').html(cardBodyFn({list:data}));
			}
			
			for(pageCount = 1; pageCount < onePage+1; pageCount++){
				$('#paging').append('<a data-no="'+pageCount+'" class="sm-pagination-button" href="#">'+pageCount+'</a>')
				
			}
			
			loadCards(data);
			
		})
		
		$('.sm-pagination-button').click( function(){
		    if ( $(this).hasClass('pageActive') ) {
		        $(this).removeClass('pageActive');
		    } else {
		        $('.sm-pagination-button').removeClass('pageActive');
		        $(this).addClass('pageActive');    
		    }
		    var pageNum = $('.pageActive').attr("data-no");
		    $.ajax({
				dataType : 'json',
				type: 'POST',
				async: false,
				traditional : true,
				url: serverRoot + '/json/program/pList/'+pageNum+'/9',
				data: {
					minPrice : $('#from_id').val(),
					maxPrice : $('#to_id').val()
				}
			}).done(function(data){
				for(var i = 0; i < data.length; i++) {
				$('#aaa').html(cardBodyFn({list:data}));
			}
				loadCards(data);
			})
		});
		
	})  // pList done

});




/*
$('#priceSearch').click(() => {
	$.ajax({
		dataType : 'json',
		type: 'POST',
		async: false,
		traditional : true,
		url: serverRoot + '/json/program/pList',
		data: {
			minPrice : $('#from_id').val(),
			maxPrice : $('#to_id').val()
		}
	}).done(function(data){
		var totalPage = data.length;
		var onePage = Math.ceil(totalPage / 9) ;
		console.log(totalPage);
		$.ajax({
			dataType : 'json',
			type: 'POST',
			async: false,
			traditional : true,
			url: serverRoot + '/json/program/pList/1/9',
			data: {
				minPrice : $('#from_id').val(),
				maxPrice : $('#to_id').val()
			}
		}).done(function(data){
			$("#paging").empty();
			var pageCount = 1 ;
			
			for(var i = 0; i < data.length; i++) {
				$('#aaa').html(cardBodyFn({list:data}));
			}
			
			for(pageCount = 1; pageCount < onePage+1; pageCount++){
				$('#paging').append('<a data-no="'+pageCount+'" class="sm-pagination-button" href="#">'+pageCount+'</a>')
				
			}
			
			loadCards(data);
			
		})
		
		$('.sm-pagination-button').click( function(){
		    if ( $(this).hasClass('pageActive') ) {
		        $(this).removeClass('pageActive');
		    } else {
		        $('.sm-pagination-button').removeClass('pageActive');
		        $(this).addClass('pageActive');    
		    }
		    var pageNum = $('.pageActive').attr("data-no");
		    $.ajax({
				dataType : 'json',
				type: 'POST',
				async: false,
				traditional : true,
				url: serverRoot + '/json/program/pList/'+pageNum+'/9',
				data: {
					minPrice : $('#from_id').val(),
					maxPrice : $('#to_id').val()
				}
			}).done(function(data){
				for(var i = 0; i < data.length; i++) {
				$('#aaa').html(cardBodyFn({list:data}));
			}
				loadCards(data);
			})
		});
		
	})  // pList done

});

*/