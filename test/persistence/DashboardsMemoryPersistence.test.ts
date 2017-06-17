import { DashboardsMemoryPersistence } from '../../src/persistence/DashboardsMemoryPersistence';
import { DashboardsPersistenceFixture } from './DashboardsPersistenceFixture';

suite('DashboardsMemoryPersistence', ()=> {
    let persistence: DashboardsMemoryPersistence;
    let fixture: DashboardsPersistenceFixture;
    
    setup((done) => {
        persistence = new DashboardsMemoryPersistence();
        fixture = new DashboardsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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