import {IReport} from "../models/core/report.model";
import {Report} from "../connections/core.conn";
import {IProject} from "../models/core/project.model";
import {IActivity} from "../models/core/activity.model";

export class ReportService {

    constructor() {
    }

    findReportById(reportId: string): Promise<IReport> {
        return Report.findById(reportId).exec()
    }

    findAllReports(project: IProject, activity: IActivity, projection: any = {}): Promise<IReport[]> {
        const query: any = {
            project: project,
            activity: activity
        };

        return Report.find(query).select(projection).exec();
    }

}
