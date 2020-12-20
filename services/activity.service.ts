import {Activity} from "../connections/core.conn";
import {IActivity} from "../models/core/activity.model";
import {ITask} from "../models/core/task.model";
import {IJob} from "../models/core/job.model";
import {IModule} from "../models/core/module.model";

export class ActivityService {

    constructor() {
    }

    findActivity(module: IModule, job: IJob, task?: ITask): Promise<IActivity> {
        return Activity.findOne({
            module: module,
            job: job,
            task: task
        })
            .populate('dependencies')
            .exec();
    }
}
