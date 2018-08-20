"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const DashboardsServiceFactory_1 = require("../build/DashboardsServiceFactory");
class DashboardsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("dashboards", "Application dashboards microservice");
        this._factories.add(new DashboardsServiceFactory_1.DashboardsServiceFactory);
    }
}
exports.DashboardsProcess = DashboardsProcess;
//# sourceMappingURL=DashboardsProcess.js.map