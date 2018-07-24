$(".uploadpreview input[type=file]").change(function () {
    var files = this.files;
    var reader = new FileReader();
    name = this.value;
    reader.onload = function (e) {
		console.log(e);
        $(".uploadpreview img").attr('src',e.target.result);
		localStorage.setItem('img',e.target.result);
    };
    reader.readAsDataURL(files[0]);
});

$('.uploadpreview img').click(function() {
	$(".uploadpreview input[type=file]").click();
});

$('.uploadpreview figcaption').keydown(function(e) {
	if(e.keyCode == 13) {
		localStorage.setItem('img-desc',$(this).html());
		e.preventDefault();
	}
});

