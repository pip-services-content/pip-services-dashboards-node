import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { ISetter } from 'pip-services3-data-node';
import { DashboardV1 } from '../data/version1/DashboardV1';
export interface IDashboardsPersistence extends IGetter<DashboardV1, string>, ISetter<DashboardV1> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<DashboardV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: DashboardV1) => void): void;
    set(correlationId: string, item: DashboardV1, callback: (err: any, item: DashboardV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: DashboardV1) => void): void;
    deleteByFilter(correlationId: string, filter: FilterParams, callback: (err: any) => void): void;
}
