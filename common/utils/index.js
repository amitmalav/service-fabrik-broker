'use strict';

const _ = require('lodash');
const HttpClient = require('./HttpClient');
const config = require('../config');
const EventLogRiemannClient = require('./EventLogRiemannClient');
const EventLogDomainSocketClient = require('./EventLogDomainSocketClient');
const EventLogDBClient = require('./EventLogDBClient');
exports.HttpClient = HttpClient;
exports.EventLogRiemannClient = EventLogRiemannClient;
exports.EventLogDomainSocketClient = EventLogDomainSocketClient;
exports.EventLogDBClient = EventLogDBClient;
exports.isDBConfigured = isDBConfigured;

function isDBConfigured() {
  return (_.get(config, 'mongodb.url') !== undefined || _.get(config, 'mongodb.provision.plan_id') !== undefined);
}