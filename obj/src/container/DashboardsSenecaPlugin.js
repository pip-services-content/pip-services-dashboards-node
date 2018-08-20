"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
const pip_services_seneca_node_2 = require("pip-services-seneca-node");
const DashboardsMemoryPersistence_1 = require("../persistence/DashboardsMemoryPersistence");
const DashboardsFilePersistence_1 = require("../persistence/DashboardsFilePersistence");
const DashboardsMongoDbPersistence_1 = require("../persistence/DashboardsMongoDbPersistence");
const DashboardsController_1 = require("../logic/DashboardsController");
const DashboardsSenecaServiceV1_1 = require("../services/version1/DashboardsSenecaServiceV1");
class DashboardsSenecaPlugin extends pip_services_seneca_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-dashboards', seneca, DashboardsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_components_node_1.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new DashboardsController_1.DashboardsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new DashboardsMongoDbPersistence_1.DashboardsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new DashboardsFilePersistence_1.DashboardsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new DashboardsMemoryPersistence_1.DashboardsMemoryPersistence();
        else
            throw new pip_services_commons_node_4.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_seneca_node_2.SenecaInstance(seneca);
        let service = new DashboardsSenecaServiceV1_1.DashboardsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-dashboards', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-dashboards', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-dashboards', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.DashboardsSenecaPlugin = DashboardsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new DashboardsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=DashboardsSenecaPlugin.js.map