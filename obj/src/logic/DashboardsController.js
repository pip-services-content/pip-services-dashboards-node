"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const DashboardsCommandSet_1 = require("./DashboardsCommandSet");
class DashboardsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(DashboardsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new DashboardsCommandSet_1.DashboardsCommandSet(this);
        return this._commandSet;
    }
    makeDashboardId(userId, app, kind) {
        let id = userId + "_" + app;
        if (kind)
            id += "_" + kind;
        return id;
    }
    getDashboards(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, (err, page) => {
            if (page) {
                _.each(page.data, (d) => {
                    delete d.id;
                });
            }
            callback(err, page);
        });
    }
    getDashboard(correlationId, userId, app, kind, callback) {
        let id = this.makeDashboardId(userId, app, kind);
        this._persistence.getOneById(correlationId, id, (err, dashboard) => {
            if (err == null && dashboard == null) {
                dashboard = {
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
    setDashboard(correlationId, dashboard, callback) {
        dashboard.id = this.makeDashboardId(dashboard.user_id, dashboard.app, dashboard.kind);
        this._persistence.set(correlationId, dashboard, (err, dashboard) => {
            if (dashboard)
                delete dashboard.id;
            if (callback)
                callback(err, dashboard);
        });
    }
    deleteDashboards(correlationId, filter, callback) {
        this._persistence.deleteByFilter(correlationId, filter, callback);
    }
}
DashboardsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-dashboards:persistence:*:*:1.0');
exports.DashboardsController = DashboardsController;
//# sourceMappingURL=DashboardsController.js.map