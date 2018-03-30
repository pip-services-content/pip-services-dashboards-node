"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.DashboardsMongoDbSchema = function (collection) {
    collection = collection || 'dashboards';
    let tileSchema = new mongoose_1.Schema({
        /* Content */
        title: { type: String, required: false },
        index: { type: Number, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        params: { type: Mixed, required: false }
    });
    tileSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    let tileGroupSchema = new mongoose_1.Schema({
        /* Content */
        title: { type: String, required: false },
        index: { type: Number, required: true },
        tiles: { type: [tileSchema], required: false }
    });
    tileGroupSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String },
        user_id: { type: String, required: true, index: true },
        app: { type: String, required: true },
        kind: { type: String, required: false },
        /* Content */
        groups: { type: [tileGroupSchema], required: false }
    }, {
        collection: collection,
        autoIndex: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=DashboardsMongoDbSchema.js.map