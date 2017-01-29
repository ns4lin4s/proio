'use strict'

const Path = require('path')
const Hapi = require('hapi')
const port = process.env.PORT || 8080
const server = new Hapi.Server()
const helper = require('./helper')

server.connection({

	host: 'localhost',
	port: 8080
})

server.register(require('inert'),(err) => {

    if(err){
        throw err
    }

    server.route({
        method: 'GET',
        path: '/{file*}',
        handler: {
            directory:{
                path: '../../public/',
                listing: true
            }
        }
    })

    server.start(function(err){

        if (err) {
           throw err;
         }

        console.log('Server running at:', server.info.uri);
    })
})

server.route({
    method:'POST',
    path: '/process',
    config: {
        payload:{
            maxBytes: 3145720000000
        }
    },
    handler: function(req, reply){

        if(!Array.isArray(req.payload.images))
            reply({error: 'No es un tipo válido'}).code(500)

        let converter = helper.convertVideo(req.payload.images)

        converter.on('video',function(video){
            reply({ video : video }).code(200)
        })
    }
})
