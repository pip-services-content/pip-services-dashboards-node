"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class DashboardsHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/dashboards');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-dashboards', 'controller', 'default', '*', '1.0'));
    }
}
exports.DashboardsHttpServiceV1 = DashboardsHttpServiceV1;
//# sourceMappingURL=DashboardsHttpServiceV1.js.map