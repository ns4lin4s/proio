var Webrtc2images = require('webrtc2images')
var rtc2images = new Webrtc2images({
      width: 320,
      height: 320,
      frames: 20,
      type: 'image/jpeg',
      quality: 1,
      interval: 100

});

rtc2images.startVideo(function (err) {
    if (err) {
            console.log(err);

    }
})

var button = document.getElementById('record')
button.onclick = function(){
    rtc2images.recordVideo(function(err, frames){
        console.log(frames)
    })
}
