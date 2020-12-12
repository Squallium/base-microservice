import {Schema} from "mongoose";
import {IProjectVersion} from "../../models/core/project-version.model";
import {ProjectService} from "../../services/project.service";

export const ProjectVersionSchema = new Schema({
    name: {type: String},
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    version: {type: String, required: true},
    branch: {type: String},
    dependencies: [{type: Schema.Types.ObjectId, ref: 'ProjectVersion'}],
}, {
    timestamps: true,
});

ProjectVersionSchema.set('toJSON', {
    virtuals: true
});

ProjectVersionSchema.index({project: 1, version: 1}, {unique: true});

ProjectVersionSchema.pre<IProjectVersion>('save', function (next) {
    const projectVersion = this;

    new ProjectService().findProjectById(projectVersion.project).then(project => {

        projectVersion.name = `${project.name} - ${projectVersion.version}`

        next();
    }).catch(err => {
        projectVersion.name = 'default';

        next();
    });

});
