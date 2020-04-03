'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const logger = require('../../common/logger');
const cf = require('../../data-access-layer/cf');
const config = require('../../common/config');
const CONST = require('../../common/constants');
const BaseQuotaManager = require('../BaseQuotaManager');

class CFPlatformQuotaManager extends BaseQuotaManager {
  constructor(quotaAPIClient) {
    super(quotaAPIClient, CONST.PLATFORM.CF);
  }

  async getInstanceCountonPlatform(orgId, planIds) {
    const planGuids = await this.getAllPlanGuidsFromPlanIDs(planIds);
    logger.debug('planguids are ', planGuids);
    const instances = await cf.cloudController.getServiceInstancesInOrgWithPlansGuids(orgId, planGuids);
    return _.size(instances);
  }

  async isOrgWhitelisted(orgId) {
    const org = await cf.cloudController.getOrganization(orgId);
    logger.debug('current org details are ', org);
    logger.debug('current org name is ', org.entity.name);
    logger.debug('Whitelisted orgs are ', config.quota.whitelist);
    return await _.includes(config.quota.whitelist, org.entity.name);
  }

  async getAllPlanGuidsFromPlanIDs(planIds) {
    return await Promise.all(planIds.map(planId => this.getPlanGuidFromPlanID(planId)));
  }

  async getPlanGuidFromPlanID(planId) {
    const plans = await cf.cloudController.getServicePlans(`unique_id:${planId}`);
    logger.debug(`planguid for uniqueid ${planId} is ${_.head(plans).metadata.guid}`);
    return _.head(plans).metadata.guid;
  }
}

module.exports = CFPlatformQuotaManager;
