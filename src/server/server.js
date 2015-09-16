/**
 * Created by mitel on 01/05/15.
 */
/*eslint-disable*/

var Hapi = require('hapi');
// var Tv = require('tv');
var restRoutes = require('./routes/restRoutes');
var falcorRoutes = require('./routes/falcorRoutes');
var server = new Hapi.Server({
    connections: {
        routes: {
            cors: {
                origin: ['*'],
                credentials: true,
                additionalHeaders: ['X-Requested-With']
            }
            //cors: true
        }
    }
});

// make sure you run docker -p 8000:8000 and (Mac) forward port 8000 to the physical host
server.connection({ port: 8000 });

// cu ws - fastest WS for Node.js
// http://www.jayway.com/2015/04/13/600k-concurrent-websocket-connections-on-aws-using-node-js/
var WSServer = require('ws').Server
  // pass the server.listener (pointer to the low level node/http)
  , wss = new WSServer({ server: server.listener });

wss.on('connection', function connection(ws) {
  console.log((new Date()) + ' WS Connection accepted.');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

// append all defined routes into an array passed to server.route()
var routes = Array.prototype.concat.apply([], [
    restRoutes, falcorRoutes
]);
server.route(routes);

// good is a process monitor that listens for one or more 'event types'.
// All of these events, except 'ops', map to a hapi event
// (https://github.com/hapijs/hapi/blob/master/API.md#server-events)
var goodOptions = {
    opsInterval: 10000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*', request: '*'}
    }, {
        reporter: require('good-file'),
        events: { log: '*', response: '*' },
        config: './log-hapi-server.json'
    }]
};

// TV is a simple web page in which developers can view server logs for their requests.
// Optionally, they can also filter the server logs to just their requests by attaching a
// unique client id to each request. The server will use WebSocket to stream the logs to
// the web application in real-time.
// server.register([Tv, {

server.register([{
    register: require('good'),
    options: goodOptions
}], function (err) {

    /*
     * The if (!module.parent) {…} conditional makes sure that if the script is being
     * required as a module by another script, we don’t start the server. This is done
     * to prevent the server from starting when we’re testing it; with Hapi, we don’t
     * need to have the server listening to test it.
     * */
    if (!err && !module.parent) {
      if (!err) {
          server.start(function () {
              console.log('hapi.js server running at:', server.info.uri);
          });
      }
    }
});

// server.start(function () {
//     console.log('hapi.js server running at:', server.info.uri);
// });

module.exports = server;
