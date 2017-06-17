import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { TileGroupV1 } from './TileGroupV1';

export class DashboardV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;
    public user_id: string;
    public app: string;
    public kind?: string;

    /* Content */
    public groups: TileGroupV1[];
}
