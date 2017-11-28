
const Ganglion = require('openbci-ganglion');
const { OBCIEmitterSample } = require('openbci-utilities/dist/constants');
const { fromEvent } = require('rxjs/observable/fromEvent');
const { map } = require('rxjs/operators/map');

const { renameDataProp, onExit } = require('./utils');

class GanglionObservable extends Ganglion {

    constructor (...options) {
        super(...options);
        this.stream = fromEvent(this, OBCIEmitterSample)
            .pipe(map(renameDataProp));
        this._connect = this.connect;
        this.connect = async () => {
            this.searchStart();
            this.once('ganglionFound', peripheral => {
                this.searchStop();
                this._connect(peripheral);
            });
        };
        onExit(this);
    }

    async start () {
        this.once('ready', async () => {
            try {
                await this.streamStart();
            } catch (e) {}
        });
    }
}

module.exports = GanglionObservable;
