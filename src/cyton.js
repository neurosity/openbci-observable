
const { Cyton } = require('openbci');
const { OBCISimulatorPortName } = require('openbci-utilities');
const { fromEvent } = require('rxjs/observable/fromEvent');
const { map } = require('rxjs/operators/map');

const { renameDataProp } = require('./utils');

class CytonObservable extends Cyton {
    
    constructor (...options) {
        super(...options);
        this.stream = fromEvent(this, 'sample')
            .pipe(map(renameDataProp));
        this.init();
    }

    async start () {
        this.on('ready', async () => {
            await this.streamStart();
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
