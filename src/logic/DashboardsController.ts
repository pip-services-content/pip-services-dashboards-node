let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { NotFoundException } from 'pip-services-commons-node';

import { DashboardV1 } from '../data/version1/DashboardV1';
import { IDashboardsPersistence } from '../persistence/IDashboardsPersistence';
import { IDashboardsController } from './IDashboardsController';
import { DashboardsCommandSet } from './DashboardsCommandSet';

export class DashboardsController implements IConfigurable, IReferenceable, ICommandable, IDashboardsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-dashboards:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(DashboardsController._defaultConfig);
    private _persistence: IDashboardsPersistence;
    private _commandSet: DashboardsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IDashboardsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new DashboardsCommandSet(this);
        return this._commandSet;
    }

    private makeDashboardId(userId: string, app: string, kind: string) {
        let id = userId + "_" + app;
        if (kind) id += "_" + kind;
        return id;
    }

    public getDashboards(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<DashboardV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, (err, page) => {
            if (page) {
                _.each(page.data, (d) => {
                    delete d.id;
                });
            }
            callback(err, page);
        });
    }

    public getDashboard(correlationId: string, userId: string, app: string, kind: string,
        callback: (err: any, item: DashboardV1) => void): void {
        let id = this.makeDashboardId(userId, app, kind);
        this._persistence.getOneById(correlationId, id, (err, dashboard) => {
            if (err == null && dashboard == null) {
                dashboard = <DashboardV1>{ 
                    user_id: userId,
                    app: app,
                    kind: kind
                };
            }

            if (dashboard)
                delete dashboard.id;

            callback(err, dashboard);
        });
    }

    public setDashboard(correlationId: string, dashboard: DashboardV1,
        callback: (err: any, dashboard: DashboardV1) => void): void {
        dashboard.id = this.makeDashboardId(dashboard.user_id, dashboard.app, dashboard.kind);
        this._persistence.set(correlationId, dashboard, (err, dashboard) => {
            if (dashboard)
                delete dashboard.id;
            if (callback) callback(err, dashboard);
        });
    }

    public deleteDashboards(correlationId: string, filter: FilterParams,
        callback: (err: any) => void): void {
        this._persistence.deleteByFilter(correlationId, filter, callback);
    }

}
