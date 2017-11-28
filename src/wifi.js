
const Wifi = require('openbci-wifi');
const { OBCIEmitterSample } = require('openbci-utilities/dist/constants');
const { fromEvent } = require('rxjs/observable/fromEvent');
const { map } = require('rxjs/operators/map');

const { renameDataProp, onExit } = require('./utils');

class WifiObservable extends Wifi {
    
    constructor (...options) {
        super(...options);
        this.stream = fromEvent(this, OBCIEmitterSample)
            .pipe(map(renameDataProp));
        this.internalConnect = this.connect;
        this.connect = async (options = {}) => {
            const o = Object.assign({}, options, { streamStart: false });
            try {
                await this.internalConnect(o);
            } catch (e) {}
        };
        onExit(this);
    }

    async start () {
        try {
            await this.streamStart();
        } catch (e) {}
    }
}

module.exports = WifiObservable;
