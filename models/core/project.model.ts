// Lazy Begin Imports
import {Document} from "mongoose";
import {IProjectType} from "./project-type.model";
import {IProjectCategory} from "./project-category.model";
import {ITechnology} from "./technology.model";
import {IProjectVersion} from "./project-version.model";
// Lazy End Imports

// Lazy Begin
export interface IProject extends Document {
    name: string;
    acronym: string;
    type: IProjectType;
    categories: [IProjectCategory];
    pic: string;
    description: string;
    url: string;
    startDate: string;
    technologies: [ITechnology];
    currentVersion: IProjectVersion;
}

// Lazy End
