let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';

import { DashboardV1 } from '../data/version1/DashboardV1';
import { IDashboardsPersistence } from './IDashboardsPersistence';
import { DashboardsMongooseSchema } from './DashboardsMongooseSchema';

export class DashboardsMongoDbPersistence 
    extends IdentifiableMongoosePersistence<DashboardV1, string> 
    implements IDashboardsPersistence {

    constructor() {
        super('dashboards', DashboardsMongooseSchema());
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

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

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '_id', null, callback);
    }

    public deleteByFilter(correlationId: string, filter: FilterParams, 
        callback: (err: any) => void): void {
        super.deleteByFilter(correlationId, this.composeFilter(filter), callback);
    }

}
