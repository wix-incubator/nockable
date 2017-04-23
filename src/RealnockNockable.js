import Q from 'q';
import Stub from 'real-nock';
import Nockable from './Nockable';

export default class RealnockNockable extends Nockable {
    constructor({ port }) {
        const backend = new Stub({port});

        super({
            nock: backend.stub,
            endpoint: `http://localhost:${port}/test` // extra 'test' directory works around issues with nocking empty path
        });

        this._backend = backend;
    }

    start() {
        return super.start().then(() => {
            const deferred = Q.defer();
            this._backend.start((err) => {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        });
    }

    stop() {
        return super.stop().then(() => {
            const deferred = Q.defer();
            this._backend.stop((err) => {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        });
    }

    reset() {
        return super.reset().then(() => {
            this._backend.reset();
        });
    }
}
