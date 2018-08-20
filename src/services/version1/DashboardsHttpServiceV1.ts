import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class DashboardsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/dashboards');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-dashboards', 'controller', 'default', '*', '1.0'));
    }
}