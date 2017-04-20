import Q from 'q';

export default class Nockable {
    constructor({ nock, endpoint }) {
        this.nock = nock;
        this.endpoint = endpoint;
    }

    start() {
        return Q.resolve();
    }

    stop() {
        return Q.resolve();
    }

    reset() {
        return Q.resolve();
    }
}
