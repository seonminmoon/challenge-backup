
"use strict"

/*
var imgBox = $('#imgBox');

$('#fileupload').fileupload({
	url: '../../../json/fileupload/upload',
    dataType: 'json',
    done: function (e, data) { 
      console.log('done()...');
      console.log(data.result); // 서버가 보낸 JSON 객체는 data.result 에 보관되어 있다.
      
      $('<img>').attr('src', '../../../files/' + data.result.filename + '_200x200.jpg')
      .appendTo(imgBox);
    }
});
*/

$('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) { 
      console.log('done()...');
      console.log(data.result);
      
      $('#photoImg').attr("src", "../../../files/" + data.result.filename + '_200x200.jpg');
      
    }
});
