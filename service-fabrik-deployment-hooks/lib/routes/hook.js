'use strict';

const express = require('express');
const config = require('../config');
const middleware = require('../middleware');
const controller = require('../controllers').serviceFabrikDeploymentHook;
const router = module.exports = express.Router();

router.use(middleware.basicAuth(config.username, config.password));
router.use(middleware.csp());
router.route('/')
  .post(controller.handler('getActionResponse'))
  .all(middleware.methodNotAllowed(['POST']));

router.use(middleware.notFound());
router.use(middleware.error({
  defaultFormat: 'json'
}));