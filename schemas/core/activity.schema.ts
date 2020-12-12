import {Schema} from "mongoose";
import {IActivity} from "../../models/core/activity.model";
import {ParamService} from "../../services/param.service";

export const ActivitySchema = new Schema({
    name: {type: String},
    module: {type: Schema.Types.ObjectId, ref: 'Module', required: true},
    job: {type: Schema.Types.ObjectId, ref: 'Job', required: true},
    task: {type: Schema.Types.ObjectId, ref: 'Task'},
    description: {type: String},
    dependencies: [{type: Schema.Types.ObjectId, ref: 'Activity'}],
}, {
    timestamps: true,
});

ActivitySchema.set('toJSON', {
    virtuals: true
});

ActivitySchema.index({module: 1, job: 1, task: 1}, {unique: true});

ActivitySchema.pre<IActivity>('save', function (next) {
    const activity = this;

    new ParamService().findParamsById(activity.module, activity.job, activity.task).then(params => {
        activity.name = `${params.get(ParamService.KEY_MODULE).name} ${params.get(ParamService.KEY_JOB).name}`;

        if (activity.task) {
            activity.name = `${activity.name} ${params.get(ParamService.KEY_TASK).name}`
        }

        next();
    }).catch(err => {
        activity.name = 'default';

        next();
    });

});
