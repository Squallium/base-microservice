import {Job, Module, Task} from "../connections/core.conn";
import {IParam} from "../models/param.model";
import {ParamError} from "../errors/param.error";
import {IModule} from "../models/core/module.model";
import {IJob} from "../models/core/job.model";
import {ITask} from "../models/core/task.model";

export class ParamService {

    static KEY_MODULE = 'module';
    static KEY_JOB = 'job';
    static KEY_TASK = 'task';

    constructor() {
    }

    findParams(module: string, job: string, task?: string): Promise<Map<string, IParam>> {
        const finds = [];
        finds.push(Module.findOne({name: module}));
        finds.push(Job.findOne({name: job}));
        if (task) finds.push(Task.findOne({name: task}));

        return Promise.all(finds).then(params => {
            const result: Map<string, IParam> = new Map<string, IParam>();
            for (let param of params) {
                let key: string = '';
                if (param.name == module) key = ParamService.KEY_MODULE;
                if (param.name == job) key = ParamService.KEY_JOB;
                if (task && param.name == task) key = ParamService.KEY_TASK;
                result.set(key, param);
            }
            return Promise.resolve(result);
        }).catch(err => {
            return Promise.reject(ParamError.unknown('No se pudo obtener los parámetros'));
        });
    }

    findParamsById(module: IModule, job: IJob, task?: ITask) {
        const finds = [];
        finds.push(Module.findById(module));
        finds.push(Job.findById(job));
        if (task) finds.push(Task.findById(task));

        return Promise.all(finds).then(params => {
            const result: Map<string, IParam> = new Map<string, IParam>();
            for (let param of params) {
                let key: string = '';
                if (param.id == module) key = ParamService.KEY_MODULE;
                if (param.id == job) key = ParamService.KEY_JOB;
                if (task && param.id == task) key = ParamService.KEY_TASK;
                result.set(key, param);
            }
            return Promise.resolve(result);
        }).catch(err => {
            return Promise.reject(ParamError.unknown('No se pudo obtener los parámetros'));
        });
    }

}
