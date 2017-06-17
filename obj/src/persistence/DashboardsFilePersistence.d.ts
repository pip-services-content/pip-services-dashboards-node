import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { DashboardsMemoryPersistence } from './DashboardsMemoryPersistence';
import { DashboardV1 } from '../data/version1/DashboardV1';
export declare class DashboardsFilePersistence extends DashboardsMemoryPersistence {
    protected _persister: JsonFilePersister<DashboardV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
