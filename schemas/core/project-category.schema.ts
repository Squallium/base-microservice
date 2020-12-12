import {extendSchema} from "../../utils/extend-schema";
import {ParamSchema} from "../param.schema";

export const ProjectCategorySchema = extendSchema(ParamSchema, {});

ProjectCategorySchema.index({name: 1}, {unique: true});
