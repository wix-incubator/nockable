import nock from 'nock';
import Nockable from './Nockable';

export default class NockNockable extends Nockable {
    constructor({ endpoint }) {
        super({
            nock: nock(endpoint),
            endpoint
        });
    }

    reset() {
        return super.reset().then(() => {
            nock.cleanAll();
        });
    }
}
