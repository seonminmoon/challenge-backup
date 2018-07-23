

	var no = 1;
	$.getJSON(serverRoot + "/json/program/" + no, (data) => {



		$('.project-title').append("<b>"+data.name+"</b>");
		$('.p-price').append(data.price+" 원");
		$('.p-trainer').append(data.trainerNo.name);

	}); 

// ------------------------- 수량 증가 ---------------------------//
	var Clicks = 1 ;
	function AddClick() {
		Clicks = Clicks + 1;
		document.getElementById('p-value').innerHTML = Clicks ;
		document.getElementById('test-price').innerHTML = 10000 * Clicks +' 원' ;
		
	}
	function MinusClick() {
		Clicks = Clicks - 1;
		document.getElementById('p-value').innerHTML = Clicks ;
		document.getElementById('test-price').innerHTML = 10000 / Clicks +' 원' ;
		
	}
//	--------------------------카카오페이 api--------------------------//


	function requestPay() {

		IMP.init("imp63287981"); // "imp00000000" 대신 발급받은 "가맹점 식별코드"를 사용합니다.
		IMP.request_pay({

			pg : 'kakaopay',
			pay_method : 'card',
			merchant_uid : 'merchant_' + new Date().getTime(),
			name : '아이템 이름',
			amount : 14000,
			buyer_email : 'iamport@siot.do',
			buyer_name : '구매자이름',
			buyer_tel : '010-1234-5678',
			buyer_addr : '서울특별시 강남구 삼성동',
			buyer_postcode : '123-456',
			kakaoOpenApp : true,
			
		}, function(rsp) {
			if ( rsp.success ) {
				console.log("하이요");
				window.location.replace('http://localhost:8888/challenge-project/challenge/html/main/main.html');
				//[1] 서버단에서 결제정보 조회를 위해 jQuery ajax로 imp_uid 전달하기
				jQuery.ajax({
					url: "/challenge-project/challenge/html/main/main.html", //cross-domain error가 발생하지 않도록 주의해주세요
					type: 'GET',
					dataType: 'json',
					data: {
						imp_uid : rsp.imp_uid
					}
				
				

				
				}).done(function(data) {
					//[2] 서버에서 REST API로 결제정보확인 및 서비스루틴이 정상적인 경우
					if ( everythings_fine ) {
						var msg = '결제가 완료되었습니다.';
						msg += '\n고유ID : ' + rsp.imp_uid;
						msg += '\n상점 거래ID : ' + rsp.merchant_uid;
						msg += '\결제 금액 : ' + rsp.paid_amount;
						msg += '카드 승인번호 : ' + rsp.apply_num;

						alert(msg);
					} else {
						//[3] 아직 제대로 결제가 되지 않았습니다.
						//[4] 결제된 금액이 요청한 금액과 달라 결제를 자동취소처리하였습니다.
					}
				});
			} else {
				var msg = '결제에 실패하였습니다.';
				msg += '에러내용 : ' + rsp.error_msg;

				alert(msg);
			}
		});
	}
	
