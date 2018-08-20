"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const DashboardsMongoDbPersistence_1 = require("../persistence/DashboardsMongoDbPersistence");
const DashboardsFilePersistence_1 = require("../persistence/DashboardsFilePersistence");
const DashboardsMemoryPersistence_1 = require("../persistence/DashboardsMemoryPersistence");
const DashboardsController_1 = require("../logic/DashboardsController");
const DashboardsHttpServiceV1_1 = require("../services/version1/DashboardsHttpServiceV1");
const DashboardsSenecaServiceV1_1 = require("../services/version1/DashboardsSenecaServiceV1");
class DashboardsServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(DashboardsServiceFactory.MemoryPersistenceDescriptor, DashboardsMemoryPersistence_1.DashboardsMemoryPersistence);
        this.registerAsType(DashboardsServiceFactory.FilePersistenceDescriptor, DashboardsFilePersistence_1.DashboardsFilePersistence);
        this.registerAsType(DashboardsServiceFactory.MongoDbPersistenceDescriptor, DashboardsMongoDbPersistence_1.DashboardsMongoDbPersistence);
        this.registerAsType(DashboardsServiceFactory.ControllerDescriptor, DashboardsController_1.DashboardsController);
        this.registerAsType(DashboardsServiceFactory.SenecaServiceDescriptor, DashboardsSenecaServiceV1_1.DashboardsSenecaServiceV1);
        this.registerAsType(DashboardsServiceFactory.HttpServiceDescriptor, DashboardsHttpServiceV1_1.DashboardsHttpServiceV1);
    }
}
DashboardsServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-dashboards", "factory", "default", "default", "1.0");
DashboardsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-dashboards", "persistence", "memory", "*", "1.0");
DashboardsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-dashboards", "persistence", "file", "*", "1.0");
DashboardsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-dashboards", "persistence", "mongodb", "*", "1.0");
DashboardsServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-dashboards", "controller", "default", "*", "1.0");
DashboardsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-dashboards", "service", "seneca", "*", "1.0");
DashboardsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-dashboards", "service", "http", "*", "1.0");
exports.DashboardsServiceFactory = DashboardsServiceFactory;
//# sourceMappingURL=DashboardsServiceFactory.js.map