/**
 *
 */ //위에서 준비한 템플릿 데이터를 가지고 HTML을 생성할 템플릿 엔진 준비

$(document).ready(function() {
  var trTemplateSrc = $("#tr-template").html();
  var templateFn = Handlebars.compile(trTemplateSrc);

  $.getJSON(serverRoot + "/json/timeline/list", (data) => {
    $('#sh_tl_card_add').html(templateFn({
      list: data
    }));

  }).done(function() {
	  var tlNos = document.getElementsByClassName("tlNo");
	  console.log(tlNos);
	  console.log(tlNos[0].textContent)
	  
    var cmTemplateSrc = $("#cm-template").html();
    var cmtemplateFn = Handlebars.compile(cmTemplateSrc);
    $.getJSON(serverRoot + "/json/comment/list", (data) => {
      $('#sh_tl_load_comments').html(cmtemplateFn({
        list: data
      }));
    });
  });
});

//달린 댓글 불러오기
/*
$(document).ready(function(){
var cmTemplateSrc = $("#cm-template").html();
var cmtemplateFn = Handlebars.compile(cmTemplateSrc);
$.getJSON(serverRoot + "/json/comment/list", (data) => {
	$('#sh_tl_load_comments').html(cmtemplateFn({list:data}));
});
});
*/
