
//채널 생성하기 (Caller)

var createChannelButton = document.querySelector('#createChannel');
var createChannelIdInput = document.querySelector('#createChannelId');
var appCaller;

appCaller = new PlayRTC({
  projectKey: '60ba608a-e228-4530-8711-fa38004719c1',
  localMediaTarget: 'callerLocalVideo',
  remoteMediaTarget: 'callerRemoteVideo'
}); 

appCaller.on('connectChannel', function(channelId) {
  createChannelIdInput.value = channelId;
});

createChannelButton.addEventListener('click', function(event) {
  event.preventDefault();
  appCaller.createChannel();
	var $msg = $('<p>온라인 수업을 시작했습니다!</p>');
	$('#createMsg').append($msg);
}, false);


//채널 참여하기 (Callee)
 
 var connectChannelIdInput = document.querySelector('#connectChannelId');
 var connectChannelButton = document.querySelector('#connectChannel');
 var appCallee;

 appCallee = new PlayRTC({
   projectKey: '60ba608a-e228-4530-8711-fa38004719c1',
   localMediaTarget: 'calleeLocalVideo',
   remoteMediaTarget: 'calleeRemoteVideo'
 });

 connectChannelButton.addEventListener('click', function(event) {
	 $('#createMsg').remove();
   var channelId = connectChannelIdInput.value;

   event.preventDefault();
   if (!channelId) {
	   appCaller.getChannelList(function(result){
	       appCallee.connectChannel(result.channels[0].channelId);
	   }, function(err){
	       swal({
	           type: 'error',
	           title: '진행중인 수업이 없습니다.',
	           confirmButtonColor: '#1B3453',
	           confirmButtonText: '확인'
	         })
	   });
   } else {
	   appCallee.connectChannel(channelId);
   }
 }, false);