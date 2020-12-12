// Lazy Begin Imports
import {Document} from "mongoose";
import {ITechnologyType} from "./technology-type.model";
// Lazy End Imports

// Lazy Begin
export interface ITechnology extends Document {
    name: string;
    type: ITechnologyType;
    latestVersion: string;
    description: string;
    url: string;
}

// Lazy End
