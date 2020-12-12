import {Schema} from "mongoose";

const reportCounterSchema = new Schema({
    name: {type: String},
    value: {type: Number},
});

export const ReportSchema = new Schema({
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    activity: {type: Schema.Types.ObjectId, ref: 'Activity', required: true},
    jobVersion: {type: String},
    taskVersion: {type: String},
    date: {type: String},
    time: {type: String},
    endDate: {type: String},
    duration: {type: String},
    status: {type: String},
    branch: {type: String},
    version: {type: String},
    counters: [reportCounterSchema]
}, {
    timestamps: true,
});

ReportSchema.set('toJSON', {
    virtuals: true
});

ReportSchema.index({
    project: 1,
    activity: 1,
    date: 1,
    time: 1,
}, {unique: true});
