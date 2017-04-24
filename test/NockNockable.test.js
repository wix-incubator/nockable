import { expect } from 'chai';
import axios from 'axios';
import NockNockable from '../src/NockNockable';

describe('NockNockable', () => {
    const nockable = new NockNockable({endpoint: 'http://localhost'});

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

    it ('mocks HTTP calls', () => {
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
});
