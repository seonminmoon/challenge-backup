/*(function() {
	"use strict"
        $.getJSON('http://localhost:8888/challenge-project/json/program/list', function(data) {
          var html ='';
          $.each(data, function(Index, entry) {
        	 html += '<li class="in-view">';
              html += '<div class="sm-time-div">';
              html += '<span id="aaaa" class="sm-time">' + entry.startDate + '</span>';
              html += '<p class="sm-time-p">' + entry.name + '를 시작했습니다.' + '</p>';
              html += '</div>';
              html += '</li>';
              
              html += '<li class="in-view">';
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
    })();*/
"use strict"
// 웹페이지를 만들 때 AJAX를 이용하여 여러 조각을 붙여서 만들 수 있다.
//
var ul = document.querySelector("#ul1234");
(function() { // 서버에서 테이블에 출력할 데이터를 가져오기
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
         if (xhr.readyState == 4) {
            if (xhr.status == 200) { 
                // 서버에서 받은 JSON 문자열을 자바스크립트 객체로 변환한다.*/
                var list = JSON.parse(xhr.responseText); 
                
                // 배열을 반복하여 값을 꺼낸다.
                for (var b of list) {
                    // tr 태그를 만든다.
                    var li = document.createElement("li");
                    var li2 = document.createElement("li");
                    /*li.className = "view";
                    li2.className = "view";*/
                    /*var liText = document.createTextNode('view');*/
                    
                    // tr 태그에 게시물 데이터를 넣는다.
                    li.innerHTML ="<div class='sm-time-div'>" +
                	   "<span class='sm-time'>" + b.startDate + "</span>" +
                	   "<p class='sm-time-p'>" + b.name +"</p>" +
                	   "</div>";
                    
                    li2.innerHTML ="<div class='sm-time-div'>" +
             	   "<span class='sm-time'>" + b.endDate + "</span>" +
             	   "<p class='sm-time-p'>" + b.name+ '을 마쳤습니다.' + "</p>" +
             	   "</div>";
                    
                    // tr 태그를 tbody의 자식 태그로 붙인다.
                   /* ul.appendChild(liText);*/
                    ul.appendChild(li);
                    ul.appendChild(li2);
                }
            }
     }
   };
    xhr.open("GET",  serverRoot + "/json/programMember/lList/", true);
    xhr.send();
 })();