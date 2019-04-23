import { IStringIdentifiable } from 'pip-services3-commons-node';
import { TileGroupV1 } from './TileGroupV1';
export declare class DashboardV1 implements IStringIdentifiable {
    id: string;
    user_id: string;
    app: string;
    kind?: string;
    groups: TileGroupV1[];
}
