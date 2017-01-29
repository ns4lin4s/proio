
'use strict'

const Path = require('path')

const Hapi = require('hapi')

const port = process.env.PORT || 8080

const server = new Hapi.Server()

const jsonBody = require('body/json')

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
            maxBytes: 3145728
        }
    },
    handler: function(req, reply){
        console.dir(req.payload.images)
        reply({ ok: true }).code(200)
        /*jsonBody(req, reply,{},function(err,body){
            if(err)
                throw err

            console.log(body)
            reply({ ok: true }).code(200)
        })*/
    }
})
