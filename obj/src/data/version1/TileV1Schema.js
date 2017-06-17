"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class TileV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('title', pip_services_commons_node_2.TypeCode.Map);
        this.withRequiredProperty('index', pip_services_commons_node_2.TypeCode.Integer);
        this.withRequiredProperty('size', pip_services_commons_node_2.TypeCode.String);
        this.withRequiredProperty('color', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('params', null); //TypeCode.Object);
    }
}
exports.TileV1Schema = TileV1Schema;
//# sourceMappingURL=TileV1Schema.js.map