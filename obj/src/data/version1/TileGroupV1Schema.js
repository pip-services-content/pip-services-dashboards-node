"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const TileV1Schema_1 = require("./TileV1Schema");
class TileGroupV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('title', pip_services_commons_node_2.TypeCode.String);
        this.withRequiredProperty('index', pip_services_commons_node_2.TypeCode.Integer);
        this.withOptionalProperty('tiles', new pip_services_commons_node_3.ArraySchema(new TileV1Schema_1.TileV1Schema()));
    }
}
exports.TileGroupV1Schema = TileGroupV1Schema;
//# sourceMappingURL=TileGroupV1Schema.js.map