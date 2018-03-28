'use strict';

var moment = require('moment-timezone');
const BaseController = require('./BaseController');
const errors = require('../errors');
const logger = require('../logger');
const CONST = require('../constants');
const BadRequest = errors.BadRequest;

class serviceFabrikDeploymentHookController extends BaseController {
  constructor() {
    super();
  }
  // Method for backup reporting
  getServiceInstanceBackupSummary(req, res) {
    if (!req.params.instance_id || !req.query.start_time || !req.query.end_time) {
      throw new BadRequest('instance_id | start_time | end_time required');
    }
    if (!moment(req.query.start_time, CONST.REPORT_BACKUP.INPUT_DATE_FORMAT, true).isValid()) {
      throw new BadRequest(`Invalid start date, required format ${CONST.REPORT_BACKUP.INPUT_DATE_FORMAT}`);
    }
    if (!moment(req.query.end_time, CONST.REPORT_BACKUP.INPUT_DATE_FORMAT, true).isValid()) {
      throw new BadRequest(`Invalid end date, required format ${CONST.REPORT_BACKUP.INPUT_DATE_FORMAT}`);
    }
    const start_time = moment.utc(req.query.start_time).toDate();
    const end_time = moment.utc(req.query.end_time).endOf('day').toDate();
    logger.info(`Getting backup summary for ${req.params.instance_id}...`);
    return BackupReportManager
      .getInstanceBackupSummary(req.params.instance_id, start_time, end_time)
      .then(body => res
        .status(200)
        .send(body));
  }
}

module.exports = serviceFabrikDeploymentHookController;