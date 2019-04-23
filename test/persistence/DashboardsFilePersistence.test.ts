import { ConfigParams } from 'pip-services3-commons-node';

import { DashboardsFilePersistence } from '../../src/persistence/DashboardsFilePersistence';
import { DashboardsPersistenceFixture } from './DashboardsPersistenceFixture';

suite('DashboardsFilePersistence', ()=> {
    let persistence: DashboardsFilePersistence;
    let fixture: DashboardsPersistenceFixture;
    
    setup((done) => {
        persistence = new DashboardsFilePersistence('./data/Dashboards.test.json');

        fixture = new DashboardsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});