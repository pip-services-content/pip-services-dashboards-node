let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { TileGroupV1 } from '../../src/data/version1/TileGroupV1';
import { DashboardV1 } from '../../src/data/version1/DashboardV1';
import { DashboardsMemoryPersistence } from '../../src/persistence/DashboardsMemoryPersistence';
import { DashboardsController } from '../../src/logic/DashboardsController';
import { DashboardsLambdaFunction } from '../../src/container/DashboardsLambdaFunction';

let DASHBOARD = <DashboardV1>{
    user_id: '1',
    app: 'Test App 1',
    groups: []
};

suite('DashboardsLambdaFunction', ()=> {
    let lambda: DashboardsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-dashboards:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-dashboards:controller:default:default:1.0'
        );

        lambda = new DashboardsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let dashboard1: DashboardV1;

        async.series([
        // Create one dashboard
            (callback) => {
                lambda.act(
                    {
                        role: 'dashboards',
                        cmd: 'get_dashboard',
                        user_id: DASHBOARD.user_id,
                        app: DASHBOARD.app
                    },
                    (err, dashboard) => {
                        assert.isNull(err);
                        
                        assert.isObject(dashboard);
                        assert.equal(dashboard.user_id, DASHBOARD.user_id);
                        assert.equal(dashboard.app, DASHBOARD.app);

                        dashboard1 = dashboard;

                        callback();
                    }
                );
            },
        // Set the dashboard
            (callback) => {
                dashboard1.groups = [<TileGroupV1>{ index: 0, tiles: [] }];

                lambda.act(
                    {
                        role: 'dashboards',
                        cmd: 'set_dashboard',
                        dashboard: dashboard1
                    },
                    (err, dashboard) => {
                        assert.isNull(err);
                        
                        assert.isObject(dashboard);
                        assert.equal(dashboard.app, DASHBOARD.app);
                        assert.lengthOf(dashboard.groups, 1);

                        dashboard1 = dashboard;

                        callback();
                    }
                );
            },
        // Delete dashboard
            (callback) => {
                lambda.act(
                    {
                        role: 'dashboards',
                        cmd: 'delete_dashboards',
                        filter: {
                            user_id: DASHBOARD.user_id,
                            app: DASHBOARD.app
                        }
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });
});