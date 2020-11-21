import {Schema} from "mongoose";

export function extendSchema(schema, definition, options?) {
    return new Schema(
        Object.assign({}, schema.obj, definition),
        options != undefined ? options : schema.options
    );
}


