import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { DashboardsServiceFactory } from '../build/DashboardsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class DashboardsProcess extends ProcessContainer {

    public constructor() {
        super("dashboards", "Application dashboards microservice");
        this._factories.add(new DashboardsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
