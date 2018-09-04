// 전체선택 버튼 구현하기
$('#checkAll').click(function() {
        $('input[name=checkOne]:checkbox').prop('checked', function() {
            return !$(this).prop('checked');
        });
    });
   

//삭제하기 버튼 구현
var chk = document.getElementsByName("checkOne");
var chkArray = new Array();
console.log(chk.length);

$("#msgBtn-del").click(function(){
    if($("input[name=checkOne]:checkbox:checked").length == 0){
    	swal({
    		  type: 'error',
    		  title: '잠깐!',
    		  text: '삭제하실 메세지를 선택해주세요.',
    		  confirmButtonColor: '#1B3453',
    		  confirmButtonText: '확인'
    		})
	  } else{
		  for (var i = 0; i < chk.length; i++) {
	        if (chk[i].checked) {
	            console.log(chk[i].value)
	            chkArray.push(chk[i].value);
	        }
	      }
		
		  swal({
			  title: '정말 삭제하시겠습니까?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#1B3453',
			  cancelButtonColor: '#DD1F26',
			  confirmButtonText: '삭제'
			}).then((result) => {
			  if (result.value) {
			  		for (var i = 0; i <chkArray.length; i++) {
			    		$.ajax({
			    			type: 'POST',
			    			url: serverRoot +'/json/message/delete',
			    			data: {no : chkArray[i]}
			    		});
			  		}
			  			
			  		chkArray = new Array();
			  		chk = "";
			        
				    location.reload(true);
			  } else {
			  		location.reload(true);
			  }
			});

		  	
    }
});