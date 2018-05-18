let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { TileGroupV1 } from '../../../src/data/version1/TileGroupV1';
import { DashboardV1 } from '../../../src/data/version1/DashboardV1';
import { DashboardsMemoryPersistence } from '../../../src/persistence/DashboardsMemoryPersistence';
import { DashboardsController } from '../../../src/logic/DashboardsController';
import { DashboardsHttpServiceV1 } from '../../../src/services/version1/DashboardsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let DASHBOARD = <DashboardV1>{
    user_id: '1',
    app: 'Test App 1',
    groups: []
};

suite('DashboardsHttpServiceV1', ()=> {
    let service: DashboardsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new DashboardsMemoryPersistence();
        let controller = new DashboardsController();

        service = new DashboardsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-dashboards', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-dashboards', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-dashboards', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', (done) => {
        let dashboard1: DashboardV1;

        async.series([
        // Get dashboard
            (callback) => {
                rest.post('/v1/dashboards/get_dashboard',
                    {
                        user_id: DASHBOARD.user_id,
                        app: DASHBOARD.app
                    },
                    (err, req, res, dashboard) => {
                        assert.isNull(err);
                        
                        assert.isObject(dashboard);
                        assert.equal(dashboard.user_id, DASHBOARD.user_id);
                        assert.equal(dashboard.app, DASHBOARD.app);

                        dashboard1 = dashboard;

                        callback();
                    }
                );
            },
        // Set dashboard
            (callback) => {
                dashboard1.groups = [<TileGroupV1>{ index: 0, tiles: [] }];

                rest.post('/v1/dashboards/set_dashboard',
                    {
                        dashboard: dashboard1
                    },
                    (err, req, res, dashboard) => {
                        assert.isNull(err);
                        
                        assert.isObject(dashboard);
                        assert.equal(dashboard.user_id, dashboard1.user_id);
                        assert.equal(dashboard.app, dashboard1.app);
                        assert.lengthOf(dashboard.groups, 1);

                        callback();
                    }
                );
            }
        ], done);
    });
});