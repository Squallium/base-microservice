import {Schema} from "mongoose";

export const ParamSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
}, {
    timestamps: true,
});

ParamSchema.set('toJSON', {
    virtuals: true
});

