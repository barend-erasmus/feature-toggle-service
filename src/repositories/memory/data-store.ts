// Imports dto
import { FeatureDto } from './../dto/feature';
import { ProjectDto } from './../dto/project';
import { GroupDto } from './../dto/group';

export class DataStore {
    public static features: FeatureDto[] = [];
    public static groups: GroupDto[] = [];
    public static projects: ProjectDto[] = [];

    public static clear(): void {
        DataStore.features = [];
        DataStore.projects = [];
        DataStore.groups = [];
    }

}