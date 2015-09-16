/*eslint-disable*/

var FalcorServer = require('falcor-hapi');
var Router = require('falcor-router');

module.exports = [

    {
        method: ['GET', 'POST'],
        path: '/model.json',
        handler: FalcorServer.dataSourceRoute(function(req, res) {
          return new Router([
            {
              // match a request for the key "greeting"    
              route: "greeting",
              // respond with a PathValue with the value of "Hello World."
              get: function() {
                return {path:["greeting"], value: "Hello World"};
              }
            }
          ]);
        })
    },

];