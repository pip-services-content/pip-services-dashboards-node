import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

import { DashboardV1 } from '../data/version1/DashboardV1';
import { DashboardV1Schema } from '../data/version1/DashboardV1Schema';
import { IDashboardsController } from './IDashboardsController';

export class DashboardsCommandSet extends CommandSet {
    private _logic: IDashboardsController;

	constructor(logic: IDashboardsController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetDashboardsCommand());
		this.addCommand(this.makeGetDashboardCommand());
		this.addCommand(this.makeSetDashboardCommand());
		this.addCommand(this.makeDeleteDashboardsCommand());
	}

	private makeGetDashboardsCommand(): ICommand {
		return new Command(
			"get_dashboards",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getDashboards(correlationId, filter, paging, callback);
			}
		);
	}

	private makeGetDashboardCommand(): ICommand {
		return new Command(
			"get_dashboard",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withRequiredProperty('app', TypeCode.String)
				.withOptionalProperty('kind', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let userId = args.getAsNullableString("user_id");
				let app = args.getAsNullableString("app");
				let kind = args.getAsNullableString("kind");
				this._logic.getDashboard(correlationId, userId, app, kind, callback);
			}
		);
	}

	private makeSetDashboardCommand(): ICommand {
		return new Command(
			"set_dashboard",
			new ObjectSchema(true)
				.withRequiredProperty('dashboard', new DashboardV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let dashboard = args.get("dashboard");
				this._logic.setDashboard(correlationId, dashboard, callback);
			}
		);
	}

	private makeDeleteDashboardsCommand(): ICommand {
		return new Command(
			"delete_dashboards",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				this._logic.deleteDashboards(correlationId, filter, (err) => {
					callback(err, null);
				});
			}
		);
	}

}