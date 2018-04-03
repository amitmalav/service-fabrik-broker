'use strict';

var moment = require('moment-timezone');
const BaseController = require('./BaseController');
const ActionManager = require('../actions/ActionManager');
const errors = require('../errors');
const logger = require('../logger');
const CONST = require('../constants');
const BadRequest = errors.BadRequest;

class serviceFabrikDeploymentHookController extends BaseController {
  constructor() {
    super();
  }
  // Method for backup reporting
  getActionResponse(req, res) {
    console.log(req.route);
    let phase = "PreCreate";
    let actions = ["Blueprint"];
    let context = {
      "a": 1
    };
    return ActionManager
      .executeActions(phase, actions, context)
      // .executeActions(req.body.phase, req.body.actions, req.body.context)
      .tap(body => console.log('fnwkfekfn:', body))
      .then(body => res
        .status(200)
        .send(body));
  }
}

module.exports = serviceFabrikDeploymentHookController;