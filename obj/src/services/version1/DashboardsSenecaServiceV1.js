"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class DashboardsSenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('dashboards');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-dashboards', 'controller', 'default', '*', '1.0'));
    }
}
exports.DashboardsSenecaServiceV1 = DashboardsSenecaServiceV1;
//# sourceMappingURL=DashboardsSenecaServiceV1.js.map