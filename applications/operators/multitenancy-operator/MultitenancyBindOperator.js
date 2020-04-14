'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const assert = require('assert');
const { apiServerClient } = require('@sf/eventmesh');
const logger = require('@sf/logger');
const {
  CONST,
  commonFunctions: {
    buildErrorJson,
    encodeBase64
  }
} = require('@sf/common-utils');
const BaseOperator = require('../BaseOperator');
const MTServiceFabrik = require('./MTServiceFabrik');

class MultitenancyBindOperator extends BaseOperator {

  constructor(bindResourceType, deploymentResourceType, service) {
    super();
    this.bindResourceType = bindResourceType;
    this.deploymentResourceType = deploymentResourceType;
    this.service = service;
  }

  init() {
    const validStateList = [CONST.APISERVER.RESOURCE_STATE.IN_QUEUE, CONST.APISERVER.RESOURCE_STATE.DELETE];
    return this.registerCrds(CONST.APISERVER.RESOURCE_GROUPS.BIND, this.bindResourceType)
      .then(() => this.registerWatcher(CONST.APISERVER.RESOURCE_GROUPS.BIND, this.bindResourceType, validStateList));
  }

  processRequest(changeObjectBody) {
    return Promise.try(() => {
      if (changeObjectBody.status.state === CONST.APISERVER.RESOURCE_STATE.IN_QUEUE) {
        return this._processBind(changeObjectBody);
      } else if (changeObjectBody.status.state === CONST.APISERVER.RESOURCE_STATE.DELETE) {
        return this._processUnbind(changeObjectBody);
      }
    })
      .catch(Error, err => {
        logger.error('Error occurred in processing request by MultitenancyBindOperator', err);
        return apiServerClient.updateResource({
          resourceGroup: CONST.APISERVER.RESOURCE_GROUPS.BIND,
          resourceType: this.bindResourceType,
          resourceId: changeObjectBody.metadata.name,
          status: {
            state: CONST.APISERVER.RESOURCE_STATE.FAILED,
            error: buildErrorJson(err)
          }
        });
      });
  }

  _processBind(changeObjectBody) {
    assert.ok(_.get(changeObjectBody, 'metadata.labels.instance_guid'), 'Argument \'metadata.labels.instance_guid\' is required to process the request');
    assert.ok(_.get(changeObjectBody, 'spec.options'), 'Argument \'spec.options\' is required to process the request');
    const changedOptions = JSON.parse(changeObjectBody.spec.options);
    const instance_guid = _.get(changeObjectBody, 'metadata.labels.instance_guid');
    logger.info(`Triggering bind of resource: '${this.bindResourceType}' with the following options: '${JSON.stringify(changedOptions)}`);
    const multitenancyBindService = MTServiceFabrik.getService(this.service);
    return multitenancyBindService.createInstance(instance_guid, changedOptions, this.bindResourceType, this.deploymentResourceType)
      .then(multitenancyBindService => multitenancyBindService.bind(changedOptions))
      .then(response => {
        const encodedResponse = encodeBase64(response);
        return apiServerClient.updateResource({
          resourceGroup: CONST.APISERVER.RESOURCE_GROUPS.BIND,
          resourceType: this.bindResourceType,
          resourceId: changeObjectBody.metadata.name,
          status: {
            response: encodedResponse,
            state: CONST.APISERVER.RESOURCE_STATE.SUCCEEDED
          }
        });
      });
  }

  _processUnbind(changeObjectBody) {
    assert.ok(_.get(changeObjectBody, 'metadata.labels.instance_guid'), 'Argument \'metadata.labels.instance_guid\' is required to process the request');
    assert.ok(_.get(changeObjectBody, 'spec.options'), 'Argument \'spec.options\' is required to process the request');
    const changedOptions = JSON.parse(changeObjectBody.spec.options);
    const instance_guid = _.get(changeObjectBody, 'metadata.labels.instance_guid');
    logger.info(`Triggering unbind of resource: '${this.bindResourceType}' with the following options: '${JSON.stringify(changedOptions)}`);
    const multitenancyBindService = MTServiceFabrik.getService(this.service);
    return multitenancyBindService.createInstance(instance_guid, changedOptions, this.bindResourceType, this.deploymentResourceType)
      .then(multitenancyBindService => multitenancyBindService.unbind(changedOptions))
      .then(() => apiServerClient.deleteResource({
        resourceGroup: CONST.APISERVER.RESOURCE_GROUPS.BIND,
        resourceType: this.bindResourceType,
        resourceId: changeObjectBody.metadata.name
      }));
  }
}

module.exports = MultitenancyBindOperator;
