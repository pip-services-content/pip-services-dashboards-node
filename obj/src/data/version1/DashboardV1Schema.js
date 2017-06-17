"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const TileGroupV1Schema_1 = require("./TileGroupV1Schema");
class DashboardV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services_commons_node_3.TypeCode.String);
        this.withRequiredProperty('user_id', pip_services_commons_node_3.TypeCode.String);
        this.withRequiredProperty('app', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('kind', pip_services_commons_node_3.TypeCode.String);
        /* Content */
        this.withOptionalProperty('groups', new pip_services_commons_node_2.ArraySchema(new TileGroupV1Schema_1.TileGroupV1Schema()));
    }
}
exports.DashboardV1Schema = DashboardV1Schema;
//# sourceMappingURL=DashboardV1Schema.js.map