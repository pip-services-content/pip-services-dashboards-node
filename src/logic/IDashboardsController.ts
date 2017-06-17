import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { DashboardV1 } from '../data/version1/DashboardV1';

export interface IDashboardsController {
    getDashboards(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<DashboardV1>) => void): void;

    getDashboard(correlationId: string, userId: string, app: string, kind: string,
        callback: (err: any, dashboard: DashboardV1) => void): void;

    setDashboard(correlationId: string, dashboard: DashboardV1,
        callback: (err: any, dashboard: DashboardV1) => void): void;

    deleteDashboards(correlationId: string, filter: FilterParams,
        callback: (err: any) => void): void;
}
