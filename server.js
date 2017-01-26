'use strict'

const Hapi = require('hapi')

const port = process.env.PORT || 8080

const server = new Hapi.Server()

server.connection({

	host: 'localhost',
	port: 8080

})

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!')
    }
})

server.start(function(err){

    if (err) {
       throw err;
    }
    console.log('Server running at:', server.info.uri);
})

