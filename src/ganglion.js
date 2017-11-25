
const Ganglion = require('openbci-ganglion');
const { fromEvent } = require('rxjs/observable/fromEvent');
const { map } = require('rxjs/operators/map');

const { renameDataProp } = require('./utils');

class GanglionObservable extends Ganglion {

    constructor (...options) {
        super(...options);
        this.stream = fromEvent(this, 'sample')
            .pipe(map(renameDataProp));
        this._connect = this.connect;
        this.connect = async () => {
            this.searchStart();
            this.once('ganglionFound', peripheral => {
                this.searchStop();
                this._connect(peripheral);
            });
        };
    }

    async start () {
        this.once('ready', async () => {
            await this.streamStart();
        });
    }
}

module.exports = GanglionObservable;
