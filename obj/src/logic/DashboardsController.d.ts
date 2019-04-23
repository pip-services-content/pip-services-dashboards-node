import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { DashboardV1 } from '../data/version1/DashboardV1';
import { IDashboardsController } from './IDashboardsController';
export declare class DashboardsController implements IConfigurable, IReferenceable, ICommandable, IDashboardsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    private makeDashboardId(userId, app, kind);
    getDashboards(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<DashboardV1>) => void): void;
    getDashboard(correlationId: string, userId: string, app: string, kind: string, callback: (err: any, item: DashboardV1) => void): void;
    setDashboard(correlationId: string, dashboard: DashboardV1, callback: (err: any, dashboard: DashboardV1) => void): void;
    deleteDashboards(correlationId: string, filter: FilterParams, callback: (err: any) => void): void;
}
