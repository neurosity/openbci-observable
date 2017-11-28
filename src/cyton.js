
const { Cyton } = require('openbci');
const {
    OBCIEmitterSample,
    OBCISimulatorPortName
} = require('openbci-utilities/dist/constants');
const { fromEvent } = require('rxjs/observable/fromEvent');
const { map } = require('rxjs/operators/map');

const { renameDataProp, onExit } = require('./utils');

class CytonObservable extends Cyton {
    
    constructor (...options) {
        super(...options);
        this.stream = fromEvent(this, OBCIEmitterSample)
            .pipe(map(renameDataProp));
        this.init();
        onExit(this);
    }

    async start () {
        this.on('ready', async () => {
            try {
                await this.streamStart();
            } catch (e) {}
        });
    }

    async init () {
        try {
            this._portName = await this.autoFindOpenBCIBoard();
        } catch (error) {
            this._portName = OBCISimulatorPortName;
        }
    }
}

module.exports = CytonObservable;
