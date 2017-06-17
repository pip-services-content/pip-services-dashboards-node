"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const DashboardV1Schema_1 = require("../data/version1/DashboardV1Schema");
class DashboardsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetDashboardsCommand());
        this.addCommand(this.makeGetDashboardCommand());
        this.addCommand(this.makeSetDashboardCommand());
        this.addCommand(this.makeDeleteDashboardsCommand());
    }
    makeGetDashboardsCommand() {
        return new pip_services_commons_node_2.Command("get_dashboards", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getDashboards(correlationId, filter, paging, callback);
        });
    }
    makeGetDashboardCommand() {
        return new pip_services_commons_node_2.Command("get_dashboard", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services_commons_node_6.TypeCode.String)
            .withRequiredProperty('app', pip_services_commons_node_6.TypeCode.String)
            .withOptionalProperty('kind', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let app = args.getAsNullableString("app");
            let kind = args.getAsNullableString("kind");
            this._logic.getDashboard(correlationId, userId, app, kind, callback);
        });
    }
    makeSetDashboardCommand() {
        return new pip_services_commons_node_2.Command("set_dashboard", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('dashboard', new DashboardV1Schema_1.DashboardV1Schema()), (correlationId, args, callback) => {
            let dashboard = args.get("dashboard");
            this._logic.setDashboard(correlationId, dashboard, callback);
        });
    }
    makeDeleteDashboardsCommand() {
        return new pip_services_commons_node_2.Command("delete_dashboards", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            this._logic.deleteDashboards(correlationId, filter, (err) => {
                callback(err, null);
            });
        });
    }
}
exports.DashboardsCommandSet = DashboardsCommandSet;
//# sourceMappingURL=DashboardsCommandSet.js.map