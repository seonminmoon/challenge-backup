if (location.href.split("?").length > 1) {
	var no = location.href.split("?")[1].split("=")[1];
	/*$.ajax({
		   type: 'GET',
		   url: serverRoot + '/json/programMember/lList/' + no,
		   async : true,
		   success: function(data) {
          var html ='';
          $.each(data, function(Index, entry) {
        	 html += '<li>';
              html += '<div class="sm-time-div">';
              html += '<span id="aaaa" class="sm-time">' + entry.startDate + '</span>';
              html += '<p class="sm-time-p">' + entry.name + '를 시작했습니다.' + '</p>';
              html += '</div>';
              html += '</li>';

              html += '<li>';
              html += '<div class="sm-time-div">';
              html += '<span id="aaaa" class="sm-time">' + entry.endDate + '</span>';
              html += '<p class="sm-time-p">' + entry.name + '를 마쳤습니다.' + '</p>';
              html += '</div>';
              html += '</li>';
          });
          console.log(data);
          $('#ul1234').append(html);
        }
        return false;
    });*/
	/*$.getJSON(serverRoot + '/json/programMember/lList/' +  userInfo, function(data) {*/
		$.ajax({
			type: 'GET',
			url: serverRoot + '/json/programMember/lList/' + no,
			async : true,
			success: function(data) {
				var html ='';
				$.each(data, function(Index, entry) {
					/*html += '<li>';
					html += '<div class="sm-time-div">';
					html += '<span id="aaaa" class="sm-time">' + entry.paymentDay  + '</span>';
					html += '<p class="sm-time-p">' + entry.program.name + '를 마쳤습니다.' + '</p>';
					html += '</div>';
					html += '</li>';*/
					
					html += '<li>';
					html += '<div class="sm-time-div">';
					html += '<span id="aaaa" class="sm-time">' + entry.program.startDate + '</span>';
					html += '<p class="sm-time-p">' + entry.program.name + '를 시작했습니다.' + '</p>';
					html += '</div>';
					html += '</li>';

					html += '<li>';
					html += '<div class="sm-time-div">';
					html += '<span id="aaaa" class="sm-time">' + entry.program.endDate + '</span>';
					html += '<p class="sm-time-p">' + entry.program.name + '를 마쳤습니다.' + '</p>';
					html += '</div>';
					html += '</li>';
					
				});
				console.log(data);
				$('#ul1234').append(html);
				return false;
			}
		});
		}
		/*}*/
//		});