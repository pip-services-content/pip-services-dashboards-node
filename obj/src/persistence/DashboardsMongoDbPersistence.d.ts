import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';
import { DashboardV1 } from '../data/version1/DashboardV1';
import { IDashboardsPersistence } from './IDashboardsPersistence';
export declare class DashboardsMongoDbPersistence extends IdentifiableMongoosePersistence<DashboardV1, string> implements IDashboardsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    deleteByFilter(correlationId: string, filter: FilterParams, callback: (err: any) => void): void;
}
