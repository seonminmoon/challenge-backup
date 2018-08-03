
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wlsgh803@gmail.com',
    pass: 'rkwhr8tkfkd!'
  }
});

var mailOptions = {
  from: 'wlsgh803@gamil.com',
  to: 'wlsgh503@naver.com',
  subject: '안녕하세요 CHALLENGE홈페이지입니다 이메일 인증해주세요!',
  /*text: '아래의 링크를 클릭하시면 인증됩니다!',*/
  html: "<p>아래의 링크를 눌러주세요!! &#128522; &#128522;</p>"
	  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});