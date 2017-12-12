'use strict';

const ServiceBrokerApiController = require('./ServiceBrokerApiController');
const ServiceFabrikApiController = require('./ServiceFabrikApiController');
const ServiceFabrikAdminController = require('./ServiceFabrikAdminController');
const DashboardController = require('./DashboardController');

/* Controller classes */
exports.ServiceBrokerApiController = ServiceBrokerApiController;
exports.ServiceFabrikApiController = ServiceFabrikApiController;
exports.ServiceFabrikAdminController = ServiceFabrikAdminController;
exports.DashboardController = DashboardController;
//exports.DirectorProvisionController = DirectorProvisionController;

/* Controller instances */
exports.serviceBrokerApi = new ServiceBrokerApiController();
exports.serviceFabrikApi = new ServiceFabrikApiController();
exports.serviceFabrikAdmin = new ServiceFabrikAdminController();
exports.dashboard = new DashboardController();