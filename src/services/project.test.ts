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
                    return Promise.resolve(new Project('2', 'project2', 'project-2'));
                }else {
                    return Promise.resolve(null);
                }
            });

            projectService = new ProjectService(projectRepository);
        });

        it('should return project given project key does not exist', () => {

            return co(function*() {
                const createResult: Project = yield projectService.create('project2', 'project-1');

                expect(createResult).to.be.not.null;
                sinon.assert.calledOnce(createSpy);
            });
        });

        it('should return null given project key does exist', () => {

            return co(function*() {
                const createResult: Project = yield projectService.create('project2', 'project-2');

                expect(createResult).to.be.null;
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
                    new Project('1', 'project1', 'project-1'),
                ]);
            });

            projectService = new ProjectService(projectRepository);
        });

        it('should return list of projects', () => {

            return co(function*() {
                const listResult: Project[] = yield projectService.list();

                expect(listResult.length).to.be.eq(1);
            });
        });
    });

});
