import {BaseError} from "../errors/base.error";
import {BaseResponse} from "../responses/base.response";
import {IReport} from "../models/core/report.model";
import {Report} from "../connections/core.conn"
import {ProjectError} from "../errors/project.error";
import {CodesError} from "../errors/codes.error";
import {ProjectService} from "../services/project.service";
import {ParamService} from "../services/param.service";
import {ActivityService} from "../services/activity.service";
import {ReportError} from "../errors/report.error";
import {ReportResponse} from "../responses/report.response";
import {IProject} from "../models/core/project.model";
import {IActivity} from "../models/core/activity.model";
import {ReportService} from "../services/report.service";
import {CodesResponse} from "../responses/codes.response";
import {ControllerUtil} from "../../utils/controller.util";

export class ReportController {

    private projectService: ProjectService;
    private paramService: ParamService;
    private activityService: ActivityService;
    private reportService: ReportService;

    constructor() {
        this.projectService = new ProjectService();
        this.paramService = new ParamService();
        this.activityService = new ActivityService();
        this.reportService = new ReportService();
    }

    create(data: any, callback: (err: BaseError, response: BaseResponse) => void): void {

        const result: IReport = new Report();

        this.setReportCommonFields(result, data);

        // find the project
        this.projectService.findProjectByAcronym(data.project_id).then(p => {
            if (!p) callback(ProjectError.instance(CodesError.PROJECT_NOT_FOUND), null);
            result.project = p;

            // get the parameters
            return this.paramService.findParams(data.module, data.job, data.task);
        }).then(params => {
            // find the activity
            return this.activityService.findActivity(
                params.get(ParamService.KEY_MODULE),
                params.get(ParamService.KEY_JOB),
                params.get(ParamService.KEY_TASK)
            );
        }).then(act => {
            if (!act) return Promise.reject(ReportError.instance(CodesError.ACTIVITY_NOT_FOUND));
            result.activity = act;

            // after verify all the info we save the report
            return result.save();
        }).then(savedReport => {
            // try to save specific report info
            return this.setSpecificFields(savedReport, data);
        }).then(specificSaved => {
            // after save the report we return the parameter that were ignored in the message
            this.clearSavedParameters(data)
            const response: ReportResponse = ReportResponse.instance(CodesResponse.REPORT_SAVED, data);
            callback(null, response);
        }).catch(error => {
            console.log(error);
            ControllerUtil.manageUnknownError(error, callback);
        });
    }

    findById(reportId: string, callback: (err: BaseError, response: BaseResponse) => void): void {
        this.reportService.findReportById(reportId).then(report => {
            const response: ReportResponse = ReportResponse.instance(CodesResponse.REPORT_FOUND);
            response.report = report;
            callback(null, response);
        }).catch(error => {
            console.log(error);
            callback(error ? error : ReportError.unknown(error.message), null);
        });
    }

    find(query: any, callback: (err: BaseError, response: BaseResponse) => void): void {

        let project: IProject = undefined;
        let activity: IActivity = undefined;

        // get query values
        const acronym: string = query['project_id']
        const module: string = query['module']
        const job: string = query['job']
        const task: string = query['task']

        // build the projection if we have it
        const proArray: [string] = query['projection'] ? query['projection'].split(',') : []
        const projection: any = {}
        for (let pro of proArray) {
            projection[pro] = 1
        }

        // get the project info from the project_id
        this.projectService.findProjectByAcronym(acronym).then(p => {
            if (!p) return Promise.reject(ProjectError.instance(CodesError.PROJECT_NOT_FOUND));
            project = p;

            // get the activity's params
            return this.paramService.findParams(module, job, task);
        }).then(params => {
            // get the activity
            return this.activityService.findActivity(
                params.get(ParamService.KEY_MODULE),
                params.get(ParamService.KEY_JOB),
                params.get(ParamService.KEY_TASK)
            );
        }).then(act => {
            if (!act) return Promise.reject(ReportError.instance(CodesError.ACTIVITY_NOT_FOUND));
            activity = act;

            // find all reports
            return this.reportService.findAllReports(project, activity, projection);
        }).then(reports => {
            const response: ReportResponse = ReportResponse.instance(CodesResponse.REPORT_FOUND);
            response.reports = reports;
            callback(null, response);
        }).catch(error => {
            console.log(error);
            callback(error ? error : ReportError.unknown(error.message), null);
        });
    }

    private setReportCommonFields(report: IReport, data: any) {
        // required
        report.date = data.date;
        report.duration = data.duration;
        report.status = data.status;

        // optionals
        if (data.time) report.time = data.time;
        if (data.job_version) report.jobVersion = data.job_version;
        if (data.task_version) report.taskVersion = data.task_version;
        if (data.end_date) report.endDate = data.end_date;
        if (data.branch) report.branch = data.branch;
        if (data.version) report.version = data.version;
        if (data.counters) report.counters = data.counters;
    }

    private setSpecificFields(report: IReport, data: any): Promise<boolean> {
        return Promise.resolve(true);
    }

    private clearSavedParameters(data: any) {
        delete data.acronym;
        delete data.module;
        delete data.job;
        delete data.task;

        delete data.date;
        delete data.duration;
        delete data.status;

        delete data.job_version;
        delete data.task_version;
        delete data.end_date;
        delete data.branch;
        delete data.version;
    }
}
