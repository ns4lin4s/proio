'use strict'

const EventEmitter = require('events').EventEmitter
const async = require('async')

module.exports = function(images){

    let events = new EventEmitter()

    async.series([decodeImages,createVideo, encodeVideo, cleanup],convertFinished)

    function decodeImages(next){
        next()
    }

    function createVideo(next){
        next()
    }

    function encodeVideo(next){
        next()
    }

    function cleanup(next){
        next()
    }

    function convertFinished(err){
        setTimeout(function(){
            events.emit('video','this will be the encoded video')
        },100)
    }

    return events
}
