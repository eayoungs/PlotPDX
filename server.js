// Init Hapi
var Hapi = require('hapi')

// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 8080
});

// Add the route
server.route({
  method: 'GET',
  path:'/{params*}',
  handler: {
    directory: {
      path: 'www',
      index: true
    }
  }
});

// Start the server
server.start();
