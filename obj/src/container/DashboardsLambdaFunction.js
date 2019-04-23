"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const DashboardsServiceFactory_1 = require("../build/DashboardsServiceFactory");
class DashboardsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("dashboards", "Application dashboards function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-dashboards', 'controller', 'default', '*', '*'));
        this._factories.add(new DashboardsServiceFactory_1.DashboardsServiceFactory());
    }
}
exports.DashboardsLambdaFunction = DashboardsLambdaFunction;
exports.handler = new DashboardsLambdaFunction().getHandler();
//# sourceMappingURL=DashboardsLambdaFunction.js.map