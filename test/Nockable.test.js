import { expect } from 'chai';
import Nockable from '../src/Nockable';

describe('Nockable', () => {
    const nock = {};
    const endpoint = 'http://some-endpoint';
    const nockable = new Nockable({ nock, endpoint });

    describe('nock', () => {
        it ('returns the nock object given to constructor', () => {
            expect(nockable.nock).to.equal(nock);
        });
    });

    describe('endpoint', () => {
        it ('returns the endpoint object given to constructor', () => {
            expect(nockable.endpoint).to.equal(endpoint);
        });
    });

    describe('start', () => {
        it ('returns a resolved promise', () => {
            return nockable.start();
        });
    });

    describe('stop', () => {
        it ('returns a resolved promise', () => {
            return nockable.stop();
        });
    });

    describe('stop', () => {
        it ('returns a resolved promise', () => {
            return nockable.reset();
        });
    });
});
