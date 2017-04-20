import Nockable from './Nockable';

export default class NockNockable extends Nockable {
    constructor({ nock, endpoint }) {
        super({
            nock: nock(endpoint),
            endpoint
        });

        this._nock = nock;
    }

    reset() {
        return super.reset().then(() => {
            this._nock.cleanAll();
        });
    }
}
