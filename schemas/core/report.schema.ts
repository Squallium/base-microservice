import {Schema} from "mongoose";

const reportCounterSchema = new Schema({
    name: {type: String},
    value: {type: Number},
});

const reportTimerSchema = new Schema({
    start: {type: Date},
    stop: {type: Date},
    duration: {type: String},
});

export const ReportSchema = new Schema({
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    activity: {type: Schema.Types.ObjectId, ref: 'Activity', required: true},
    jobVersion: {type: String},
    taskVersion: {type: String},
    date: {type: String},
    time: {type: Date},
    endDate: {type: String},
    duration: {type: String},
    status: {type: String},
    branch: {type: String},
    version: {type: String},
    counters: [reportCounterSchema],
    timers: [reportTimerSchema]
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
