import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { DashboardsServiceFactory } from '../build/DashboardsServiceFactory';

export class DashboardsProcess extends ProcessContainer {

    public constructor() {
        super("dashboards", "Application dashboards microservice");
        this._factories.add(new DashboardsServiceFactory);
        this._factories.add(new DefaultOssFactory);
    }

}
