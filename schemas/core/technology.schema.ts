import {Schema} from "mongoose";


export const TechnologySchema = new Schema({
    name: {type: String, required: true},
    type: {type: Schema.Types.ObjectId, ref: 'TechnologyType'},
    latestVersion: {type: String},
    description: {type: String},
    url: {type: String}
}, {
    timestamps: true,
});

TechnologySchema.set('toJSON', {
    virtuals: true
});

TechnologySchema.index({
    name: 1
}, {unique: true});
