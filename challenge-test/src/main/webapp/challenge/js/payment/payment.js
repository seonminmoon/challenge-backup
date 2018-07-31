

	if (location.href.split("?").length > 1) {
		var no = location.href.split("?")[1].split("=")[1];
		$.getJSON(serverRoot + "/json/program/" + no, (data) => {

			
			$('.project-title').append("<b>"+data.name+"</b>");
			function addComma(num) {
				var regexp = /\B(?=(\d{3})+(?!\d))/g;
				return num.toString().replace(regexp, ',');
			}
			var num = data.price;


			$('.p-price').append(addComma(num)+" 원");
			$('.p-trainer').append(data.trainerNo.name);


		}); 

//		------------------------- 수량 증가 ---------------------------//



		var Clicks = 1 ;
		function AddClick() {
			$.getJSON(serverRoot + "/json/program/" + no, (data) => {

				console.log(no);
				console.log(obj.userNo);


				Clicks = Clicks + 1;
				document.getElementById('p-value').innerHTML = Clicks ;

				function addComma(num) {
					var regexp = /\B(?=(\d{3})+(?!\d))/g;
					return num.toString().replace(regexp, ',');
				}
				var num = data.price * document.getElementById('p-value').innerHTML;
//				$('.p-price').html(data.price * document.getElementById('p-value').innerHTML  +' 원');
				$('.p-price').html(addComma(num)  +' 원');

			}); 

		}
		function MinusClick() {

			$.getJSON(serverRoot + "/json/program/" + no, (data) => {

				Clicks = Clicks - 1;
				document.getElementById('p-value').innerHTML = Clicks ;
				function addComma(num) {
					var regexp = /\B(?=(\d{3})+(?!\d))/g;
					return num.toString().replace(regexp, ',');
				}
				var num = data.price * document.getElementById('p-value').innerHTML;
				$('.p-price').html(addComma(num)  +' 원');
//				$('.p-price').html(data.price * document.getElementById('p-value').innerHTML  +' 원');


			}); 


		}

//		--------------------------카카오페이 api--------------------------//

		var userNo = JSON.stringify(obj.userNo);
		var pno = JSON.stringify(4);
		function requestPay() {

			$.getJSON(serverRoot + "/json/program/" + no, (data) => {

				IMP.init("imp63287981"); // "imp00000000" 대신 발급받은 "가맹점 식별코드"를 사용합니다.
				IMP.request_pay({

					pg : 'kakaopay',
					pay_method : 'card',
					merchant_uid : 'merchant_' + new Date().getTime(),
					name : data.name,
					amount : data.price * document.getElementById('p-value').innerHTML ,
					buyer_email : 'iamport@siot.do',
					buyer_name : '구매자이름',
					buyer_tel : '010-1234-5678',
					buyer_addr : '서울특별시 강남구 삼성동',
					buyer_postcode : '123-456',
					kakaoOpenApp : true

				}
				, function(rsp) {
					if ( rsp.success ) {
						jQuery.ajax({
				    		url: "/payments/complete", //cross-domain error가 발생하지 않도록 주의해주세요
				    		type: 'POST',
				    		dataType: 'json',
				    		data: {
					    		imp_uid : rsp.imp_uid
					    		//기타 필요한 데이터가 있으면 추가 전달
				    		}
						}).done(function(data) {

							//[2] 서버에서 REST API로 결제정보확인 및 서비스루틴이 정상적인 경우
							if ( everythings_fine ) {
								  
								



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
			}); 
		}
	}

