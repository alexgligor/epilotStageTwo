import { httpServer } from '../server';
import supertest, { SuperAgentTest } from 'supertest';
import axios from 'axios';

jest.mock('axios');
let request: SuperAgentTest;
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Checking user activity', () => {
    beforeAll(() => {
        request = supertest.agent(httpServer);
    });
    afterAll(() => {
        httpServer.close();
    });

    it('Positive feedback', async (done) => {
        mockAxios.get.mockResolvedValueOnce({
            data: {
                files: [
                    {
                        additions: '1',
                        deletions: '0'
                    },
                    {
                        additions: '14',
                        deletions: '5'
                    }
                ]
            }
        });

        await request
            .get(`/v1/downwards/repo_test?userName=user`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('result', true);
            });
        done();
    });

    it('Negative feedback', async (done) => {
        mockAxios.get.mockResolvedValueOnce({
            data: {
                files: [
                    {
                        additions: '1',
                        deletions: '10'
                    },
                    {
                        additions: '14',
                        deletions: '25'
                    }
                ]
            }
        });

        await request
            .get(`/v1/downwards/repo_test?userName=user`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('result', false);
            });
        done();
    });

    it('Wrong request', async (done) => {
        await request
            .get(`/v1/downwards/error/error`)
            .expect(404)
            .then((response) => {
                expect(response.body).toHaveProperty('message', 'Service not found');
            });
        done();
    });

    it('Unknowen repo', async (done) => {
        mockAxios.get.mockResolvedValueOnce({
            data: {}
        });

        await request
            .get(`/v1/downwards/repo_test?userName=user`)
            .expect(404)
            .then((response) => {
                expect(response.body).toHaveProperty('message', 'No repository found at path user/repo_test');
            });
        done();
    });

    it('Knowen repo but unknowen user', async (done) => {
        mockAxios.get.mockImplementation((url) => {
            if (url.indexOf('search/repositories') > 0) {
                return Promise.resolve({ data: { items: [{ full_name: 'user/repo_test' }] } });
            } else if (url.indexOf('compare/master') > 0) {
                return Promise.resolve({
                    data: {
                        files: [
                            {
                                additions: '1',
                                deletions: '10'
                            },
                            {
                                additions: '14',
                                deletions: '25'
                            }
                        ]
                    }
                });
            } else return Promise.reject(new Error('not found'));
        });

        await request
            .get(`/v1/downwards/repo_test`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('result', false);
            });
        done();
    });

    it('Unknowen repo', async (done) => {
        mockAxios.get.mockResolvedValueOnce({});

        await request
            .get(`/v1/downwards/repo_test`)
            .expect(404)
            .then((response) => {
                expect(response.body).toHaveProperty('message', "No repository with name 'repo_test' was found!");
            });
        done();
    });
});
