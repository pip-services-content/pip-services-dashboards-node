"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const DashboardsServiceFactory_1 = require("../build/DashboardsServiceFactory");
class DashboardsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("dashboards", "Application dashboards function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-dashboards', 'controller', 'default', '*', '*'));
        this._factories.add(new DashboardsServiceFactory_1.DashboardsServiceFactory());
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.DashboardsLambdaFunction = DashboardsLambdaFunction;
exports.handler = new DashboardsLambdaFunction().getHandler();
//# sourceMappingURL=DashboardsLambdaFunction.js.map