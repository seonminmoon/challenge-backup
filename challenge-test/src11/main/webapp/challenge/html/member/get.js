(function() {
	"use strict"
        $.get('http://localhost:8888/challenge-project/json/program/list', 
        		{async:false}, function(data) {
          var html ='';
          $.each(data, function(Index, entry) {
        	 html += '<li class="view">';
              html += '<div class="sm-time-div">';
              html += '<span id="aaaa" class="sm-time">' + entry.startDate + '</span>';
              html += '<p class="sm-time-p">' + entry.name + '를 시작했습니다.' + '</p>';
              html += '</div>';
              html += '</li>';
              
              html += '<li class="view">';
              html += '<div class="sm-time-div">';
              html += '<span id="aaaa" class="sm-time">' + entry.endDate + '</span>';
              html += '<p class="sm-time-p">' + entry.name + '를 종료했습니다.' + '</p>';
              html += '</div>';
              html += '</li>';
          });
          console.log(data);
          $('#ul1234').append(html);
        });
        return false;
    })();