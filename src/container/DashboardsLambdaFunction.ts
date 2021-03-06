import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';

import { DashboardsServiceFactory } from '../build/DashboardsServiceFactory';

export class DashboardsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("dashboards", "Application dashboards function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-dashboards', 'controller', 'default', '*', '*'));
        this._factories.add(new DashboardsServiceFactory());
    }
}

export const handler = new DashboardsLambdaFunction().getHandler();