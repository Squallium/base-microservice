// Lazy Begin Imports
import {Document} from "mongoose";
import {IProject} from "./project.model";
import {IActivity} from "./activity.model";
// Lazy End Imports

// Lazy Begin
export interface IReportCounter extends Document {
    name: string;
    value: Number;
}

export interface IReport extends Document {
    project: IProject;
    activity: IActivity;
    jobVersion: string;
    taskVersion: string;
    date: string;
    time: string;
    endDate: string;
    duration: string;
    status: string;
    branch: string;
    version: string;
    counters: [IReportCounter];
}

// Lazy End
