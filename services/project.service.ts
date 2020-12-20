import {IProject} from "../models/core/project.model";
import {Project} from "../connections/core.conn";

export class ProjectService {

    constructor() {
    }

    findProjectById(project: IProject): Promise<IProject> {
        return Project.findById(project).exec()
    }

    findProjectByAcronym(acronym: string): Promise<IProject> {
        return Project.findOne({acronym: acronym})
            .populate('currentVersion')
            .populate('dependencies')
            .exec();
    }
}
