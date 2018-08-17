//재등록 프로그램 가져오기
var probody = $("#proInsert").html();
var proBodyFn = Handlebars.compile(probody);
$.getJSON(serverRoot + "/json/program/listProgram/"+ userInfo.userNo, (data) => {
  if (data.length != 0) {
    $(reProgram).css('display', 'inline-block');
    $(notPadding).css('padding-top', '15px');
    $(proTab).html(proBodyFn({list:data}));
  }
})

$('#proTab').on('click', function() {
  var reNo = $('#proTab option:selected').val();
  
  

  $.getJSON(serverRoot + "/json/program/" + reNo, function(data) {
    $(sample6_postcode).val(data.postNo),
    $(sample6_address).val(data.address),
    $(sample6_address2).val(data.addDetail),
    $(fname).val(data.name),
    $(fminQty).val(data.minQty),
    $(fmaxQty).val(data.maxQty),
    $(fprice).val(addComma(data.price)),
    $(fdescription).val(data.description),
    $(ftype).val(data.proType),
    $(fprgoal).val(data.proGoal),
    $(fprogoalnum).val(data.proGoalNum),
    $(fth).val(data.proTh + 1),
    $(fptover).val(data.proTurn),
    $(chalTab).val(data.challengeNo)
  }).done(function() {
    $(fname).attr('readonly', true);
  });
});


//금액 콤마
function addComma(num) {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ',');
}
