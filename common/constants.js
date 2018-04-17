'use strict';

module.exports = Object.freeze({
  OPERATION_TYPE: {
    BACKUP: 'backup',
    RESTORE: 'restore',
    UNLOCK: 'unlock',
    LOCK: '__Locked__',
    CREATE: 'create',
    UPDATE: 'update',
    BIND: 'bind',
    UNBIND: 'unbind',
    DELETE: 'delete'
  },
  INSTANCE_TYPE: {
    DIRECTOR: 'director',
    DOCKER: 'docker'
  },
  HTTP_METHOD: {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE',
    PUT: 'PUT',
    PATCH: 'PATCH'
  },
  HTTP_STATUS_CODE: {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    CONFLICT: 409,
    GONE: 410,
    PRECONDITION_FAILED: 412,
    UNPROCESSABLE_ENTITY: 422
  },
  DB_MODEL: {
    //Define all DB Model names
    JOB: 'JobDetail',
    JOB_RUN_DETAIL: 'JobRunDetail',
    MAINTENANCE_DETAIL: 'MaintenanceDetail',
    EVENT_DETAIL: 'EventDetail'
  },
  //Topic naming convention: {GROUP}.{EVENT_NAME}
  //Reasoning: pubsub module allow for dotted notation of event names and one can subscribe to all events even at group level
  TOPIC: {
    MONGO_OPERATIONAL: 'MONGODB.OPERATIONAL',
    MONGO_INIT_FAILED: 'MONGODB.INIT_FAILIED',
    MONGO_SHUTDOWN: 'MONGODB.SHUTDOWN',
    APP_SHUTTING_DOWN: 'APP.SHUTTING_DOWN',
    APP_STARTUP: 'APP.STARTUP',
    INTERRUPT_RECIEVED: 'APP.SIGINT_RECIEVED',
    SCHEDULER_READY: 'APP.SCHEDULER_READY',
    SCHEDULER_STARTED: 'APP.SCHEDULER_STARTED'
  },
  SYSTEM_USER: {
    name: 'system'
  },
  ERR_CODES: {
    UNKNOWN: 'ERR-CODE-UNKNOWN',
    PRE_CONDITION_NOT_MET: 'PRE_CONDITION_NOT_MET',
    DEPLOYMENT_NAME_DUPED_ACROSS_DIRECTORS: 'DEPLOYMENT_NAME_DUPED_ACROSS_DIRECTORS',
    SF_IN_MAINTENANCE: 101,
    INTERNAL_ERROR: 4
    //Error codes should always be readable strings. However few error codes (used as process exit codes) must be int.
    //Guideline : Only in cases where it is mandatory to have int, error codes should be so else they must always be Strings.
  }
});