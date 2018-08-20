"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const DashboardsServiceFactory_1 = require("../build/DashboardsServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class DashboardsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("dashboards", "Application dashboards microservice");
        this._factories.add(new DashboardsServiceFactory_1.DashboardsServiceFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.DashboardsProcess = DashboardsProcess;
//# sourceMappingURL=DashboardsProcess.js.map