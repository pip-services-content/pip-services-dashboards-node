import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { DashboardsMongoDbPersistence } from '../persistence/DashboardsMongoDbPersistence';
import { DashboardsFilePersistence } from '../persistence/DashboardsFilePersistence';
import { DashboardsMemoryPersistence } from '../persistence/DashboardsMemoryPersistence';
import { DashboardsController } from '../logic/DashboardsController';
import { DashboardsHttpServiceV1 } from '../services/version1/DashboardsHttpServiceV1';
import { DashboardsSenecaServiceV1 } from '../services/version1/DashboardsSenecaServiceV1'; 

export class DashboardsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-dashboards", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-dashboards", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-dashboards", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-dashboards", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-dashboards", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-dashboards", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-dashboards", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(DashboardsServiceFactory.MemoryPersistenceDescriptor, DashboardsMemoryPersistence);
		this.registerAsType(DashboardsServiceFactory.FilePersistenceDescriptor, DashboardsFilePersistence);
		this.registerAsType(DashboardsServiceFactory.MongoDbPersistenceDescriptor, DashboardsMongoDbPersistence);
		this.registerAsType(DashboardsServiceFactory.ControllerDescriptor, DashboardsController);
		this.registerAsType(DashboardsServiceFactory.SenecaServiceDescriptor, DashboardsSenecaServiceV1);
		this.registerAsType(DashboardsServiceFactory.HttpServiceDescriptor, DashboardsHttpServiceV1);
	}
	
}
