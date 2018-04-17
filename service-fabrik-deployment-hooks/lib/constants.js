'use strict';

const _ = require('lodash');
const common_constants = require('../../common/constants');

module.exports = _.merge(common_constants, Object.freeze({
  SERVICE_LIFE_CYCLE: {
    PRE_CREATE: 'PreCreate',
    PRE_DELETE: 'PreDelete',
    PRE_UPDATE: 'PreUpdate',
    PRE_BIND: 'PreBind',
    PRE_UNBIND: 'PreUnbind'
  },
  FILE_PERMISSIONS: {
    RWXR_XR_X: 0o755
  }
}));