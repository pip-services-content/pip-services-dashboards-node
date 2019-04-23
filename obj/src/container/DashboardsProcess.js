"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const DashboardsServiceFactory_1 = require("../build/DashboardsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class DashboardsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("dashboards", "Application dashboards microservice");
        this._factories.add(new DashboardsServiceFactory_1.DashboardsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.DashboardsProcess = DashboardsProcess;
//# sourceMappingURL=DashboardsProcess.js.map