import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class TileV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('title', TypeCode.Map);
        this.withRequiredProperty('index', TypeCode.Integer);
        this.withRequiredProperty('size', TypeCode.String);
        this.withRequiredProperty('color', TypeCode.String);
        this.withOptionalProperty('params', null); //TypeCode.Object);
    }
}
