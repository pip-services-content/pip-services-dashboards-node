let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { IDashboardsPersistence } from '../../src/persistence/IDashboardsPersistence';
import { DashboardV1 } from '../../src/data/version1/DashboardV1';
import { TileGroupV1 } from '../../src/data/version1/TileGroupV1';

let DASHBOARD1 = <DashboardV1>{
    id: null,
    user_id: '1',
    app: 'Test App 1',
    groups: []
};
let DASHBOARD2 = <DashboardV1>{
    id: null,
    user_id: '1',
    app: 'Test App 2',
    groups: []
};
let DASHBOARD3 = <DashboardV1>{
    id: null,
    user_id: '2',
    app: 'Test App 1',
    groups: []
};

export class DashboardsPersistenceFixture {
    private _persistence: IDashboardsPersistence;
    
    constructor(persistence: IDashboardsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public createDashboards(done) {
        async.series([
        // Create one dashboard
            (callback) => {
                this._persistence.set(
                    null,
                    DASHBOARD1,
                    (err, dashboard) => {
                        assert.isNull(err);
                        
                        assert.isObject(dashboard);
                        assert.equal(dashboard.user_id, DASHBOARD1.user_id);
                        assert.equal(dashboard.app, DASHBOARD1.app);

                        callback();
                    }
                );
            },
        // Create another dashboard
            (callback) => {
                this._persistence.set(
                    null,
                    DASHBOARD2,
                    (err, dashboard) => {
                        assert.isNull(err);
                        
                        assert.isObject(dashboard);
                        assert.equal(dashboard.user_id, DASHBOARD2.user_id);
                        assert.equal(dashboard.app, DASHBOARD2.app);

                        callback();
                    }
                );
            },
        // Create yet another dashboard
            (callback) => {
                this._persistence.set(
                    null,
                    DASHBOARD3,
                    (err, dashboard) => {
                        assert.isNull(err);
                        
                        assert.isObject(dashboard);
                        assert.equal(dashboard.user_id, DASHBOARD3.user_id);
                        assert.equal(dashboard.app, DASHBOARD3.app);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let dashboard1: DashboardV1;

        async.series([
        // Create items
            (callback) => {
                this.createDashboards(callback);
            },
        // Get all dashboards
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        dashboard1 = page.data[0];

                        callback();
                    }
                );
            },
        // Set the dashboard
            (callback) => {
                dashboard1.groups = [<TileGroupV1>{ index: 0, tiles: [] }];

                this._persistence.set(
                    null,
                    dashboard1,
                    (err, dashboard) => {
                        assert.isNull(err);
                        
                        assert.isObject(dashboard);
                        assert.equal(dashboard.user_id, dashboard1.user_id);
                        assert.equal(dashboard.app, dashboard1.app);
                        assert.lengthOf(dashboard.groups, 1);

                        callback();
                    }
                );
            },
        // Delete dashboard
            (callback) => {
                this._persistence.deleteById(
                    null,
                    dashboard1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete dashboard
            (callback) => {
                this._persistence.getOneById(
                    null,
                    dashboard1.id,
                    (err, dashboard) => {
                        assert.isNull(err);
                        
                        assert.isNull(dashboard || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create dashboards
            (callback) => {
                this.createDashboards(callback);
            },
        // Get dashboards filtered by user_id and app
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        user_id: DASHBOARD3.user_id,
                        app: DASHBOARD3.app
                    }),
                    new PagingParams(),
                    (err, dashboards) => {
                        assert.isNull(err);
                        
                        assert.isObject(dashboards);
                        assert.lengthOf(dashboards.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }
}
