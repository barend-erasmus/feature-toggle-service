// Imports
import { expect } from 'chai';
import * as co from 'co';
import 'mocha';
import * as sinon from 'sinon';

// Imports services
import { ProjectService } from './project';

// Imports repositories
import { MockProjectRepository } from './../repositories/mock/project';

// Imports domain models
import { Project } from './../models/project';

describe('ProjectService', () => {

    describe('create', () => {

        let createSpy: sinon.SinonSpy = null;
        let projectService: ProjectService = null;

        beforeEach(() => {
            const projectRepository = new MockProjectRepository();

            createSpy = sinon.spy(projectRepository, 'create');

            sinon.stub(projectRepository, 'findByKey').callsFake((key: string) => {
                if (key === 'project-2') {
                    return Promise.resolve(new Project('project-2', 'project2', null));
                }else {
                    return Promise.resolve(null);
                }
            });

            projectService = new ProjectService(projectRepository);
        });

        it('should return project given project key does not exist', () => {

            return co(function*() {
                const result: Project = yield projectService.create('project2', 'project-1');

                expect(result).to.be.not.null;
                sinon.assert.calledOnce(createSpy);
            });
        });

        it('should return null given project key does exist', () => {

            return co(function*() {
                const result: Project = yield projectService.create('project2', 'project-2');

                expect(result).to.be.null;
                sinon.assert.notCalled(createSpy);
            });
        });

        it('should return null given null key', () => {

            return co(function*() {
                const result: Project = yield projectService.create('project2', null);

                expect(result).to.be.null;
                sinon.assert.notCalled(createSpy);
            });
        });

        it('should return null given null name', () => {

            return co(function*() {
                const result: Project = yield projectService.create(null, 'project-2');

                expect(result).to.be.null;
                sinon.assert.notCalled(createSpy);
            });
        });
    });

    describe('list', () => {

        let projectService: ProjectService = null;

        beforeEach(() => {
            const projectRepository = new MockProjectRepository();

            sinon.stub(projectRepository, 'list').callsFake(() => {
                return Promise.resolve([
                    new Project('project-1', 'project1', null),
                ]);
            });

            projectService = new ProjectService(projectRepository);
        });

        it('should return list of projects', () => {

            return co(function*() {
                const result: Project[] = yield projectService.list();

                expect(result.length).to.be.eq(1);
            });
        });
    });

});
