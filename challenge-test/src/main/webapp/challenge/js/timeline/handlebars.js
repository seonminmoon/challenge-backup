//위에서 준비한 템플릿 데이터를 가지고 HTML을 생성할 템플릿 엔진 준비
var addedPostCount = 0;
$(document).ready(function() {
	// 글쓰기 모달에 글쓴이 이름 출력
	$(".tl-user-name-json").html(obj.name);
	
	// 강의이름 출력
	$(".sh-Class-Title").html()
	
	// 스크롤 위치 맨 위로 고정
	$("body").scrollTop(0);
	
	var pageCount = 1; // 타임라인 첫번째 page 카운트임.
	loadCards(pageCount);

	$(window).on('scroll',function () {
		infiniteScroll();
	});
	
	
	function infiniteScroll() {
		var documentHeight = $(document).height();
		var scrollHeight = $(window).scrollTop() + $(window).height();

		// 스크롤한 높이와 문서의 높이가 같을 때
		if (documentHeight <= scrollHeight + 100) { // 스크롤이 바닥에 닿으면?
			pageCount++;
			setTimeout(loadCards(pageCount), 10000); //=====================> 얘가 문제... 불러오는 동안 여러번 요청(불러오는 동안 스크롤 길이가 안맞음)
			console.log("무한스크롤 다음 카드 불러옴! pageCount 값 : " + pageCount);
		}
	}


});


// 타임라인 카드 불러오기
function loadCards(pageCount) {
	var trTemplateSrc = $("#tr-template").html();
	var templateFn = Handlebars.compile(trTemplateSrc);

	$.getJSON(serverRoot + "/json/timeline/list/" + pageCount + "/6", (data) => {
		$('#sh_tl_card_add').append(templateFn({list: data}));
	}).done(function(data) {
		var i;
		for (i = 0; i < data.length; i++) {
			loadComments(data[i].no);
			timelineLikeCount(data[i].no);
			if (data[i].picture) {
				$("#img" + data[i].no).append("<img src='../../../files/" + data[i].picture + "_600x600.jpg'>");
			}
		}
	});
}

// 댓글 JSON 리스트 가져와서 댓글 붙이기(handleBars) 
function loadComments(cardNo) {
//	console.log(cardNo)
	var cmTemplateSrc = $("#cm-template").html();
	var cmtemplateFn = Handlebars.compile(cmTemplateSrc);
	
	$.getJSON(serverRoot + "/json/comment/listWithNo/" + cardNo, (data) => {
		$('.cm' + cardNo).html(cmtemplateFn({
			list: data
		}));
	});
}

// 좋아요 체크 여부
function timelineLikeChecked(cardNo) {
	$.post({
		url: "../../../json/timeline/isChecked",
		data: {
			pno: objPmemb[0].no,
			pono: cardNo,
			uno: obj.userNo
		},
		async: false
	}).done(function(isChecked) {
		if (isChecked) {
			$('.lk-thumbs' + cardNo).attr("style", "color:#DD1F26;")
			$('.lk' + cardNo).prepend("회원님 외 ").attr("style", "color:#DD1F26;");
			$('.lk-clicked' + cardNo).attr("style", "color:#DD1F26;");
		}
	});
}

// 좋아요 개수 카운트
function timelineLikeCount (cardNo) {
	$.get(serverRoot + "/json/timeline/timelineLikeCount/" + cardNo, function(data) {
		$('.lk' + cardNo).html(data);
		timelineLikeChecked(cardNo)
	});
}
