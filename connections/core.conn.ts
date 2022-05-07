import {ConnectOptions, createConnection, Model} from "mongoose";

// Lazy Begin Imports
import {ActivitySchema} from "../schemas/core/activity.schema";
import {IActivity} from "../models/core/activity.model";
import {JobSchema} from "../schemas/core/job.schema";
import {IJob} from "../models/core/job.model";
import {ModuleSchema} from "../schemas/core/module.schema";
import {IModule} from "../models/core/module.model";
import {ProjectSchema} from "../schemas/core/project.schema";
import {IProject} from "../models/core/project.model";
import {ProjectCategorySchema} from "../schemas/core/project-category.schema";
import {IProjectCategory} from "../models/core/project-category.model";
import {ProjectTypeSchema} from "../schemas/core/project-type.schema";
import {IProjectType} from "../models/core/project-type.model";
import {ProjectVersionSchema} from "../schemas/core/project-version.schema";
import {IProjectVersion} from "../models/core/project-version.model";
import {ReportSchema} from "../schemas/core/report.schema";
import {IReport} from "../models/core/report.model";
import {TaskSchema} from "../schemas/core/task.schema";
import {ITask} from "../models/core/task.model";
import {TechnologySchema} from "../schemas/core/technology.schema";
import {ITechnology} from "../models/core/technology.model";
import {TechnologyTypeSchema} from "../schemas/core/technology-type.schema";
import {ITechnologyType} from "../models/core/technology-type.model";
// Lazy End Imports

const uri = process.env.MONGO_URI_CORE;
const options: ConnectOptions = {};
export const CoreConn = createConnection(uri, options);

// Lazy Begin
export const Activity: Model<IActivity> = CoreConn.model<IActivity>('Activity', ActivitySchema);
export const Job: Model<IJob> = CoreConn.model<IJob>('Job', JobSchema);
export const Module: Model<IModule> = CoreConn.model<IModule>('Module', ModuleSchema);
export const Project: Model<IProject> = CoreConn.model<IProject>('Project', ProjectSchema);
export const ProjectCategory: Model<IProjectCategory> = CoreConn.model<IProjectCategory>('ProjectCategory', ProjectCategorySchema);
export const ProjectType: Model<IProjectType> = CoreConn.model<IProjectType>('ProjectType', ProjectTypeSchema);
export const ProjectVersion: Model<IProjectVersion> = CoreConn.model<IProjectVersion>('ProjectVersion', ProjectVersionSchema);
export const Report: Model<IReport> = CoreConn.model<IReport>('Report', ReportSchema);
export const Task: Model<ITask> = CoreConn.model<ITask>('Task', TaskSchema);
export const Technology: Model<ITechnology> = CoreConn.model<ITechnology>('Technology', TechnologySchema);
export const TechnologyType: Model<ITechnologyType> = CoreConn.model<ITechnologyType>('TechnologyType', TechnologyTypeSchema);
// Lazy End
