let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { TileGroupV1 } from '../../../src/data/version1/TileGroupV1';
import { DashboardV1 } from '../../../src/data/version1/DashboardV1';
import { DashboardsMemoryPersistence } from '../../../src/persistence/DashboardsMemoryPersistence';
import { DashboardsController } from '../../../src/logic/DashboardsController';
import { DashboardsSenecaServiceV1 } from '../../../src/services/version1/DashboardsSenecaServiceV1';

let DASHBOARD = <DashboardV1>{
    user_id: '1',
    app: 'Test App 1',
    groups: []
};

suite('DashboardsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: DashboardsSenecaServiceV1;
    let persistence: DashboardsMemoryPersistence;
    let controller: DashboardsController;

    suiteSetup((done) => {
        persistence = new DashboardsMemoryPersistence();
        controller = new DashboardsController();

        service = new DashboardsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-dashboards', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-dashboards', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-dashboards', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });

    test('CRUD Operations', (done) => {
        let dashboard1: DashboardV1;

        async.series([
        // Get dashboard
            (callback) => {
                seneca.act(
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
        // Set dashboard
            (callback) => {
                dashboard1.groups = [<TileGroupV1>{ index: 0, tiles: [] }];

                seneca.act(
                    {
                        role: 'dashboards',
                        cmd: 'set_dashboard',
                        dashboard: dashboard1
                    },
                    (err, dashboard) => {
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