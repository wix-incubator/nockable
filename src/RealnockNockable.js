import Q from 'q';
import Nockable from './Nockable';

export default class RealnockNockable extends Nockable {
    constructor({ RealnockStub, port }) {
        const backend = new RealnockStub({port});

        super({
            nock: backend.stub,
            endpoint: `http://localhost:${port}/`
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
