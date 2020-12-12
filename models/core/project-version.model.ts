// Lazy Begin Imports
import {Document} from "mongoose";
import {IProject} from "./project.model";
// Lazy End Imports

// Lazy Begin
export interface IProjectVersion extends Document {
    name: string;
    project: IProject;
    version: string;
    branch: string;
    dependencies: [IProjectVersion];
}

// Lazy End
