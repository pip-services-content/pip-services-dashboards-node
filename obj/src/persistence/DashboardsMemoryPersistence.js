"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
class DashboardsMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let userId = filter.getAsNullableString('user_id');
        let app = filter.getAsNullableString('app');
        let kind = filter.getAsNullableString('kind');
        return (item) => {
            if (id != null && id != item.id)
                return false;
            if (userId != null && userId != item.user_id)
                return false;
            if (app != null && app != item.app)
                return false;
            if (kind != null && kind != item.kind)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    deleteByFilter(correlationId, filter, callback) {
        super.deleteByFilter(correlationId, this.composeFilter(filter), callback);
    }
}
exports.DashboardsMemoryPersistence = DashboardsMemoryPersistence;
//# sourceMappingURL=DashboardsMemoryPersistence.js.map