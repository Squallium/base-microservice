import {extendSchema} from "../../utils/extend-schema";
import {ParamSchema} from "../param.schema";


export const ProjectTypeSchema = extendSchema(ParamSchema, {});

ProjectTypeSchema.index({name: 1}, {unique: true});
