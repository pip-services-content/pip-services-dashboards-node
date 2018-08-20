import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-seneca-node';

export class DashboardsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('dashboards');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-dashboards', 'controller', 'default', '*', '1.0'));
    }
}