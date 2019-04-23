import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';

import { TileV1Schema } from './TileV1Schema';

export class TileGroupV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('title', TypeCode.String);
        this.withRequiredProperty('index', TypeCode.Integer);
        this.withOptionalProperty('tiles', new ArraySchema(new TileV1Schema()));
    }
}
