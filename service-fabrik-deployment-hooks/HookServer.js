'use strict';

console.log('Starting Service Fabrik Deployment Hook App...');
// const lib = require('./lib');
const routes = require('./lib/routes');
const HttpServer = require('./HttpServer');
const FabrikApp = require('./FabrikApp');

const hook = FabrikApp.create('hook', app => {
  app.get('/', (req, res) => {
    res.render('index', {
      title: app.get('title')
    });
  });
  app.use('/hook', routes.hook);
});

HttpServer.start(hook);
HttpServer.handleShutdown();

//https://github.com/nodejs/node-v0.x-archive/issues/5054