'use strict';

console.log('Starting Service Fabrik Deployment Hook App...');
const HttpServer = require('../common/HttpServer');
const FabrikApp = require('../common/app');
const routes = require('./lib/routes');

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