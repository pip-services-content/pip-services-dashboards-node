import { YamlConfigReader } from 'pip-services-commons-node';

import { DashboardsMongoDbPersistence } from '../../src/persistence/DashboardsMongoDbPersistence';
import { DashboardsPersistenceFixture } from './DashboardsPersistenceFixture';

suite('DashboardsMongoDbPersistence', ()=> {
    let persistence: DashboardsMongoDbPersistence;
    let fixture: DashboardsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new DashboardsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new DashboardsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
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