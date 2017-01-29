var xhr = require('xhr')
var Webrtc2images = require('webrtc2images')
var rtc2images = new Webrtc2images({
      width: 320,
      height: 320,
      frames: 60,
      type: 'image/webp',
      quality: 1,
      interval: 200

});

rtc2images.startVideo(function (err) {
    if (err) {
            console.log(err);

    }
})

var button = document.getElementById('record')
button.onclick = function(){
    rtc2images.recordVideo(function(err, frames){
        xhr({
            uri:'/process',
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({images : frames})
        },function(err, response, body){
            if(err)
                console.log('Ha ocurrido un error')
            console.log(JSON.parse(body))
        })
    })
}
