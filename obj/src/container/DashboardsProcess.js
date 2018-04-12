"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const DashboardsServiceFactory_1 = require("../build/DashboardsServiceFactory");
class DashboardsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("dashboards", "Application dashboards microservice");
        this._factories.add(new DashboardsServiceFactory_1.DashboardsServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.DashboardsProcess = DashboardsProcess;
//# sourceMappingURL=DashboardsProcess.js.map