// Lazy Begin Imports
import {Document} from "mongoose";
import {IModule} from "./module.model";
import {IJob} from "./job.model";
import {ITask} from "./task.model";
// Lazy End Imports

// Lazy Begin
export interface IActivity extends Document {
    name: string;
    module: IModule;
    job: IJob;
    task: ITask;
    description: string;
    dependencies: [IActivity];
}

// Lazy End
