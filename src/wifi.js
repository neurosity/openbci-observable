
const Wifi = require('openbci-wifi');
const { fromEvent } = require('rxjs/observable/fromEvent');
const { map } = require('rxjs/operators/map');

const { renameDataProp } = require('./utils');

const exitEvents = {
    exit: true,
    SIGINT: false,
    uncaughtException: false
};

class WifiObservable extends Wifi {
    
    constructor (...options) {
        super(...options);
        this.stream = fromEvent(this, 'sample')
            .pipe(map(renameDataProp));
        this.internalConnect = this.connect;
        this.connect = async (options = {}) => {
            const o = Object.assign({}, options, { streamStart: false });
            try {
                await this.internalConnect(o);
            } catch (e) {}
        };

        exitEvents.forEach(eventName => {
            process.on(eventName, this.exit.bind(this));
        });
    }

    async start () {
        try {
            await this.streamStart();
        } catch (e) {}
    }

    async exit (cleanUp) {
        this.removeAllListeners('rawDataPacket');
        this.removeAllListeners('sample');    

            return;
        }

        await this.disconnect();
        process.exit(0);
    }
}

module.exports = WifiObservable;
