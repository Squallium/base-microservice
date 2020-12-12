import {ParamSchema} from "../param.schema";
import {extendSchema} from "../../utils/extend-schema";


export const TechnologyTypeSchema = extendSchema(ParamSchema, {});

TechnologyTypeSchema.index({name: 1}, {unique: true});
