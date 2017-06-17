import { CommandSet } from 'pip-services-commons-node';
import { IDashboardsController } from './IDashboardsController';
export declare class DashboardsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IDashboardsController);
    private makeGetDashboardsCommand();
    private makeGetDashboardCommand();
    private makeSetDashboardCommand();
    private makeDeleteDashboardsCommand();
}
