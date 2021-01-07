import {Schema} from "mongoose";

export const ProjectSchema = new Schema({
    name: {type: String, required: true},
    acronym: {type: String},
    type: {type: Schema.Types.ObjectId, ref: 'ProjectType'},
    categories: [{type: Schema.Types.ObjectId, ref: 'ProjectCategory'}],
    pic: {type: String},
    description: {type: String},
    url: {type: String},
    startDate: {type: String},
    technologies: [{type: Schema.Types.ObjectId, ref: 'Technology'}],
}, {
    timestamps: true,
});

ProjectSchema.set('toJSON', {
    virtuals: true
});

ProjectSchema.index({
    acronym: 1
}, {unique: true});
