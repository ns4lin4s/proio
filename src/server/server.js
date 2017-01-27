
'use strict'

const Path = require('path')

const Hapi = require('hapi')

const port = process.env.PORT || 8080

const server = new Hapi.Server()

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

