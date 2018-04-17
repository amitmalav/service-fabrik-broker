'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const errors = require('../errors');
const BaseController = require('../../../common/controllers/BaseController');
const ContinueWithNext = errors.ContinueWithNext;
const BadRequest = errors.BadRequest;

class HookBaseController extends BaseController {
  constructor() {
    super();
  }
}
module.exports = HookBaseController;