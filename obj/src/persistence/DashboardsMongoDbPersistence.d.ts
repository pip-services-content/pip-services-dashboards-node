import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-oss-node';
import { DashboardV1 } from '../data/version1/DashboardV1';
import { IDashboardsPersistence } from './IDashboardsPersistence';
export declare class DashboardsMongoDbPersistence extends IdentifiableMongoDbPersistence<DashboardV1, string> implements IDashboardsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    deleteByFilter(correlationId: string, filter: FilterParams, callback: (err: any) => void): void;
}
