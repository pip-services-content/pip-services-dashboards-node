import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';
import { SenecaInstance } from 'pip-services-net-node';

import { DashboardsMemoryPersistence } from '../persistence/DashboardsMemoryPersistence';
import { DashboardsFilePersistence } from '../persistence/DashboardsFilePersistence';
import { DashboardsMongoDbPersistence } from '../persistence/DashboardsMongoDbPersistence';
import { DashboardsController } from '../logic/DashboardsController';
import { DashboardsSenecaServiceV1 } from '../services/version1/DashboardsSenecaServiceV1';

export class DashboardsSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-dashboards', seneca, DashboardsSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new DashboardsController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new DashboardsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new DashboardsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new DashboardsMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        let service = new DashboardsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-dashboards', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-dashboards', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-dashboards', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new DashboardsSenecaPlugin(seneca, options);
    return { name: plugin.name };
}