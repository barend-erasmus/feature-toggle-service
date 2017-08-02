// Imports
import { expect } from 'chai';
import * as co from 'co';
import 'mocha';
import * as sinon from 'sinon';
import { DataStore } from './../repositories/memory/data-store';

// Imports services
import { FeatureService } from './feature';

// Imports repositories
import { FeatureRepository } from './../repositories/memory/feature';
import { GroupRepository } from './../repositories/memory/group';
import { ProjectRepository } from './../repositories/memory/project';

// Imports domain models
import { Feature } from './../models/feature';
import { Group } from './../models/group';
import { Consumer } from './../models/consumer';
import { FeatureGroup } from './../models/feature-group';
import { AssociatedProject } from './../models/associated-project';
import { Option } from './../models/option';
import { Project } from './../models/project';
import { Environment } from './../models/environment';

describe('FeatureService', () => {

    describe('list', () => {

        let featureRepository: FeatureRepository;
        let projectRepository: ProjectRepository;
        let groupRepository: GroupRepository;
        let featureService: FeatureService;

        beforeEach(() => {
            featureRepository = new FeatureRepository();
            projectRepository = new ProjectRepository();
            groupRepository = new GroupRepository();

            featureService = new FeatureService(featureRepository, projectRepository, groupRepository);
        });

        it('should return list of features given project key', () => {

            return co(function* () {

                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: Feature[] = yield featureService.list('project-1');

                expect(result.length).to.be.eq(1);
            });
        });

        it('should return list of features given null project key', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: Feature[] = yield featureService.list(null);

                expect(result.length).to.be.eq(1);
            });
        });

        afterEach(() => {
            DataStore.clear();
        });
    });

    describe('create', () => {

        let featureRepository: FeatureRepository;
        let projectRepository: ProjectRepository;
        let groupRepository: GroupRepository;
        let featureService: FeatureService;

        beforeEach(() => {
            featureRepository = new FeatureRepository();
            projectRepository = new ProjectRepository();
            groupRepository = new GroupRepository();

            featureService = new FeatureService(featureRepository, projectRepository, groupRepository);
        });

        it('should return feature given feature key does not exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));

                const result: Feature = yield featureService.create('Feature1', 'feature-1', 'Release Toggle', 'project-1');

                expect(result).to.be.not.null;
            });
        });

        it('should return null given feature key does exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: Feature = yield featureService.create('Feature1', 'feature-1', 'Release Toggle', 'project-1');

                expect(result).to.be.null;
            });
        });

        it('should return null given null name', () => {

            return co(function* () {
                const result: Feature = yield featureService.create(null, 'feature-1', 'Release Toggle', 'project-1');

                expect(result).to.be.null;
            });
        });

        it('should return null given null key', () => {

            return co(function* () {
                const result: Feature = yield featureService.create('Feature1', null, 'Release Toggle', 'project-1');

                expect(result).to.be.null;
            });
        });

        it('should return null given null type', () => {

            return co(function* () {
                const result: Feature = yield featureService.create('Feature1', 'feature-1', null, 'project-1');

                expect(result).to.be.null;
            });
        });

        it('should return null given null project key', () => {

            return co(function* () {
                const result: Feature = yield featureService.create('Feature1', 'feature-1', 'Release Toggle', null);

                expect(result).to.be.null;
            });
        });

        it('should return null given project key does not exist', () => {

            return co(function* () {
                const result: Feature = yield featureService.create('Feature1', 'feature-1', 'Release Toggle', 'project-1');

                expect(result).to.be.null;
            });
        });

        afterEach(() => {
            DataStore.clear();
        });
    });


    describe('enabled', () => {

        let featureRepository: FeatureRepository;
        let projectRepository: ProjectRepository;
        let groupRepository: GroupRepository;
        let featureService: FeatureService;

        beforeEach(() => {
            featureRepository = new FeatureRepository();
            projectRepository = new ProjectRepository();
            groupRepository = new GroupRepository();

            featureService = new FeatureService(featureRepository, projectRepository, groupRepository);
        });

        it('should return false given feature key does not exist', () => {

            return co(function* () {
                const result: boolean = yield featureService.enabled('feature-1', 'consumer-1', 'environment-1', 'user');

                expect(result).to.be.false;
            });
        });

        it('should return false given not enabled', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.enabled('feature-1', 'consumer-1', 'environment-1', 'user');

                expect(result).to.be.false;
            });
        });

        it('should return false given environment does not exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()).toggle());

                const result: boolean = yield featureService.enabled('feature-1', 'consumer-1', 'environment-2', 'user');

                expect(result).to.be.false;
            });
        });

        it('should return true given valid parameters', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield groupRepository.create(new Group('group-1', 'Group1', [
                    new Consumer('consumer-1', 'Consumer1', 'user')
                ], new Date().getTime()));

                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [
                        new FeatureGroup('group-1', null, new Date().getTime())
                    ], [], new Date().getTime()),
                ], new Date().getTime()).toggle());

                const result: boolean = yield featureService.enabled('feature-1', 'consumer-1', 'environment-1', 'user');

                expect(result).to.be.true;
            });
        });

        it('should return false given consumer is not in group', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield groupRepository.create(new Group('group-1', 'Group1', [], new Date().getTime()));

                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [
                        new FeatureGroup('group-1', null, new Date().getTime())
                    ], [], new Date().getTime()),
                ], new Date().getTime()).toggle());

                const result: boolean = yield featureService.enabled('feature-1', 'consumer-1', 'environment-1', 'user');

                expect(result).to.be.false;
            });
        });

        afterEach(() => {
            DataStore.clear();
        });
    });

    describe('toggle', () => {

        let featureRepository: FeatureRepository;
        let projectRepository: ProjectRepository;
        let groupRepository: GroupRepository;
        let featureService: FeatureService;

        beforeEach(() => {
            featureRepository = new FeatureRepository();
            projectRepository = new ProjectRepository();
            groupRepository = new GroupRepository();

            featureService = new FeatureService(featureRepository, projectRepository, groupRepository);
        });

        it('should return false given feature key does not exist', () => {

            return co(function* () {
                const result: boolean = yield featureService.toggle('feature-1');

                expect(result).to.be.false;
            });
        });

        it('should return true given feature key does exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.toggle('feature-1');

                expect(result).to.be.true;
            });
        });

        afterEach(() => {
            DataStore.clear();
        });
    });

    describe('assignGroups', () => {

        let featureRepository: FeatureRepository;
        let projectRepository: ProjectRepository;
        let groupRepository: GroupRepository;
        let featureService: FeatureService;

        beforeEach(() => {
            featureRepository = new FeatureRepository();
            projectRepository = new ProjectRepository();
            groupRepository = new GroupRepository();

            featureService = new FeatureService(featureRepository, projectRepository, groupRepository);
        });

        it('should return false given feature key does not exist', () => {

            return co(function* () {
                const result: boolean = yield featureService.assignGroups('feature-1', 'environment-1', [
                    'group-1', 'group-2',
                ]);

                expect(result).to.be.false;
            });
        });

        it('should return false given null group key', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.assignGroups('feature-1', 'environment-1', [
                    null,
                ]);

                expect(result).to.be.false;
            });
        });

        it('should return true given feature key does exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.assignGroups('feature-1', 'environment-1', [
                    'group-1', 'group-2',
                ]);

                expect(result).to.be.true;
            });
        });

        it('should return false given environment key does not exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.assignGroups('feature-1', 'environment-2', [
                    'group-1', 'group-2',
                ]);

                expect(result).to.be.false;
            });
        });

        afterEach(() => {
            DataStore.clear();
        });
    });

    describe('deassignGroups', () => {

        let featureRepository: FeatureRepository;
        let projectRepository: ProjectRepository;
        let groupRepository: GroupRepository;
        let featureService: FeatureService;

        beforeEach(() => {
            featureRepository = new FeatureRepository();
            projectRepository = new ProjectRepository();
            groupRepository = new GroupRepository();

            featureService = new FeatureService(featureRepository, projectRepository, groupRepository);
        });

        it('should return false given feature key does not exist', () => {

            return co(function* () {
                const result: boolean = yield featureService.deassignGroups('feature-1', 'environment-1', [
                    'group-1',
                ]);

                expect(result).to.be.false;
            });
        });

        it('should return false given null group key', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.deassignGroups('feature-1', 'environment-1', [
                    null,
                ]);

                expect(result).to.be.false;
            });
        });

        it('should return true given feature key does exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.deassignGroups('feature-1', 'environment-1', [
                    'group-1',
                ]);

                expect(result).to.be.true;
            });
        });

        it('should return false given environment key does not exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.deassignGroups('feature-1', 'environment-2', [
                    'group-1',
                ]);

                expect(result).to.be.false;
            });
        });

        afterEach(() => {
            DataStore.clear();
        });
    });

    describe('addOptions', () => {

        let featureRepository: FeatureRepository;
        let projectRepository: ProjectRepository;
        let groupRepository: GroupRepository;
        let featureService: FeatureService;

        beforeEach(() => {
            featureRepository = new FeatureRepository();
            projectRepository = new ProjectRepository();
            groupRepository = new GroupRepository();

            featureService = new FeatureService(featureRepository, projectRepository, groupRepository);
        });

        it('should return false given feature key does not exist', () => {

            return co(function* () {

                const result: boolean = yield featureService.addOptions('feature-1', 'environment-1', [
                    new Option('option-1', 'option1', 'option1'),
                ]);

                expect(result).to.be.false;
            });
        });

        it('should return false given null option', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.addOptions('feature-1', 'environment-1', [
                    null,
                ]);

                expect(result).to.be.false;
            });
        });

        it('should return true given feature key does exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.addOptions('feature-1', 'environment-1', [
                    new Option('option-1', 'option1', 'option1'),
                ]);

                expect(result).to.be.true;
            });
        });

        it('should return false given environment key does not exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.addOptions('feature-1', 'environment-2', [
                    new Option('option-1', 'option1', 'option1'),
                ]);

                expect(result).to.be.false;
            });
        });

        afterEach(() => {
            DataStore.clear();
        });
    });

    describe('removeOptions', () => {

        let featureRepository: FeatureRepository;
        let projectRepository: ProjectRepository;
        let groupRepository: GroupRepository;
        let featureService: FeatureService;

        beforeEach(() => {
            featureRepository = new FeatureRepository();
            projectRepository = new ProjectRepository();
            groupRepository = new GroupRepository();

            featureService = new FeatureService(featureRepository, projectRepository, groupRepository);
        });


        it('should return false given feature key does not exist', () => {

            return co(function* () {
                const result: boolean = yield featureService.removeOptions('feature-1', 'environment-1', [
                    'option-1',
                ]);

                expect(result).to.be.false;
            });
        });

        it('should return false given null option', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.removeOptions('feature-1', 'environment-1', [
                    null,
                ]);

                expect(result).to.be.false;
            });
        });

        it('should return true given feature key does exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.removeOptions('feature-1', 'environment-1', [
                    'option-1',
                ]);

                expect(result).to.be.true;
            });
        });

        it('should return false given environment key does not exist', () => {

            return co(function* () {
                yield projectRepository.create(new Project('project-1', 'Project1', new Date().getTime()));
                yield featureRepository.create(new Feature('feature-1', 'Feature1', 'Release Toggle', new AssociatedProject('project-1', null, null), [
                    new Environment('environment-1', 'Environment1', [], [], new Date().getTime()),
                ], new Date().getTime()));

                const result: boolean = yield featureService.removeOptions('feature-1', 'environment-2', [
                    'option-1',
                ]);

                expect(result).to.be.false;
            });
        });

        afterEach(() => {
            DataStore.clear();
        });
    });
});
