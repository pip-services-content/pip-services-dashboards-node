"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const DashboardsMongoDbSchema_1 = require("./DashboardsMongoDbSchema");
class DashboardsMongoDbPersistence extends pip_services_oss_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('dashboards', DashboardsMongoDbSchema_1.DashboardsMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let user_id = filter.getAsNullableString('user_id');
        if (user_id != null)
            criteria.push({ user_id: user_id });
        let app = filter.getAsNullableString('app');
        if (app != null)
            criteria.push({ app: app });
        let kind = filter.getAsNullableString('kind');
        if (kind != null)
            criteria.push({ kind: kind });
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '_id', null, callback);
    }
    deleteByFilter(correlationId, filter, callback) {
        super.deleteByFilter(correlationId, this.composeFilter(filter), callback);
    }
}
exports.DashboardsMongoDbPersistence = DashboardsMongoDbPersistence;
//# sourceMappingURL=DashboardsMongoDbPersistence.js.map