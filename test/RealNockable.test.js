import { expect } from 'chai';
import axios from 'axios';
import RealnockNockable from '../src/RealnockNockable';

describe('RealnockNockable', () => {
    const nockable = new RealnockNockable({port: 10010});

    const client = axios.create({
        baseURL: nockable.endpoint
    });
    const someResource = '/test';
    const someRequest = {foo:'bar'}
    const someResponseStatus = 200;
    const someResponse = {baz: 'qux'};

    before(() => {
        return nockable.start();
    });

    after(() => {
        return nockable.stop();
    });

    beforeEach(() => {
        return nockable.reset();
    });

    it ('mocks HTTP calls in resource', () => {
        nockable.nock
            .post(someResource, someRequest)
            .reply(someResponseStatus, someResponse);
        
        return client
            .post(someResource, someRequest)
            .then((response) => {
                expect(response.status).to.equal(someResponseStatus);
                expect(response.data).to.deep.equal(someResponse);
            });
    });

    it ('mocks HTTP calls in root', () => {
        nockable.nock
            .post('', someRequest)
            .reply(someResponseStatus, someResponse);
        
        return client
            .post('', someRequest)
            .then((response) => {
                expect(response.status).to.equal(someResponseStatus);
                expect(response.data).to.deep.equal(someResponse);
            });
    });
});
