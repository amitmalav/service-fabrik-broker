const lib = require('./lib');
const dockerProvisioner = lib.managers.dockerProvisioner;

dockerProvisioner.registerServices('docker');
dockerProvisioner.registerWatcher();